'use server';

import { TNewsletterFormValues } from '@/types';
import { FormikHelpers } from 'formik';

export async function submitNewsletterFormHandler(
  values: TNewsletterFormValues,
  formikHelpers: FormikHelpers<TNewsletterFormValues>
) {
  'use server';
  console.log('values: ', values);
  formikHelpers.resetForm();
}
