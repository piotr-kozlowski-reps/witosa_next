'use server';

import {
  badReceivedData,
  cyclicalActivityNotExistsMessage,
  dbDeletingErrorMessage,
  dbReadingErrorMessage,
  dbWritingErrorMessage,
  imageCreationErrorMessage,
  notLoggedIn,
} from '@/lib/api/apiTextResponses';
import { validateValuesForCyclicalActivities } from '@/lib/forms/cyclical-activities-form';
import logger from '@/lib/logger';
import {
  getDifferencesBetweenTwoObjects,
  getIfImagesShouldBeProcessedFurther,
} from '@/lib/objectHelpers';
import prisma from '@/prisma/client';
import {
  CyclicalActivityTemporary,
  TActionResponse,
  TCyclicalActivityFormInputs,
  TCyclicalActivityWithImageAndOccurrence,
  TGetAllCyclicalActivitiesResponse,
  TGetOneCyclicalActivityResponse,
  TImageCyclicalActivityForDB,
  TOccurrenceWithRequiredDates,
  TOccurrenceWithRequiredDatesAndCyclicalActivityID,
} from '@/types';
import {
  CyclicalActivity,
  Day,
  ImageCyclicalActivity,
  Prisma,
} from '@prisma/client';
import { Session } from 'next-auth';
import { revalidatePath } from 'next/cache';
import {
  checkIfLoggedIn,
  deleteImagesFiles,
  prepareImagesForDB,
  validateCyclicalActivityData,
} from './actionHelpers';
import {
  getProperDataForCyclicalActivityUpdate,
  getRidOfFileDataAndPrepareObjectToComparisonToChangedData,
  processImagesToDivideThemInArraysWithDifferentPurpose,
} from './syncActionHelpers';

export async function addCyclicalActivity(
  values: TCyclicalActivityFormInputs
): Promise<TActionResponse> {
  /**
   * checking session
   * */
  let session: Session;
  try {
    session = await checkIfLoggedIn();
  } catch (error) {
    return { status: 'ERROR', response: notLoggedIn };
  }

  /* 
  data validation 
  */
  try {
    validateCyclicalActivityData(values);
  } catch (error) {
    return { status: 'ERROR', response: badReceivedData };
  }

  //
  const currentlyCreatedImagesToBeDeletedWhenError: string[] = [];

  /* 
 writing cyclical activity to db 
 */
  const authorId = session.user?.id;
  const isIncludeImages = !values.isCustomLinkToDetails;

  //occurrence
  const occurrencePreparedData: TOccurrenceWithRequiredDates[] =
    prepareOccurrenceDataForSavingInDB(values);

  //images
  let imagesPreparedData: TImageCyclicalActivityForDB[];
  try {
    imagesPreparedData = await prepareImagesForDB<
      TCyclicalActivityFormInputs,
      TImageCyclicalActivityForDB
    >(
      values,
      currentlyCreatedImagesToBeDeletedWhenError,
      'IMAGE_REGULAR',
      'cyclical_activity',
      false
    );
  } catch (error) {
    logger.warn((error as Error).stack);
    await deleteImagesFiles(currentlyCreatedImagesToBeDeletedWhenError);
    return { status: 'ERROR', response: imageCreationErrorMessage };
  }

  let cyclicalActivityPreparedForDb: Prisma.CyclicalActivityCreateInput = {
    //stage1
    name: values.name,
    activityTypes: values.activityTypes,
    activitiesForWhom: values.activitiesForWhom,
    places: values.places,
    isToBePublished: values.isToBePublished as boolean,
    isExpiresAtRequired: values.isExpiresAtRequired as boolean,
    expiresAt: values.expiresAt as string | Date | null | undefined,

    //stage2
    shortDescription: values.shortDescription,
    isCustomLinkToDetails: values.isCustomLinkToDetails as boolean,
    longDescription: values.longDescription
      ? (values.longDescription as string)
      : null,
    customLinkToDetails: values.customLinkToDetails
      ? values.customLinkToDetails
      : null,
    author: {
      connect: { id: authorId },
    },
    //stage3
    occurrence: {
      createMany: {
        data: occurrencePreparedData,
      },
    },
  };

  if (isIncludeImages) {
    cyclicalActivityPreparedForDb.images = {
      createMany: { data: imagesPreparedData },
    };
  }

  try {
    const response = await prisma.cyclicalActivity.create({
      data: cyclicalActivityPreparedForDb,
    });
  } catch (error) {
    logger.warn((error as Error).stack);
    await deleteImagesFiles(currentlyCreatedImagesToBeDeletedWhenError);
    return { status: 'ERROR', response: dbWritingErrorMessage };
  }

  /** revalidation */
  revalidatePath('/');
  revalidatePath('/activities');

  /* final success response */
  const successMessage = `Zajęcia: (${values.name}) zostały zapisane.`;
  logger.info(successMessage);
  return {
    status: 'SUCCESS',
    response: successMessage,
  };
}

