'use server';

import {
  badEventData,
  badReceivedData,
  dbDeletingErrorMessage,
  dbReadingErrorMessage,
  dbWritingErrorMessage,
  eventNotExistsMessage,
  imageCreationErrorMessage,
  notLoggedIn,
} from '@/lib/api/apiTextResponses';
import logger from '@/lib/logger';
import prisma from '@/prisma/client';
import {
  TActionResponse,
  TEventFormInputs,
  TEventWithImages,
  TGetAllEventsResponse,
  TGetOneEventResponse,
  TImageEventForDB,
} from '@/types';
import { Event, ImageEvent, Prisma } from '@prisma/client';
import { Session } from 'next-auth';
import { revalidatePath } from 'next/cache';
import {
  checkIfLoggedIn,
  deleteImagesFiles,
  prepareImageForDB,
  prepareImagesForDB,
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
  //TODO: add looking for duplicates in images/sliderImage - if so - copy image from slider to desired one in images
  let imagesPreparedForDB: TImageEventForDB[] = [];
  try {
    imagesPreparedForDB = await prepareImagesForDB<
      TEventFormInputs,
      TImageEventForDB
    >(
      values,
      currentlyCreatedImagesToBeDeletedWhenError,
      'IMAGE_REGULAR',
      'event'
    );
  } catch (error) {
    logger.warn((error as Error).stack);
    await deleteImagesFiles(currentlyCreatedImagesToBeDeletedWhenError);
    return { status: 'ERROR', response: imageCreationErrorMessage };
  }

  // console.log({ newsSectionImageUrlPreparedForDB });
  // console.log({ sliderImageUrlPreparedForDB });
  // console.log({ imagesPreparedForDB });
  // console.log({ currentlyCreatedImagesToBeDeletedWhenError });

  let eventPreparedForDb: Prisma.EventCreateInput = {
    //stage1
    title: values.title,
    eventTypes: values.eventTypes,
    eventForWhom: values.eventForWhom,
    places: values.places,
    eventStartDate: values.eventStartDate as string | Date,
    eventEndDate: null,
    isToBePublished: values.isToBePublished,
    visibleFrom: values.visibleFrom,
    visibleTo: values.visibleTo,
    author: {
      connect: { id: authorId },
    },

    //stage2
    isToBeInNewsSection: values.isToBeInNewsSection,
    isToBeOnlyInNewsSection_NotSeenInEvents:
      values.isToBeOnlyInNewsSection_NotSeenInEvents,
    isDateToBeHiddenInNewsSection: values.isDateToBeHiddenInNewsSection,
    newsSectionImageUrl: newsSectionImageUrlPreparedForDB,
    newsSectionImageAlt: values.newsSectionImageAlt,

    //stage3
    isCustomLinkToDetails: values.isCustomLinkToDetails,
    customLinkToDetails: values.customLinkToDetails,
    shortDescription: values.shortDescription,
    // images: imagesPreparedForDB,
    detailedDescription: values.detailedDescription,

    //stage4
    isToBeInSlider: values.isToBeInSlider,
    sliderImageUrl: sliderImageUrlPreparedForDB,
    sliderImageAlt: values.sliderImageAlt,
    visibleInSliderFrom: values.visibleInSliderFrom,
    visibleInSliderTo: values.visibleInSliderTo,

    //stage5
    kindOfEnterInfo: values.kindOfEnterInfo,
    isPayed: values.isPayed,
    ticketBuyingUrl: values.ticketBuyingUrl,
  };

  //add images when needed
  const isIncludeImages = !values.isCustomLinkToDetails;
  if (isIncludeImages) {
    eventPreparedForDb.images = {
      createMany: { data: imagesPreparedForDB },
    };
  }

  /*
   writing cyclical activity to db
   */
  try {
    console.log('writing to db');

    const response = await prisma.event.create({
      data: eventPreparedForDb,
    });
    console.log({ response });
  } catch (error) {
    logger.warn((error as Error).stack);
    await deleteImagesFiles(currentlyCreatedImagesToBeDeletedWhenError);
    return { status: 'ERROR', response: dbWritingErrorMessage };
  }

  /**
   * revalidation
   * */
  revalidatePath('/');

  /**
   *  final success response
   * */
  const successMessage = `Wydarzenie: (${values.title}) zostały zapisane.`;
  logger.info(successMessage);
  return {
    status: 'SUCCESS',
    response: successMessage,
  };
}

export async function getEvent(id: string): Promise<TGetOneEventResponse> {
  let event: TEventWithImages | null;

  try {
    event = await prisma.event.findFirst({
      where: { id },
      include: {
        images: true,
      },
    });
  } catch (error) {
    logger.warn((error as Error).stack);
    return { status: 'ERROR', response: dbReadingErrorMessage };
  }

  if (!event) {
    return { status: 'ERROR', response: eventNotExistsMessage };
  }

  return { status: 'SUCCESS', response: event };
}

export async function deleteEvents(ids: string[]): Promise<TActionResponse> {
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
      exists = await checkIfEventExists(ids[i]);
      findAllImagesToBeDeletedAndFillWithThemPassedArray(
        exists as Event,
        imagesToBeDeleted
      );
    } catch (error) {
      logger.warn((error as Error).stack);
      return { status: 'ERROR', response: dbReadingErrorMessage };
    }
    if (!exists) {
      logger.warn(eventNotExistsMessage);
      return { status: 'ERROR', response: eventNotExistsMessage };
    }
  }

  /*
  deleting event from db
  */
  for (let i = 0; i < ids.length; i++) {
    //images
    const deleteEventImages = prisma.imageEvent.deleteMany({
      where: {
        eventId: ids[i],
      },
    });

    //
    const deleteEvent = prisma.event.deleteMany({
      where: {
        id: ids[i],
      },
    });

    try {
      await prisma.$transaction([deleteEventImages, deleteEvent]);
    } catch (error) {
      logger.warn((error as Error).stack);
      return { status: 'ERROR', response: dbDeletingErrorMessage };
    }
  }

  /*
  deleting images from server (from deleted event)
  */
  try {
    await deleteImagesFiles(imagesToBeDeleted);
  } catch (error) {
    logger.error((error as Error).stack);
  }

  /**
   * revalidate all
   * */
  revalidatePath('/');

  /**
   * final response
   * */
  const successMessage = `Zajęcia zostały usunięte.`;
  logger.info(successMessage);
  return {
    status: 'SUCCESS',
    response: successMessage,
  };
}

////
//utils
async function checkIfEventExists(id: string) {
  const exists = await prisma.event.findUnique({
    where: { id },
    include: { images: true },
  });
  return exists;
}

function findAllImagesToBeDeletedAndFillWithThemPassedArray(
  exists: Event,
  imagesToBeDeleted: string[]
) {
  console.log({ exists });

  //newsSectionImageUrl
  if (exists.newsSectionImageUrl) {
    imagesToBeDeleted.push(exists.newsSectionImageUrl);
  }

  //sliderImageUrl
  if (exists.sliderImageUrl) {
    imagesToBeDeleted.push(exists.sliderImageUrl);
  }

  //images
  if ('images' in exists) {
    const images = exists.images as ImageEvent[];
    images.forEach((image) => imagesToBeDeleted.push(image.url));
  }
}
