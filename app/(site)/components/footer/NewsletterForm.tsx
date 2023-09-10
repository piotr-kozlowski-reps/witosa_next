'use client';

import { dbWritingErrorMessage } from '@/lib/api/apiTextResponses';
import userNotificationHandler from '@/lib/userNotifications/userNotifications';
import { TNewsletterFormValues } from '@/types';
import { Form, Formik, FormikHelpers } from 'formik';
import { Fragment, useRef } from 'react';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import CustomButton from '../CustomButton';
import InputFormik from '../forms/InputFormik';
import { revalidatePath } from 'next/cache';
import prisma from '@/prisma/client';
import { addNewsletterAddress } from '@/actions/newsletterActions';

export default function NewsletterForm() {
  const formRef = useRef<HTMLFormElement>(null);
  ////formik
  type NewsletterFormInputs = z.TypeOf<typeof newsletterValidationSchema>;

  const newsletterValidationSchema: z.ZodType<TNewsletterFormValues> = z.object(
    {
      email: z
        .string({
          required_error: 'Wprowadź e-mail w poprawnej formie.',
        })
        .email('Wprowadź e-mail w poprawnej formie.'),
    }
  );

  function submitFormHandler() {
    console.log('submit handler');

    formRef!.current!.submit();
  }

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

  ////tsx
  return (
    <Fragment>
      <Formik<NewsletterFormInputs>
        initialValues={{ email: '' }}
        // onSubmit={submitFormHandler}
        onSubmit={() => {}}
        validationSchema={toFormikValidationSchema(newsletterValidationSchema)}
      >
        {(formik) => {
          ////tsx
          return (
            <form action={addNewsletterAddress} ref={formRef}>
              {/* <Form> */}
              <InputFormik
                name="email"
                type="email"
                label="podaj adres e-mail:"
                placeholder="Twój e-mail"
              />
              <div className="mt-[20px]">
                {/* <div> */}
                <CustomButton
                  text="subskrybuj"
                  descriptionText="Subskrybuj newsletter."
                  additionalClasses="mt-[4px]"
                  onSubmit={true}
                  disabled={!formik.dirty || !formik.isValid}
                />
              </div>
            </form>
          );
        }}
      </Formik>
    </Fragment>
  );
}