export async function deleteCyclicalActivities(
  ids: string[]
): Promise<TActionResponse> {
  /**
   * checking session
   * */
  try {
    await checkIfLoggedIn();
  } catch (error) {
    return { status: 'ERROR', response: notLoggedIn };
  }

  /**
   * checking values eXistenZ
   * */
  if (!ids || ids.length === 0) {
    logger.warn(badReceivedData);
    return { status: 'ERROR', response: badReceivedData };
  }

  const imagesToBeDeleted: string[] = [];
  /* 
  validation if ids already exist in db
   */
  for (let i = 0; i < ids.length; i++) {
    let exists: unknown;
    try {
      exists = await checkIfCyclicalActivityExists(ids[i]);
      if (exists && typeof exists === 'object' && 'images' in exists) {
        const images = exists.images as ImageCyclicalActivity[];
        images.forEach((image) => imagesToBeDeleted.push(image.url));
      }
    } catch (error) {
      logger.warn((error as Error).stack);
      return { status: 'ERROR', response: dbReadingErrorMessage };
    }
    if (!exists) {
      logger.warn(cyclicalActivityNotExistsMessage);
      return { status: 'ERROR', response: cyclicalActivityNotExistsMessage };
    }
  }

  /* 
  deleting users from db
  */
  for (let i = 0; i < ids.length; i++) {
    const deleteCyclicalActivityImages =
      prisma.imageCyclicalActivity.deleteMany({
        where: {
          cyclicalActivityId: ids[i],
        },
      });

    const deleteCyclicalActivityOccurrence =
      prisma.cyclicalActivityOccurrence.deleteMany({
        where: { cyclicalActivityId: ids[i] },
      });

    const deleteCyclicalActivity = prisma.cyclicalActivity.deleteMany({
      where: {
        id: ids[i],
      },
    });

    // let transaction: unknown;
    try {
      await prisma.$transaction([
        deleteCyclicalActivityImages,
        deleteCyclicalActivityOccurrence,
        deleteCyclicalActivity,
      ]);
    } catch (error) {
      logger.warn((error as Error).stack);
      return { status: 'ERROR', response: dbDeletingErrorMessage };
    }
  }

  /* 
  deleting images from server (from deleted cyclical activity)
  */
  try {
    await deleteImagesFiles(imagesToBeDeleted);
  } catch (error) {
    logger.error((error as Error).stack);
  }

  /** revalidate all */
  revalidatePath('/');

  /** final response */
  const successMessage = `Zajęcia zostały usunięte.`;
  logger.info(successMessage);
  return {
    status: 'SUCCESS',
    response: successMessage,
  };
}

export async function getAllCyclicalActivities(): Promise<TGetAllCyclicalActivitiesResponse> {
  let cyclicalActivities: CyclicalActivity[] = [];

  try {
    cyclicalActivities = await prisma.cyclicalActivity.findMany({
      include: {
        images: true,
        occurrence: true,
      },
    });
  } catch (error) {
    logger.warn((error as Error).stack);
    return { status: 'ERROR', response: dbReadingErrorMessage };
  }
  return {
    status: 'SUCCESS',
    response: cyclicalActivities as CyclicalActivityTemporary[],
  };
}

export async function getCyclicalActivity(
  id: string
): Promise<TGetOneCyclicalActivityResponse> {
  let cyclicalActivity: TCyclicalActivityWithImageAndOccurrence | null;

  try {
    cyclicalActivity = await prisma.cyclicalActivity.findFirst({
      where: { id },
      include: {
        images: true,
        occurrence: true,
      },
    });
  } catch (error) {
    logger.warn((error as Error).stack);
    return { status: 'ERROR', response: dbReadingErrorMessage };
  }

  if (!cyclicalActivity) {
    return { status: 'ERROR', response: cyclicalActivityNotExistsMessage };
  }

  return { status: 'SUCCESS', response: cyclicalActivity };
}

