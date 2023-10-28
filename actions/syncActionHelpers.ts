import {
  TCyclicalActivityWithImageAndOccurrence,
  TEventWithImages,
} from '@/types';
import { ImageCyclicalActivity, ImageEvent } from '@prisma/client';

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
