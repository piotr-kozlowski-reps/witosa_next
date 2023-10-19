'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import {
  badCyclicalActivitiesData,
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
import { generateFileName } from '@/lib/textHelpers';
import prisma from '@/prisma/client';
import {
  TActionResponse,
  TCyclicalActivityFormInputs,
  TCyclicalActivityWithImageAndOccurrence,
  TGetAllCyclicalActivitiesResponse,
  TGetOneCyclicalActivityResponse,
  TImageCyclicalActivityAllOptional,
  TImageCyclicalActivityForDB,
  TImageCyclicalActivityFormValues,
  TOccurrenceWithRequiredDates,
  TOccurrenceWithRequiredDatesAndCyclicalActivityID,
} from '@/types';
import {
  CyclicalActivity,
  Day,
  ImageCyclicalActivity,
  Prisma,
} from '@prisma/client';
import { unlink } from 'fs/promises';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import sharp from 'sharp';

export async function addCyclicalActivity(
  values: TCyclicalActivityFormInputs
): Promise<TActionResponse> {
  /**
   * checking session
   * */
  const session = await getServerSession(authOptions);
  if (!session) {
    logger.warn(notLoggedIn);
    return { status: 'ERROR', response: notLoggedIn };
  }

  /* 
  data validation 
  */
  const validationResult = validateValuesForCyclicalActivities(
    values as Object
  );
  if (!validationResult) {
    logger.warn(badCyclicalActivitiesData);
    return { status: 'ERROR', response: badCyclicalActivitiesData };
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
    imagesPreparedData = await prepareImageDataForSavingInDB(
      values,
      currentlyCreatedImagesToBeDeletedWhenError
    );
  } catch (error) {
    logger.warn(dbWritingErrorMessage);
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
    console.log({ response });
  } catch (error) {
    console.log((error as Error).stack);
    logger.warn((error as Error).stack);
    await deleteImagesFiles(currentlyCreatedImagesToBeDeletedWhenError);
    return { status: 'ERROR', response: dbWritingErrorMessage };
  }

  /** revalidation */
  revalidatePath('/');

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
  const session = await getServerSession(authOptions);
  if (!session) {
    logger.warn(notLoggedIn);
    return { status: 'ERROR', response: notLoggedIn };
  }

  /**
   * checking values eXistenZ
   * */
  if (!ids || ids.length === 0) {
    logger.warn(badCyclicalActivitiesData);
    return { status: 'ERROR', response: badCyclicalActivitiesData };
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
      logger.warn(dbReadingErrorMessage);
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
    console.log(ids[i]);

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
      logger.warn(dbDeletingErrorMessage);
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
    logger.warn(dbReadingErrorMessage);
    return { status: 'ERROR', response: dbReadingErrorMessage };
  }
  return { status: 'SUCCESS', response: cyclicalActivities };
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
    logger.warn(dbReadingErrorMessage);
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
  const session = await getServerSession(authOptions);
  if (!session) {
    logger.warn(notLoggedIn);
    return { status: 'ERROR', response: notLoggedIn };
  }

  /* 
  data validation 
  */
  const validationResult = validateValuesForCyclicalActivities(
    changedCyclicalActivity as Object
  );
  if (!validationResult) {
    logger.warn(badCyclicalActivitiesData);
    return { status: 'ERROR', response: badCyclicalActivitiesData };
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

  const isOccurrencesToBeUpdated = differencesOccurrence.length;
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
    imagesPreparedData = await prepareImageDataForSavingInDB(
      changedCyclicalActivity,
      currentlyCreatedImagesToBeDeletedWhenError
    );
  } catch (error) {
    logger.warn(dbWritingErrorMessage);
    await deleteImagesFiles(currentlyCreatedImagesToBeDeletedWhenError);
    return { status: 'ERROR', response: imageCreationErrorMessage };
  }

  const differencesImages = getDifferencesBetweenTwoObjects(
    originalImages,
    imagesPreparedData
  );

  // console.log('originalImages: ', originalImages);
  // console.log('changedImages: ', changedImages);
  // console.log('differencesImages: ', differencesImages);
  // console.log('imagesPreparedData: ', imagesPreparedData);
  // console.log(
  //   'currentlyCreatedImagesToBeDeletedWhenError: ',
  //   currentlyCreatedImagesToBeDeletedWhenError
  // );

  let imagesToBeUpdatedPreparedForDB: Prisma.ImageCyclicalActivityUpdateManyMutationInput[] =
    [];
  let imagesToBeCreatedPreparedForDB: Prisma.ImageCyclicalActivityCreateManyInput[] =
    [];
  let imagesObjectsIDisToBeDeletedPreparedForDB: string[] = [];
  let imagesURLsBeDeleted: string[] = [];

  const isImagesToBeUpdated = getIfImagesShouldBeProcessedFurther(
    originalImages,
    changedImages,
    differencesImages as TImageCyclicalActivityAllOptional[]
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

        console.log(differenceBetweenObjects);
      }
    }
  }

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
    console.log((error as Error).stack);
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
    console.log((error as Error).stack);
  }

  console.log({ transaction });

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

