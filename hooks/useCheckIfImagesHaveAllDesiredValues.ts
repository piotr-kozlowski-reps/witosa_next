import { TImageEventFormValues } from '@/types';
import { FormikProps } from 'formik';

export function useCheckIfImagesHaveAllDesiredValues<T>(
  formik: FormikProps<T>
) {
  let isEnabled = true;

  //
  const isCustomLinkToDetails = formik.getFieldProps('isCustomLinkToDetails')
    .value as boolean;
  if (isCustomLinkToDetails) return false;

  //
  const images = formik.getFieldProps('images')
    .value as TImageEventFormValues[];
  images.forEach((image) => {
    if (!image.alt || !(image.file || image.url)) {
      isEnabled = false;
    }
  });

  return isEnabled;
}
