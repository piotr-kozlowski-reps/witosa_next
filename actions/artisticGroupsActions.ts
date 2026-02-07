'use server';

import {
  TActionResponse,
  TArtisticGroupFormInputs,
  TArtisticGroupWithImages,
  TGetAllArtisticGroupsResponse,
  TGetOneArtisticGroupResponse,
  TImageArtisticGroupForDB,
} from '@/types';
import { ArtisticGroup, ImageArtisticGroup, Prisma } from '@prisma/client';
import prisma from '@/prisma/client';
import logger from '@/lib/logger';
import { Session } from 'next-auth';
import {
  checkIfLoggedIn,
  deleteImagesFiles,
  prepareImagesForDB,
} from './actionHelpers';
import {
  artisticGroupNotExistsMessage,
  artisticGroupsNotExistMessage,
  badReceivedData,
  dbDeletingErrorMessage,
  dbReadingErrorMessage,
  dbWritingErrorMessage,
  imageCreationErrorMessage,
  notLoggedIn,
} from '@/lib/api/apiTextResponses';
import { validateValuesForArtisticGroups } from '@/lib/forms/artistic-groups-form';
import { revalidatePath } from 'next/cache';

export async function getAllArtisticGroups(): Promise<TGetAllArtisticGroupsResponse> {
  let artisticGroups: ArtisticGroup[] = [];
  try {
    artisticGroups = await prisma.artisticGroup.findMany({
      include: { images: true },
    });
  } catch (error) {
    logger.warn((error as Error).stack);
    return { status: 'ERROR', response: dbReadingErrorMessage };
  }
  return { status: 'SUCCESS', response: artisticGroups };
}

export async function addArtisticGroup(
  values: TArtisticGroupFormInputs
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
    validateValuesForArtisticGroups(values);
  } catch (error) {
    return { status: 'ERROR', response: badReceivedData };
  }

  //
  const currentlyCreatedImagesToBeDeletedWhenError: string[] = [];

  /*
   writing cyclical activity to db
   */
  const authorId = session.user?.id;
  if (!authorId) {
    return { status: 'ERROR', response: badReceivedData };
  }
  const isIncludeImages = values.images.length;

  //images
  let imagesPreparedData: TImageArtisticGroupForDB[];
  try {
    imagesPreparedData = await prepareImagesForDB<
      TArtisticGroupFormInputs,
      TImageArtisticGroupForDB
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

  // CyclicalActivityCreateInput;
  let artisticGroupPreparedForDb: Prisma.ArtisticGroupCreateInput = {
    title: values.title,
    isToBePublished: values.isToBePublished,
    detailedDescription: values.detailedDescription,
    author: {
      connect: { id: authorId },
    },
  };

  if (isIncludeImages) {
    artisticGroupPreparedForDb.images = {
      createMany: { data: imagesPreparedData },
    };
  }

  try {
    const response = await prisma.artisticGroup.create({
      data: artisticGroupPreparedForDb,
    });
  } catch (error) {
    logger.warn((error as Error).stack);
    await deleteImagesFiles(currentlyCreatedImagesToBeDeletedWhenError);
    return { status: 'ERROR', response: dbWritingErrorMessage };
  }

  /** revalidation */
  revalidatePath('/');
  revalidatePath('/groups');

  /* final success response */
  const successMessage = `Grupa artystyczna: (${values.title}) została zapisana.`;
  logger.info(successMessage);
  return {
    status: 'SUCCESS',
    response: successMessage,
  };
}