async function prepareImageDataForSavingInDB(
  values: TCyclicalActivityFormInputs,
  createdImagesArray: string[]
): Promise<TImageCyclicalActivityForDB[]> {
  const originalImagesData = values.images;

  let result: TImageCyclicalActivityForDB[] = [];
  if (!originalImagesData) {
    return result;
  }
  for (let i = 0; i < originalImagesData.length; i++) {
    const imageUrl =
      await generateImageUrlAfterCreatingImageIfNeeded_Or_PassPathString(
        originalImagesData[i].file as string
      );

    //adding created image url to be deleted when some error occur
    createdImagesArray.push(imageUrl);

    result.push({
      url: imageUrl,
      alt: originalImagesData[i].alt as string,
      additionInfoThatMustBeDisplayed: originalImagesData[i]
        .additionInfoThatMustBeDisplayed
        ? (originalImagesData[i].additionInfoThatMustBeDisplayed as string)
        : null,
      id: originalImagesData[i].id,
    });
  }
  return result;
}
async function generateImageUrlAfterCreatingImageIfNeeded_Or_PassPathString(
  file: string
): Promise<string> {
  console.log({ file });

  if (file.startsWith('data:image') && file.includes('base64')) {
    const imageUrl = await proccessAndSaveImageOnServer(file);
    return imageUrl;
  }

  return file;
}

async function proccessAndSaveImageOnServer(
  fileAsBase64: string
): Promise<string> {
  if (!fileAsBase64) {
    throw new Error('No base 64 image');
  }

  const fileName = `./public/${generateFileName()}.jpg`;

  try {
    const uri = fileAsBase64.split(';base64,').pop();
    let buffer = Buffer.from(uri as string, 'base64');
    const image = await sharp(buffer)
      .resize({
        width: 1140,
        withoutEnlargement: true,
      })
      .toFormat('jpg', { compression: '80' })
      .toFile(fileName);

    console.log('saved image: ', { image });
  } catch (error) {
    logger.error(error);
    throw new Error('Unable to save image on server.');
  }

  return fileName.replace('./public/', '');
}

async function deleteImagesFiles(filesArray: string[]): Promise<boolean> {
  let result = true;
  for (let i = 0; i < filesArray.length; i++) {
    try {
      await unlink(`public/${filesArray[i]}`);
    } catch (error) {
      logger.error(`Deleting file: ${filesArray[i]} unsuccessful.`);
      result = false;
    }
  }

  return result;
}

function getProperDataForCyclicalActivityUpdate(
  changedCyclicalActivity: TCyclicalActivityFormInputs,
  differencesCyclicalActivity: Partial<TCyclicalActivityFormInputs>
): Prisma.CyclicalActivityUncheckedUpdateInput {
  const resultObject: Partial<TCyclicalActivityFormInputs> = {};
  // const resultObject: Prisma.CyclicalActivityUncheckedUpdateInput = {};

  for (let [key, value] of Object.entries(differencesCyclicalActivity)) {
    (resultObject as any)[key] = (changedCyclicalActivity as any)[key];
  }

  return resultObject as Prisma.CyclicalActivityUncheckedUpdateInput;
}

function getRidOfFileDataAndPrepareObjectToComparisonToChangedData(
  originalImages: TImageCyclicalActivityFormValues[]
): TImageCyclicalActivityForDB[] {
  return originalImages.map((imageProps) => ({
    id: imageProps.id,
    additionInfoThatMustBeDisplayed: imageProps.additionInfoThatMustBeDisplayed,
    alt: imageProps.alt,
    url: imageProps.url,
  }));
}

function processImagesToDivideThemInArraysWithDifferentPurpose(
  originalImages: TImageCyclicalActivityForDB[],
  changedImages: TImageCyclicalActivityForDB[]
) {
  let imagesToBeUpdated: TImageCyclicalActivityForDB[] = [];
  let imagesToBeCreated: TImageCyclicalActivityForDB[] = [];
  let imagesToBeDeleted: TImageCyclicalActivityForDB[] = [];

  const originalImagesToBeProcessed = [...originalImages];
  const changedImagesToBeProcessed = [...changedImages];

  //initial selection to deleted array / updated array
  for (let i = 0; i < originalImagesToBeProcessed.length; i++) {
    const existingItemId = originalImagesToBeProcessed[i].id;
    const changedImageIndex = changedImagesToBeProcessed.findIndex(
      (element) => element.id === existingItemId
    );

    //changed image not found -> delete
    if (changedImageIndex === -1) {
      imagesToBeDeleted.push(originalImagesToBeProcessed[i]);
      continue;
    }

    imagesToBeUpdated.push(changedImagesToBeProcessed[changedImageIndex]);
    changedImagesToBeProcessed.splice(changedImageIndex, 1);
  }

  imagesToBeCreated = [...changedImagesToBeProcessed];

  return { imagesToBeUpdated, imagesToBeCreated, imagesToBeDeleted };
}
