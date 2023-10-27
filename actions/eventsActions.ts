'use server';

import { dbReadingErrorMessage, notLoggedIn } from '@/lib/api/apiTextResponses';
import logger from '@/lib/logger';
import prisma from '@/prisma/client';
import {
  TActionResponse,
  TEventFormInputs,
  TGetAllEventsResponse,
} from '@/types';
import { Event } from '@prisma/client';
import { checkIfLoggedIn } from './actionHelpers';

export async function getAllEvents(): Promise<TGetAllEventsResponse> {
  let events: Event[] = [];

  try {
    events = await prisma.event.findMany({ include: { images: true } });
  } catch (error) {
    logger.warn((error as Error).stack);
    return { status: 'ERROR', response: dbReadingErrorMessage };
  }
  return { status: 'SUCCESS', response: events };
}

export async function addEvent(
  values: TEventFormInputs
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
  //   const validationResult = validateValuesForCyclicalActivities(
  //     values as Object
  //   );
  //   if (!validationResult) {
  //     logger.warn(badCyclicalActivitiesData);
  //     return { status: 'ERROR', response: badCyclicalActivitiesData };
  //   }

  //   //
  //   const currentlyCreatedImagesToBeDeletedWhenError: string[] = [];

  //   /*
  //  writing cyclical activity to db
  //  */
  //   const authorId = session.user?.id;
  //   const isIncludeImages = !values.isCustomLinkToDetails;

  //   //occurrence
  //   const occurrencePreparedData: TOccurrenceWithRequiredDates[] =
  //     prepareOccurrenceDataForSavingInDB(values);

  //   //images
  //   let imagesPreparedData: TImageCyclicalActivityForDB[];
  //   try {
  //     imagesPreparedData = await prepareImageDataForSavingInDB(
  //       values,
  //       currentlyCreatedImagesToBeDeletedWhenError
  //     );
  //   } catch (error) {
  //     logger.warn((error as Error).stack);
  //     await deleteImagesFiles(currentlyCreatedImagesToBeDeletedWhenError);
  //     return { status: 'ERROR', response: imageCreationErrorMessage };
  //   }

  //   let cyclicalActivityPreparedForDb: Prisma.CyclicalActivityCreateInput = {
  //     //stage1
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
  //   };

  //   if (isIncludeImages) {
  //     cyclicalActivityPreparedForDb.images = {
  //       createMany: { data: imagesPreparedData },
  //     };
  //   }

  //   try {
  //     const response = await prisma.cyclicalActivity.create({
  //       data: cyclicalActivityPreparedForDb,
  //     });
  //     console.log({ response });
  //   } catch (error) {
  //     console.log((error as Error).stack);
  //     logger.warn((error as Error).stack);
  //     await deleteImagesFiles(currentlyCreatedImagesToBeDeletedWhenError);
  //     return { status: 'ERROR', response: dbWritingErrorMessage };
  //   }

  //   /** revalidation */
  //   revalidatePath('/');

  /* final success response */
  const successMessage = `Wydarzenie: (${values.title}) zostały zapisane.`;
  logger.info(successMessage);
  return {
    status: 'SUCCESS',
    response: successMessage,
  };
}
