'use server';

import prisma from '@/prisma/client';
import { TNewsletterFormValues } from '@/types';
import { FormikHelpers } from 'formik';

export const addNewsletterAddress = async (formData: FormData) => {
  console.log('addNewsletterAddress server action');
  console.log({ ...formData });

  const email = formData.get('email');
  console.log({ email });
  // await prisma.newsletter.create({ data: { email: email as string } });
};

// async function submitFormHandler(
//   values: TNewsletterFormValues,
//   formikHelpers: FormikHelpers<TNewsletterFormValues>
// ) {
//   await addNewsletterAddress(values, formikHelpers);
// let response: any;
// try {
//   response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_AND_IMAGES_URL}api/newsletter`,
//     {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email: values.email }),
//     }
//   );
// } catch (error) {
//   userNotificationHandler('ERROR', dbWritingErrorMessage);
// }

// const data: { message: string } = await response.json();

// if (!response.ok) {
//   userNotificationHandler('ERROR', data.message);
//   formikHelpers.resetForm();
//   return;
// }

// userNotificationHandler('SUCCESS', data.message);
// formikHelpers.resetForm();
// }
