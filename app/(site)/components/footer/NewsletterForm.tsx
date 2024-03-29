'use client';

import { addNewsletterAddress } from '@/actions/newsletterActions';
import { useNotificationState } from '@/context/notificationState';
import { dbReadingErrorMessage } from '@/lib/api/apiTextResponses';
import {
  NewsletterFormInputs,
  newsletterValidationSchema,
} from '@/lib/forms/newsletter-form';
import { TActionResponse, TNewsletterFormValues } from '@/types';
import { Formik, FormikProps } from 'formik';
import { Fragment, useRef } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import CustomButton from '../CustomButton';
import InputFormik from '../forms/InputFormik';

export default function NewsletterForm() {
  ////vars
  const { setShowNotification } = useNotificationState();
  const formRef = useRef<HTMLFormElement>(null);

  ////formik
  async function submitFormHandler(
    formData: FormData,
    formik: FormikProps<TNewsletterFormValues>
  ) {
    let response: TActionResponse | null = null;
    try {
      response = await addNewsletterAddress(formData);
    } catch (error) {
      setShowNotification('ERROR', dbReadingErrorMessage);
    }

    if (!response || !response.status || !response.response) {
      setShowNotification('ERROR', dbReadingErrorMessage);
      return;
    }

    if (response.status === 'ERROR') {
      setShowNotification('ERROR', response.response);
      return;
    }

    setShowNotification('SUCCESS', response.response);
    formik.resetForm();
  }

  ////tsx
  return (
    <Fragment>
      <Formik<NewsletterFormInputs>
        initialValues={{ email: '' }}
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
              <InputFormik<NewsletterFormInputs>
                name="email"
                type="email"
                label="podaj adres e-mail:"
                placeholder="Twój e-mail"
                formik={formik}
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
