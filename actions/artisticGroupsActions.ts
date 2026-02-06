'use server';

import {
  TActionResponse,
  TArtisticGroupFormInputs,
  TGetAllArtisticGroupsResponse,
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
      logger.warn(artisticGroupNotExistsMessage);
      return { status: 'ERROR', response: artisticGroupNotExistsMessage };
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

////utils
async function checkIfArtisticGroupExists(id: string) {
  const exists = await prisma.artisticGroup.findUnique({
    where: { id },
    include: { images: true },
  });
  return exists;
}
