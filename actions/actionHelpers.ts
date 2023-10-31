'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import {
  badEventData,
  badReceivedData,
  notLoggedIn,
} from '@/lib/api/apiTextResponses';
import { validateValuesForCyclicalActivities } from '@/lib/forms/cyclical-activities-form';
import { validateValuesForEvents } from '@/lib/forms/events-form';
import logger from '@/lib/logger';
import {
  getDifferencesBetweenTwoObjects,
  getIfImagesShouldBeProcessedFurther,
} from '@/lib/objectHelpers';
import { generateFileName } from '@/lib/textHelpers';
import {
  TEventFormInputs,
  TFileWithPreview,
  TImageCyclicalActivityForDB,
  TImageCyclicalActivityFormValues,
  TImageEventForDB,
  TImageEventFormValue,
  TImagesToBeUpdatedDeletedCreated,
  TStringToDistinguishCreatedImageName,
  TTypeOfImageToBeGenerated,
} from '@/types';
import { unlink } from 'fs/promises';
import { getServerSession } from 'next-auth';
import sharp from 'sharp';
import {
  createNewImageIfNeededAndAddToProperArraysToBeFurtherProcessed,
  processImagesToDivideThemInArraysWithDifferentPurposeChanged,
} from './syncActionHelpers';

export async function checkIfLoggedIn() {
  const session = await getServerSession(authOptions);
  if (!session) {
    logger.warn(notLoggedIn);
    throw new Error('not logged in');
  }
  return session;
}

export async function validateEventData(values: Object) {
  const validationResult = validateValuesForEvents(values);
  if (!validationResult) {
    logger.warn(badEventData);
    throw new Error(badEventData);
  }
}
export async function validateCyclicalActivityData(values: Object) {
  const validationResult = validateValuesForCyclicalActivities(values);
  if (!validationResult) {
    logger.warn(badReceivedData);
    throw new Error(badReceivedData);
  }
}

export async function generateImageUrlAfterCreatingImageIfNeeded_Or_PassPathString(
  file: string,
  typeOfImageToBeGenerated: TTypeOfImageToBeGenerated,
  stringToDistinguishCreatedImageName: TStringToDistinguishCreatedImageName
): Promise<string> {
  if (file.startsWith('data:image') && file.includes('base64')) {
    const imageUrl = await processAndSaveImageOnServer(
      file,
      typeOfImageToBeGenerated,
      stringToDistinguishCreatedImageName
    );
    return imageUrl;
  }

  return file;
}

export async function processAndSaveImageOnServer(
  fileAsBase64: string,
  typeOfImageToBeGenerated: TTypeOfImageToBeGenerated,
  stringToDistinguishCreatedImageName: TStringToDistinguishCreatedImageName
): Promise<string> {
  if (!fileAsBase64) {
    throw new Error('No base 64 image');
  }

  const fileName = `./public/${generateFileName(
    stringToDistinguishCreatedImageName
  )}.jpg`;

  try {
    const uri = fileAsBase64.split(';base64,').pop();
    let buffer = Buffer.from(uri as string, 'base64');
    const image = await sharp(buffer)
      .resize(
        typeOfImageToBeGenerated === 'IMAGE_REGULAR'
          ? {
              width: 1140,
              withoutEnlargement: true,
            }
          : { width: 271, height: 271, withoutEnlargement: false }
      )
      .toFormat('jpg', { compression: '80' })
      .toFile(fileName);

    console.log('saved image: ', { image });
    console.log('saved image name: ', { fileName });
    console.log('process.cwd() ', process.cwd());
  } catch (error) {
    logger.error(error);
    throw new Error('Unable to save image on server.');
  }

  return fileName.replace('./public/', '');
}

export async function prepareImageForDB(
  image: string | null,
  createdImagesArray: string[],
  typeOfImageToBeGenerated: TTypeOfImageToBeGenerated,
  stringToDistinguishCreatedImageName: TStringToDistinguishCreatedImageName
) {
  if (!image) {
    return null;
  }

  let imageUrl =
    await generateImageUrlAfterCreatingImageIfNeeded_Or_PassPathString(
      image,
      typeOfImageToBeGenerated,
      stringToDistinguishCreatedImageName
    );

  createdImagesArray.push(imageUrl);

  return imageUrl;
}

