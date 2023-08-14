'use client';

import { TNewsletterFormValues } from '@/types';
import { Form, Formik, FormikHelpers } from 'formik';
import { Fragment } from 'react';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import CustomButton from '../CustomButton';
import InputFormik from '../forms/InputFormik';

export default function NewsletterForm() {
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
    values: TNewsletterFormValues,
    formikHelpers: FormikHelpers<TNewsletterFormValues>
  ) {
    console.log('values: ', values);
    formikHelpers.resetForm();
  }

  ////tsx
  return (
    <Fragment>
      <Formik<NewsletterFormInputs>
        initialValues={{ email: '' }}
        onSubmit={submitFormHandler}
        validationSchema={toFormikValidationSchema(newsletterValidationSchema)}
      >
        {(formik) => {
          // console.log({ formik });

          ////tsx
          return (
            <Form>
              <InputFormik
                name="email"
                type="email"
                label="podaj adres e-mail:"
                placeholder="Twój e-mail"
              />
              <CustomButton
                text="subskrybuj"
                descriptionText="Subskrybuj newsletter."
                additionalClasses="mt-[4px]"
                onSubmit={true}
                disabled={!formik.dirty || !formik.isValid}
              />
            </Form>
          );
        }}
      </Formik>
    </Fragment>
  );
}
