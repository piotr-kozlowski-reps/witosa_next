import { FormikProps } from 'formik';

export function getErrorForField<T>(formik: FormikProps<T>, fieldName: string) {
  return formik.getFieldMeta(fieldName).error;
}
export function getIsErrorPresentAndFieldWasTouched<T>(
  formik: FormikProps<T>,
  fieldName: string
) {
  const error = getErrorForField<T>(formik, fieldName);

  return error && formik.getFieldMeta(fieldName).touched;
}
export function getIsErrorNOTPresentAndFieldWasTouched<T>(
  formik: FormikProps<T>,
  fieldName: string
) {
  const error = getErrorForField<T>(formik, fieldName);
  return !error && formik.getFieldMeta(fieldName).touched;
}