export async function updateCyclicalActivity(
  originalCyclicalActivity: TCyclicalActivityFormInputs,
  changedCyclicalActivity: TCyclicalActivityFormInputs
): Promise<TActionResponse> {
  /**
   * checking session
   * */
  try {
    await checkIfLoggedIn();
  } catch (error) {
    return { status: 'ERROR', response: notLoggedIn };
  }

  /* 
  data validation 
  */
  const validationResult = validateValuesForCyclicalActivities(
    changedCyclicalActivity as Object
  );
  if (!validationResult) {
    logger.warn(badReceivedData);
    return { status: 'ERROR', response: badReceivedData };
  }

  /**
   * CyclicalActivity diff object
   * */
  const differencesCyclicalActivity = getDifferencesBetweenTwoObjects(
    originalCyclicalActivity,
    changedCyclicalActivity
  );
  delete differencesCyclicalActivity.images;
  delete differencesCyclicalActivity.occurrence;

  const cyclicalActivityPreparedForUpdateInDB: Prisma.CyclicalActivityUncheckedUpdateInput =
    getProperDataForCyclicalActivityUpdate(
      changedCyclicalActivity,
      differencesCyclicalActivity
    );

  const updateCyclicalActivity_ForPrismaTransaction =
    prisma.cyclicalActivity.update({
      where: { id: changedCyclicalActivity.id },
      data: cyclicalActivityPreparedForUpdateInDB,
    });

  /**
   * Occurrence
   * */
  const differencesOccurrence = getDifferencesBetweenTwoObjects(
    originalCyclicalActivity.occurrence,
    changedCyclicalActivity.occurrence
  );
  const isOccurrencesArraysEqualInLength =
    originalCyclicalActivity.occurrence.length ===
    changedCyclicalActivity.occurrence.length;

  const isOccurrencesToBeUpdated =
    differencesOccurrence.length || !isOccurrencesArraysEqualInLength;
  let occurrencePreparedDataForDb: TOccurrenceWithRequiredDatesAndCyclicalActivityID[] =
    [];
  let occurrencesToBeDeletedIDs: string[] = [];

  if (isOccurrencesToBeUpdated) {
    occurrencePreparedDataForDb = prepareOccurrenceDataForSavingInDB(
      changedCyclicalActivity,
      changedCyclicalActivity.id
    ) as TOccurrenceWithRequiredDatesAndCyclicalActivityID[];

    occurrencesToBeDeletedIDs = originalCyclicalActivity.occurrence.map(
      (occurrence) => occurrence.id!
    );
  }

  const occurrencePreparedDataForDb_ForPrismaTransaction =
    prisma.cyclicalActivityOccurrence.createMany({
      data: occurrencePreparedDataForDb,
    });

  const deleteOccurrencesForPrismaTransaction =
    prisma.cyclicalActivityOccurrence.deleteMany({
      where: {
        id: {
          in: occurrencesToBeDeletedIDs,
        },
      },
    });

  /**
   * Images
   * */
  const originalImages: TImageCyclicalActivityForDB[] =
    getRidOfFileDataAndPrepareObjectToComparisonToChangedData(
      originalCyclicalActivity.images
    );
  const changedImages: TImageCyclicalActivityForDB[] =
    changedCyclicalActivity.images;

  //images
  const currentlyCreatedImagesToBeDeletedWhenError: string[] = [];
  let imagesPreparedData: TImageCyclicalActivityForDB[] = [];
  try {
    imagesPreparedData = await prepareImagesForDB<
      TCyclicalActivityFormInputs,
      TImageCyclicalActivityForDB
    >(
      changedCyclicalActivity,
      currentlyCreatedImagesToBeDeletedWhenError,
      'IMAGE_REGULAR',
      'cyclical_activity',
      true
    );
  } catch (error) {
    logger.warn((error as Error).stack);
    await deleteImagesFiles(currentlyCreatedImagesToBeDeletedWhenError);
    return { status: 'ERROR', response: imageCreationErrorMessage };
  }

  const differencesImages = getDifferencesBetweenTwoObjects(
    originalImages,
    imagesPreparedData
  );

  let imagesToBeUpdatedPreparedForDB: Prisma.ImageCyclicalActivityUpdateManyMutationInput[] =
    [];
  let imagesToBeCreatedPreparedForDB: Prisma.ImageCyclicalActivityCreateManyInput[] =
    [];
  let imagesObjectsIDisToBeDeletedPreparedForDB: string[] = [];
  let imagesURLsBeDeleted: string[] = [];

  const isImagesToBeUpdated = getIfImagesShouldBeProcessedFurther(
    originalImages,
    changedImages,
    differencesImages
  );

  if (isImagesToBeUpdated) {
    const { imagesToBeCreated, imagesToBeUpdated, imagesToBeDeleted } =
      processImagesToDivideThemInArraysWithDifferentPurpose(
        originalImages,
        imagesPreparedData
      );

    if (imagesToBeDeleted.length) {
      imagesToBeDeleted.forEach((imageObject) => {
        imagesObjectsIDisToBeDeletedPreparedForDB.push(imageObject.id!);
        imagesURLsBeDeleted.push(imageObject.url);
      });
    }

    if (imagesToBeCreated.length) {
      imagesToBeCreated.forEach((imageObject) => {
        const newImageObjectWithoutId = {
          ...imageObject,
          cyclicalActivityId: originalCyclicalActivity.id,
        };
        delete newImageObjectWithoutId.id;
        imagesToBeCreatedPreparedForDB.push(newImageObjectWithoutId);
      });
    }

    if (imagesToBeUpdated.length) {
      for (let i = 0; i < imagesToBeUpdated.length; i++) {
        const imageObjectID = imagesToBeUpdated[i].id;
        const originalImageObject = originalImages.find(
          (imageObject) => imageObject.id === imageObjectID
        );
        const changedImageObject = imagesToBeUpdated[i];

        const differenceBetweenObjects = getDifferencesBetweenTwoObjects(
          originalImageObject,
          changedImageObject
        );

        const imageObjectId = originalImageObject!.id;

        const imageObjectToBeUpdatedData = {
          id: imageObjectId,
          ...differenceBetweenObjects,
        };
        imagesToBeUpdatedPreparedForDB.push(imageObjectToBeUpdatedData);

        if (differenceBetweenObjects.url) {
          imagesURLsBeDeleted.push(originalImageObject!.url);
        }
      }
    }
  }

  ///
  const deleteCyclicalActivitiesImagesPrismaTransaction =
    prisma.imageCyclicalActivity.deleteMany({
      where: {
        id: {
          in: imagesObjectsIDisToBeDeletedPreparedForDB,
        },
      },
    });

  const createCyclicalActivitiesImagesPrismaTransaction =
    prisma.imageCyclicalActivity.createMany({
      data: imagesToBeCreatedPreparedForDB,
    });

  const updateCyclicalActivitiesImagesPrismaTransaction =
    imagesToBeUpdatedPreparedForDB.map((imageObject) =>
      prisma.imageCyclicalActivity.update({
        where: {
          id: imageObject.id as string,
        },
        data: imageObject,
      })
    );

  /**
   *
   * updating cyclical activity elements in db
   *
   */
  let transaction: unknown;
  const transactionsArray: any[] = [
    updateCyclicalActivity_ForPrismaTransaction,
  ];
  if (isOccurrencesToBeUpdated) {
    transactionsArray.push(occurrencePreparedDataForDb_ForPrismaTransaction);
    transactionsArray.push(deleteOccurrencesForPrismaTransaction);
  }
  if (isImagesToBeUpdated) {
    transactionsArray.push(deleteCyclicalActivitiesImagesPrismaTransaction);
    transactionsArray.push(createCyclicalActivitiesImagesPrismaTransaction);
    transactionsArray.push(...updateCyclicalActivitiesImagesPrismaTransaction);
  }
  try {
    transaction = await prisma.$transaction(transactionsArray);
  } catch (error) {
    logger.warn((error as Error).stack);
    await deleteImagesFiles(currentlyCreatedImagesToBeDeletedWhenError);
    return { status: 'ERROR', response: dbWritingErrorMessage };
  }

  /* 
  deleting unused images from server
  */
  try {
    await deleteImagesFiles(imagesURLsBeDeleted);
  } catch (error) {
    logger.error((error as Error).stack);
  }

  /** revalidate all */
  revalidatePath('/');

  /* final success response */
  const successMessage = `Zajęcia: (${originalCyclicalActivity.name}) zostały zmienione.`;
  logger.info(successMessage);
  return {
    status: 'SUCCESS',
    response: successMessage,
  };
}

////utils
async function checkIfCyclicalActivityExists(id: string) {
  const exists = await prisma.cyclicalActivity.findUnique({
    where: { id },
    include: { images: true },
  });
  return exists;
}

function prepareOccurrenceDataForSavingInDB(
  values: TCyclicalActivityFormInputs,
  idOfMainCyclicalActivity?: string
):
  | TOccurrenceWithRequiredDatesAndCyclicalActivityID[]
  | TOccurrenceWithRequiredDates[] {
  return values.occurrence!.map((occurrenceItem) => {
    const resultOccurrenceWithoutCyclicalID: TOccurrenceWithRequiredDates = {
      day: occurrenceItem.day as Day,
      activityStart: occurrenceItem.activityStart as Date,
      activityEnd: occurrenceItem.activityEnd as Date,
    };

    if (idOfMainCyclicalActivity) {
      const resultOccurrenceWithCyclicalID: TOccurrenceWithRequiredDatesAndCyclicalActivityID =
        {
          ...resultOccurrenceWithoutCyclicalID,
          cyclicalActivityId: idOfMainCyclicalActivity,
        };
      return resultOccurrenceWithCyclicalID;
    }
    return resultOccurrenceWithoutCyclicalID;
  });
}
