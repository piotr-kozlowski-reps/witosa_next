'use server';

import {
  TActionResponse,
  TArtisticGroupFormInputs,
  TGetAllArtisticGroupsResponse,
} from '@/types';
import { ArtisticGroup, Prisma } from '@prisma/client';
import prisma from '@/prisma/client';
import logger from '@/lib/logger';
import { Session } from 'next-auth';
import {
  checkIfLoggedIn,
  deleteImagesFiles,
  prepareImagesForDB,
  validateCyclicalActivityData,
} from './actionHelpers';
import {
  badReceivedData,
  cyclicalActivityNotExistsMessage,
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
  //   const isIncludeImages = !values.isCustomLinkToDetails;

  //   //occurrence
  //   const occurrencePreparedData: TOccurrenceWithRequiredDates[] =
  //     prepareOccurrenceDataForSavingInDB(values);

  //   //images
  //   let imagesPreparedData: TImageCyclicalActivityForDB[];
  //   try {
  //     imagesPreparedData = await prepareImagesForDB<
  //       TCyclicalActivityFormInputs,
  //       TImageCyclicalActivityForDB
  //     >(
  //       values,
  //       currentlyCreatedImagesToBeDeletedWhenError,
  //       'IMAGE_REGULAR',
  //       'cyclical_activity',
  //       false
  //     );
  //   } catch (error) {
  //     logger.warn((error as Error).stack);
  //     await deleteImagesFiles(currentlyCreatedImagesToBeDeletedWhenError);
  //     return { status: 'ERROR', response: imageCreationErrorMessage };
  //   }

  // CyclicalActivityCreateInput;
  let artisticGroupPreparedForDb: Prisma.ArtisticGroupCreateInput = {
    title: values.title,
    isToBePublished: values.isToBePublished,
    detailedDescription: values.detailedDescription,
    author: {
      connect: { id: authorId },
    },
    // images?: Prisma.ImageArtisticGroupCreateNestedManyWithoutArtisticGroupInput;

    //     name: values.name,
    //     activityTypes: values.activityTypes,
    //     activitiesForWhom: values.activitiesForWhom,
    //     places: values.places,
    //     isToBePublished: values.isToBePublished as boolean,
    //     isExpiresAtRequired: values.isExpiresAtRequired as boolean,
    //     expiresAt: values.expiresAt as string | Date | null | undefined,
    //     //stage2
    //     shortDescription: values.shortDescription,
    //     isCustomLinkToDetails: values.isCustomLinkToDetails as boolean,
    //     longDescription: values.longDescription
    //       ? (values.longDescription as string)
    //       : null,
    //     customLinkToDetails: values.customLinkToDetails
    //       ? values.customLinkToDetails
    //       : null,
    //     author: {
    //       connect: { id: authorId },
    //     },
    //     //stage3
    //     occurrence: {
    //       createMany: {
    //         data: occurrencePreparedData,
    //       },
    //     },
  };

  //   if (isIncludeImages) {
  //     cyclicalActivityPreparedForDb.images = {
  //       createMany: { data: imagesPreparedData },
  //     };
  //   }

  try {
    const response = await prisma.artisticGroup.create({
      data: artisticGroupPreparedForDb,
    });
  } catch (error) {
    logger.warn((error as Error).stack);
    // await deleteImagesFiles(currentlyCreatedImagesToBeDeletedWhenError);
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
