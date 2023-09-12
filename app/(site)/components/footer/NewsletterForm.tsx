'use client';

import {
  dbReadingErrorMessage,
  dbWritingErrorMessage,
} from '@/lib/api/apiTextResponses';
import userNotificationHandler from '@/lib/userNotifications/userNotifications';
import { TActionResponse, TNewsletterFormValues } from '@/types';
import { Form, Formik, FormikHelpers, FormikProps, FormikState } from 'formik';
import { FormEventHandler, Fragment, useRef } from 'react';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import CustomButton from '../CustomButton';
import InputFormik from '../forms/InputFormik';
import { revalidatePath } from 'next/cache';
import prisma from '@/prisma/client';
import { addNewsletterAddress } from '@/actions/newsletterActions';
import logger from '@/lib/logger';

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

  async function submitFormHandler(
    formData: FormData,
    formik: FormikProps<TNewsletterFormValues>
  ) {
    let response: TActionResponse | null = null;
    try {
      response = await addNewsletterAddress(formData);
    } catch (error) {
      userNotificationHandler('ERROR', dbReadingErrorMessage);
    }

    if (!response || !response.status || !response.response) {
      userNotificationHandler('ERROR', dbReadingErrorMessage);
      return;
    }

    if (response.status === 'ERROR') {
      userNotificationHandler('ERROR', response.response);
      return;
    }

    userNotificationHandler('SUCCESS', response.response);
    formik.resetForm();
  }

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
            <form
              action={async (formData) => {
                await submitFormHandler(formData, formik);
              }}
              ref={formRef}
            >
              {/* <Form> */}
              <InputFormik
                name="email"
                type="email"
                label="podaj adres e-mail:"
                placeholder="Twój e-mail"
              />
              <div className="mt-[20px]">
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
