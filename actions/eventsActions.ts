'use server';

import {
  badEventData,
  dbReadingErrorMessage,
  notLoggedIn,
} from '@/lib/api/apiTextResponses';
import logger from '@/lib/logger';
import prisma from '@/prisma/client';
import {
  TActionResponse,
  TEventFormInputs,
  TGetAllEventsResponse,
  TImageEventForDB,
} from '@/types';
import { Event } from '@prisma/client';
import { Session } from 'next-auth';
import {
  checkIfLoggedIn,
  prepareImageDataForSavingInDB,
  prepareImageForDB,
  validateEventData,
} from './actionHelpers';

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
    validateEventData(values);
  } catch (error) {
    return { status: 'ERROR', response: badEventData };
  }

  //
  const currentlyCreatedImagesToBeDeletedWhenError: string[] = [];

  /*
   preparing event data for db
   */
  const authorId = session.user?.id;

  // newsSectionImage
  let newsSectionImageUrlPreparedForDB: string | null = await prepareImageForDB(
    values.newsSectionImageUrl as string | null,
    currentlyCreatedImagesToBeDeletedWhenError,
    'IMAGE_NEWS',
    'news'
  );

  // sliderImageUrl
  let sliderImageUrlPreparedForDB: string | null = await prepareImageForDB(
    values.sliderImageUrl as string | null,
    currentlyCreatedImagesToBeDeletedWhenError,
    'IMAGE_REGULAR',
    'event'
  );

  //images
  let imagesPreparedForDB: TImageEventForDB[];
  try {
    imagesPreparedForDB = await prepareImageDataForSavingInDB(
      values,
      currentlyCreatedImagesToBeDeletedWhenError
    );
  } catch (error) {
    // logger.warn((error as Error).stack);
    // await deleteImagesFiles(currentlyCreatedImagesToBeDeletedWhenError);
    // return { status: 'ERROR', response: imageCreationErrorMessage };
  }

  console.log({ newsSectionImageUrlPreparedForDB });
  console.log({ sliderImageUrlPreparedForDB });
  console.log({ currentlyCreatedImagesToBeDeletedWhenError });

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

  // let eventPreparedForDb: Prisma.EventCreateInput = {
  //   //stage1
  //   title: values.title,
  //   eventTypes: values.eventTypes,
  //   eventForWhom: values.eventForWhom,
  //   places: values.places,
  //   eventStartDate: values.eventStartDate as string | Date,
  //   eventEndDate: null,
  //   isToBePublished: values.isToBePublished,
  //   visibleFrom: values.visibleFrom,
  //   visibleTo: values.visibleTo,
  //   author: {
  //     connect: { id: authorId },
  //   },

  //   //stage2
  //   isToBeInNewsSection: values.isToBeInNewsSection,
  //   isToBeOnlyInNewsSection_NotSeenInEvents:
  //     values.isToBeOnlyInNewsSection_NotSeenInEvents,
  //   isDateToBeHiddenInNewsSection: values.isDateToBeHiddenInNewsSection,

  //   ///////////////////////////////////////////////
  //   // newsSectionImageUrl: null,
  //   // newsSectionImageAlt: '',

  //   // //stage2
  //   // shortDescription: values.shortDescription,
  //   // isCustomLinkToDetails: values.isCustomLinkToDetails as boolean,
  //   // longDescription: values.longDescription
  //   //   ? (values.longDescription as string)
  //   //   : null,
  //   // customLinkToDetails: values.customLinkToDetails
  //   //   ? values.customLinkToDetails
  //   //   : null,
  //   // author: {
  //   //   connect: { id: authorId },
  //   // },
  //   // //stage3
  //   // occurrence: {
  //   //   createMany: {
  //   //     data: occurrencePreparedData,
  //   //   },
  //   // },
  // };

  //   if (isIncludeImages) {
  //     cyclicalActivityPreparedForDb.images = {
  //       createMany: { data: imagesPreparedData },
  //     };
  //   }
  //   /*
  //  writing cyclical activity to db
  //  */
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