export async function prepareImagesForDB<
  T extends {
    images: TImageCyclicalActivityFormValues[] | TImageEventFormValue[];
  },
  K extends TImageEventForDB | TImageCyclicalActivityForDB
>(
  values: T,
  createdImagesArray: string[],
  typeOfImageToBeGenerated: TTypeOfImageToBeGenerated,
  stringToDistinguishCreatedImageName: TStringToDistinguishCreatedImageName
): Promise<K[]> {
  const originalImagesData = values.images;

  let result: K[] = [];
  if (!originalImagesData) {
    return result;
  }
  for (let i = 0; i < originalImagesData.length; i++) {
    const imageUrl =
      await generateImageUrlAfterCreatingImageIfNeeded_Or_PassPathString(
        originalImagesData[i].file as string,
        typeOfImageToBeGenerated,
        stringToDistinguishCreatedImageName
      );

    //adding created image url to be deleted when some error occur
    if ((originalImagesData[i].file as string) !== imageUrl) {
      createdImagesArray.push(imageUrl);
    }

    result.push({
      id: originalImagesData[i].id,
      url: imageUrl,
      alt: originalImagesData[i].alt,
      index: originalImagesData[i].index,
      additionInfoThatMustBeDisplayed: originalImagesData[i]
        .additionInfoThatMustBeDisplayed
        ? (originalImagesData[i].additionInfoThatMustBeDisplayed as string)
        : null,
    } as K);
  }
  return result;
}

export async function deleteImagesFiles(
  filesArray: string[]
): Promise<boolean> {
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

export async function dealWithImagesDividingThemToProperArrays(
  originalEvent: TEventFormInputs,
  changedEvent: TEventFormInputs,
  imagesToBeUpdated_or_Deleted_or_Created: TImagesToBeUpdatedDeletedCreated
) {
  ////prepare images data
  const imagesPreparedData: TImageEventForDB[] = await prepareImagesForDB<
    TEventFormInputs,
    TImageEventForDB
  >(
    changedEvent,
    imagesToBeUpdated_or_Deleted_or_Created.createdImages,
    'IMAGE_REGULAR',
    'event'
  );

  ////create differences object
  const differencesImages = getDifferencesBetweenTwoObjects(
    originalEvent.images,
    imagesPreparedData
  );

  const isImagesToBeUpdated = getIfImagesShouldBeProcessedFurther(
    originalEvent.images,
    imagesPreparedData,
    differencesImages
  );

  if (!isImagesToBeUpdated) {
    return;
  }

  processImagesToDivideThemInArraysWithDifferentPurposeChanged(
    originalEvent.images,
    imagesPreparedData,
    imagesToBeUpdated_or_Deleted_or_Created
  );
}

export async function updateImageDataAndAddToProperArraysOfImagesToBeProcessed(
  originalImage: string | TFileWithPreview | null,
  changedImage: string | TFileWithPreview | null,
  currentlyCreatedImagesToBeDeletedWhenError: string[],
  imagesURLsToBeDeleted: string[],
  typeOfImageToBeGenerated: TTypeOfImageToBeGenerated,
  stringToDistinguishCreatedImageName: TStringToDistinguishCreatedImageName
) {
  let newlyCreatedImage = '';
  try {
    newlyCreatedImage =
      await createNewImageIfNeededAndAddToProperArraysToBeFurtherProcessed(
        changedImage,
        originalImage,
        currentlyCreatedImagesToBeDeletedWhenError,
        typeOfImageToBeGenerated,
        stringToDistinguishCreatedImageName
      );
  } catch (error) {
    logger.warn((error as Error).stack);
    throw new Error("Image couldn't be created.");
  }

  imagesURLsToBeDeleted.push(originalImage as string);

  return newlyCreatedImage;
}
