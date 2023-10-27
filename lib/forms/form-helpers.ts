import { TFileWithPreview, TImageEventFormValue } from '@/types';

export const remapImagesIntoBackendPreparedData = (
  images: TImageEventFormValue[]
): TImageEventFormValue[] => {
  return images.map((image) => ({
    alt: image.alt,
    url: image.url,
    index: image.index,
    additionInfoThatMustBeDisplayed: image.additionInfoThatMustBeDisplayed,
    file: prepareImageForBackend(image.file),
    id: image.id as string,
  }));
};

export const prepareImageForBackend = (
  image: string | TFileWithPreview | null
): string => {
  if (!image) {
    throw new Error('No image provided');
  }

  return typeof image === 'string' ? image : image.preview;
};
