import {
  TCyclicalActivityFormInputs,
  TCyclicalActivityWithImageAndOccurrence,
  TEventFormInputs,
  TEventWithImages,
  TFileWithPreview,
  TImageCyclicalActivityForDB,
  TImageCyclicalActivityFormValues,
  TImageEventForDB,
  TImagesToBeUpdatedDeletedCreated,
  TStringToDistinguishCreatedImageName,
  TTypeOfImageToBeGenerated,
} from '@/types';
import { ImageCyclicalActivity, ImageEvent, Prisma } from '@prisma/client';
import { generateImageUrlAfterCreatingImageIfNeeded_Or_PassPathString } from './actionHelpers';

export function sortImagesObjectsByIndexInCyclicalActivity(
  cyclicalActivity: TCyclicalActivityWithImageAndOccurrence
): TCyclicalActivityWithImageAndOccurrence {
  const imageObjects = [...cyclicalActivity.images];
  imageObjects.sort((imageObject1, imageObject2) => {
    return imageObject1.index < imageObject2.index ? -1 : 1;
  });

  const resultCyclicalImagesObject = { ...cyclicalActivity };
  resultCyclicalImagesObject.images = imageObjects;

  return resultCyclicalImagesObject;
}

export function sortImagesObjectsByIndexInEvent(
  event: TEventWithImages
): TEventWithImages {
  const imageObjects = [...event.images];
  imageObjects.sort((imageObject1, imageObject2) => {
    return imageObject1.index < imageObject2.index ? -1 : 1;
  });

  const resultEventObject = { ...event };
  resultEventObject.images = imageObjects;

  return resultEventObject;
}

export function rewriteUrlsIntoFileAsStringObjectToBeProperlyValidated<
  T extends TCyclicalActivityWithImageAndOccurrence | TEventWithImages,
  K extends ImageCyclicalActivity | ImageEvent
>(objectToBeCorrected: T) {
  const images = objectToBeCorrected.images as K[];

  let imagesRemapped: K[];
  if (images && images.length > 0) {
    imagesRemapped = images.map((image) => ({
      ...image,
      file: image.url,
    }));
    return { ...objectToBeCorrected, images: imagesRemapped };
  }

  return objectToBeCorrected;
}

export function getProperDataForCyclicalActivityUpdate(
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

export function getProperDataForEventUpdate(
  changedEvent: TEventFormInputs,
  differencesInEvent: Partial<TEventFormInputs>
): Prisma.EventUncheckedUpdateInput {
  const resultObject: Partial<TEventFormInputs> = {};
  // const resultObject: Prisma.CyclicalActivityUncheckedUpdateInput = {};

  for (let [key, value] of Object.entries(differencesInEvent)) {
    (resultObject as any)[key] = (changedEvent as any)[key];
  }

  return resultObject as Prisma.EventUncheckedUpdateInput;
}

export async function createNewImageIfNeededAndAddToProperArraysToBeFurtherProcessed(
  changedImage: string | TFileWithPreview | null,
  originalImage: string | TFileWithPreview | null,
  createdImagesToBeDeleted: string[],
  typeOfImageToBeGenerated: TTypeOfImageToBeGenerated,
  stringToDistinguishCreatedImageName: TStringToDistinguishCreatedImageName
) {
  const imageUrl =
    await generateImageUrlAfterCreatingImageIfNeeded_Or_PassPathString(
      changedImage as string,
      typeOfImageToBeGenerated,
      stringToDistinguishCreatedImageName
    );

  // console.log({ changedImage });
  // console.log({ originalImage });
  // console.log({ imageUrl });

  createdImagesToBeDeleted.push(imageUrl);

  return imageUrl;
}

export function processImagesToDivideThemInArraysWithDifferentPurpose(
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

export function processImagesToDivideThemInArraysWithDifferentPurposeChanged<
  T extends TImageCyclicalActivityForDB | TImageEventForDB
>(
  originalImages: T[],
  changedImages: T[],
  imagesToBeUpdated_or_Deleted_or_Created: TImagesToBeUpdatedDeletedCreated
) {
  // let imagesToBeUpdated: TImageCyclicalActivityForDB[] = [];
  // let imagesToBeCreated: TImageCyclicalActivityForDB[] = [];
  // let imagesToBeDeleted: TImageCyclicalActivityForDB[] = [];
  const originalImagesToBeProcessed = [...originalImages];
  const changedImagesToBeProcessed = [...changedImages];

  //initial selection to deleted array / updated array
  for (let i = 0; i < originalImagesToBeProcessed.length; i++) {
    const existingItemId = originalImagesToBeProcessed[i].id;
    const changedImageIndex = changedImagesToBeProcessed.findIndex(
      (element) => element.id === existingItemId
    );

    // console.log({ existingItemId });
    // console.log({ changedImages });
    // console.log({ changedImageIndex });

    //changed image with existingItemId not found ? delete original image with this ID
    if (changedImageIndex === -1) {
      imagesToBeUpdated_or_Deleted_or_Created.imagesObjectsIDisToBeDeletedPreparedForDB.push(
        originalImagesToBeProcessed[i].id!
      );
      continue;
    }
    imagesToBeUpdated_or_Deleted_or_Created.imagesToBeUpdatedPreparedForDB.push(
      changedImagesToBeProcessed[changedImageIndex]
    );
    changedImagesToBeProcessed.splice(changedImageIndex, 1);
  }
  // imagesToBeUpdated_or_Deleted_or_Created.imagesToBeCreatedPreparedForDB = [...changedImagesToBeProcessed];
  // console.log([...changedImagesToBeProcessed]);
}

export function getRidOfFileDataAndPrepareObjectToComparisonToChangedData(
  originalImages: TImageCyclicalActivityFormValues[]
): TImageCyclicalActivityForDB[] {
  return originalImages.map((imageProps) => ({
    id: imageProps.id,
    additionInfoThatMustBeDisplayed: imageProps.additionInfoThatMustBeDisplayed,
    alt: imageProps.alt,
    url: imageProps.url,
    index: imageProps.index,
  }));
}