export async function deleteArtisticGroups(
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
      exists = await checkIfArtisticGroupExists(ids[i]);
      if (exists && typeof exists === 'object' && 'images' in exists) {
        const images = exists.images as ImageArtisticGroup[];
        images.forEach((image) => imagesToBeDeleted.push(image.url));
      }
    } catch (error) {
      logger.warn((error as Error).stack);
      return { status: 'ERROR', response: dbReadingErrorMessage };
    }
    if (!exists) {
      logger.warn(artisticGroupsNotExistMessage);
      return { status: 'ERROR', response: artisticGroupsNotExistMessage };
    }
  }

  /*
  deleting users from db
  */
  for (let i = 0; i < ids.length; i++) {
    const deleteArtisticGroupImages = prisma.imageArtisticGroup.deleteMany({
      where: {
        artisticGroupId: ids[i],
      },
    });

    const deleteArtisticGroup = prisma.artisticGroup.deleteMany({
      where: {
        id: ids[i],
      },
    });

    let transaction: unknown;
    try {
      await prisma.$transaction([
        deleteArtisticGroupImages,
        deleteArtisticGroup,
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
  revalidatePath('/groups');
  revalidatePath('/dashboard');

  /** final response */
  const successMessage = `Grupy artystyczne zostały usunięte.`;
  logger.info(successMessage);
  return {
    status: 'SUCCESS',
    response: successMessage,
  };
}

export async function getArtisticGroup(
  id: string
): Promise<TGetOneArtisticGroupResponse> {
  let artisticGroup: TArtisticGroupWithImages | null;
  try {
    artisticGroup = await prisma.artisticGroup.findFirst({
      where: { id },
      include: {
        images: true,
      },
    });
  } catch (error) {
    logger.warn((error as Error).stack);
    return { status: 'ERROR', response: dbReadingErrorMessage };
  }
  if (!artisticGroup) {
    return { status: 'ERROR', response: artisticGroupNotExistsMessage };
  }
  return { status: 'SUCCESS', response: artisticGroup };
}

export async function updateArtisticGroup(
  originalArtisticGroup: TArtisticGroupFormInputs,
  changedArtisticGroup: TArtisticGroupFormInputs
): Promise<TActionResponse> {
  // /**
  //  * checking session
  //  * */
  // try {
  //   await checkIfLoggedIn();
  // } catch (error) {
  //   return { status: 'ERROR', response: notLoggedIn };
  // }
  // /*
  // data validation
  // */
  // const validationResult = validateValuesForCyclicalActivities(
  //   changedArtisticGroup as Object
  // );
  // if (!validationResult) {
  //   logger.warn(badReceivedData);
  //   return { status: 'ERROR', response: badReceivedData };
  // }
  // /**
  //  * CyclicalActivity diff object
  //  * */
  // const differencesCyclicalActivity = getDifferencesBetweenTwoObjects(
  //   originalArtisticGroup,
  //   changedArtisticGroup
  // );
  // delete differencesCyclicalActivity.images;
  // delete differencesCyclicalActivity.occurrence;
  // const cyclicalActivityPreparedForUpdateInDB: Prisma.CyclicalActivityUncheckedUpdateInput =
  //   getProperDataForCyclicalActivityUpdate(
  //     changedArtisticGroup,
  //     differencesCyclicalActivity
  //   );
  // const updateCyclicalActivity_ForPrismaTransaction =
  //   prisma.cyclicalActivity.update({
  //     where: { id: changedArtisticGroup.id },
  //     data: cyclicalActivityPreparedForUpdateInDB,
  //   });
  // /**
  //  * Occurrence
  //  * */
  // const differencesOccurrence = getDifferencesBetweenTwoObjects(
  //   originalArtisticGroup.occurrence,
  //   changedArtisticGroup.occurrence
  // );
  // const isOccurrencesArraysEqualInLength =
  //   originalArtisticGroup.occurrence.length ===
  //   changedArtisticGroup.occurrence.length;
  // const isOccurrencesToBeUpdated =
  //   differencesOccurrence.length || !isOccurrencesArraysEqualInLength;
  // let occurrencePreparedDataForDb: TOccurrenceWithRequiredDatesAndCyclicalActivityID[] =
  //   [];
  // let occurrencesToBeDeletedIDs: string[] = [];
  // if (isOccurrencesToBeUpdated) {
  //   occurrencePreparedDataForDb = prepareOccurrenceDataForSavingInDB(
  //     changedArtisticGroup,
  //     changedArtisticGroup.id
  //   ) as TOccurrenceWithRequiredDatesAndCyclicalActivityID[];
  //   occurrencesToBeDeletedIDs = originalArtisticGroup.occurrence.map(
  //     (occurrence) => occurrence.id!
  //   );
  // }
  // const occurrencePreparedDataForDb_ForPrismaTransaction =
  //   prisma.cyclicalActivityOccurrence.createMany({
  //     data: occurrencePreparedDataForDb,
  //   });
  // const deleteOccurrencesForPrismaTransaction =
  //   prisma.cyclicalActivityOccurrence.deleteMany({
  //     where: {
  //       id: {
  //         in: occurrencesToBeDeletedIDs,
  //       },
  //     },
  //   });
  // /**
  //  * Images
  //  * */
  // const originalImages: TImageCyclicalActivityForDB[] =
  //   getRidOfFileDataAndPrepareObjectToComparisonToChangedData(
  //     originalArtisticGroup.images
  //   );
  // const changedImages: TImageCyclicalActivityForDB[] =
  //   changedArtisticGroup.images;
  // //images
  // const currentlyCreatedImagesToBeDeletedWhenError: string[] = [];
  // let imagesPreparedData: TImageCyclicalActivityForDB[] = [];
  // try {
  //   imagesPreparedData = await prepareImagesForDB<
  //     TCyclicalActivityFormInputs,
  //     TImageCyclicalActivityForDB
  //   >(
  //     changedArtisticGroup,
  //     currentlyCreatedImagesToBeDeletedWhenError,
  //     'IMAGE_REGULAR',
  //     'cyclical_activity',
  //     true
  //   );
  // } catch (error) {
  //   logger.warn((error as Error).stack);
  //   await deleteImagesFiles(currentlyCreatedImagesToBeDeletedWhenError);
  //   return { status: 'ERROR', response: imageCreationErrorMessage };
  // }
  // const differencesImages = getDifferencesBetweenTwoObjects(
  //   originalImages,
  //   imagesPreparedData
  // );
  // let imagesToBeUpdatedPreparedForDB: Prisma.ImageCyclicalActivityUpdateManyMutationInput[] =
  //   [];
  // let imagesToBeCreatedPreparedForDB: Prisma.ImageCyclicalActivityCreateManyInput[] =
  //   [];
  // let imagesObjectsIDisToBeDeletedPreparedForDB: string[] = [];
  // let imagesURLsBeDeleted: string[] = [];
  // const isImagesToBeUpdated = getIfImagesShouldBeProcessedFurther(
  //   originalImages,
  //   changedImages,
  //   differencesImages
  // );
  // if (isImagesToBeUpdated) {
  //   const { imagesToBeCreated, imagesToBeUpdated, imagesToBeDeleted } =
  //     processImagesToDivideThemInArraysWithDifferentPurpose(
  //       originalImages,
  //       imagesPreparedData
  //     );
  //   if (imagesToBeDeleted.length) {
  //     imagesToBeDeleted.forEach((imageObject) => {
  //       imagesObjectsIDisToBeDeletedPreparedForDB.push(imageObject.id!);
  //       imagesURLsBeDeleted.push(imageObject.url);
  //     });
  //   }
  //   if (imagesToBeCreated.length) {
  //     imagesToBeCreated.forEach((imageObject) => {
  //       const newImageObjectWithoutId = {
  //         ...imageObject,
  //         cyclicalActivityId: originalArtisticGroup.id,
  //       };
  //       delete newImageObjectWithoutId.id;
  //       imagesToBeCreatedPreparedForDB.push(newImageObjectWithoutId);
  //     });
  //   }
  //   if (imagesToBeUpdated.length) {
  //     for (let i = 0; i < imagesToBeUpdated.length; i++) {
  //       const imageObjectID = imagesToBeUpdated[i].id;
  //       const originalImageObject = originalImages.find(
  //         (imageObject) => imageObject.id === imageObjectID
  //       );
  //       const changedImageObject = imagesToBeUpdated[i];
  //       const differenceBetweenObjects = getDifferencesBetweenTwoObjects(
  //         originalImageObject,
  //         changedImageObject
  //       );
  //       const imageObjectId = originalImageObject!.id;
  //       const imageObjectToBeUpdatedData = {
  //         id: imageObjectId,
  //         ...differenceBetweenObjects,
  //       };
  //       imagesToBeUpdatedPreparedForDB.push(imageObjectToBeUpdatedData);
  //       if (differenceBetweenObjects.url) {
  //         imagesURLsBeDeleted.push(originalImageObject!.url);
  //       }
  //     }
  //   }
  // }
  // ///
  // const deleteCyclicalActivitiesImagesPrismaTransaction =
  //   prisma.imageCyclicalActivity.deleteMany({
  //     where: {
  //       id: {
  //         in: imagesObjectsIDisToBeDeletedPreparedForDB,
  //       },
  //     },
  //   });
  // const createCyclicalActivitiesImagesPrismaTransaction =
  //   prisma.imageCyclicalActivity.createMany({
  //     data: imagesToBeCreatedPreparedForDB,
  //   });
  // const updateCyclicalActivitiesImagesPrismaTransaction =
  //   imagesToBeUpdatedPreparedForDB.map((imageObject) =>
  //     prisma.imageCyclicalActivity.update({
  //       where: {
  //         id: imageObject.id as string,
  //       },
  //       data: imageObject,
  //     })
  //   );
  // /**
  //  *
  //  * updating cyclical activity elements in db
  //  *
  //  */
  // let transaction: unknown;
  // const transactionsArray: any[] = [
  //   updateCyclicalActivity_ForPrismaTransaction,
  // ];
  // if (isOccurrencesToBeUpdated) {
  //   transactionsArray.push(occurrencePreparedDataForDb_ForPrismaTransaction);
  //   transactionsArray.push(deleteOccurrencesForPrismaTransaction);
  // }
  // if (isImagesToBeUpdated) {
  //   transactionsArray.push(deleteCyclicalActivitiesImagesPrismaTransaction);
  //   transactionsArray.push(createCyclicalActivitiesImagesPrismaTransaction);
  //   transactionsArray.push(...updateCyclicalActivitiesImagesPrismaTransaction);
  // }
  // try {
  //   transaction = await prisma.$transaction(transactionsArray);
  // } catch (error) {
  //   logger.warn((error as Error).stack);
  //   await deleteImagesFiles(currentlyCreatedImagesToBeDeletedWhenError);
  //   return { status: 'ERROR', response: dbWritingErrorMessage };
  // }
  // /*
  // deleting unused images from server
  // */
  // try {
  //   await deleteImagesFiles(imagesURLsBeDeleted);
  // } catch (error) {
  //   logger.error((error as Error).stack);
  // }
  // /** revalidate all */
  // revalidatePath('/');
  // /* final success response */
  // const successMessage = `Zajęcia: (${originalArtisticGroup.name}) zostały zmienione.`;
  // logger.info(successMessage);
  // return {
  //   status: 'SUCCESS',
  //   response: successMessage,
  // };
}

////utils
async function checkIfArtisticGroupExists(id: string) {
  const exists = await prisma.artisticGroup.findUnique({
    where: { id },
    include: { images: true },
  });
  return exists;
}
