'use client';

import {
  addNewsletterAddress,
  updateNewsletterAddress,
} from '@/actions/newsletterActions';
import CustomButton from '@/app/(site)/components/CustomButton';
import InputFormik from '@/app/(site)/components/forms/InputFormik';
import CloseIcon from '@/app/(site)/components/icons/CloseIcon';
import { useNavigationState } from '@/context/navigationState';
import { useNotificationState } from '@/context/notificationState';
import { dbReadingErrorMessage } from '@/lib/api/apiTextResponses';
import {
  NewsletterFormInputs,
  newsletterValidationSchema,
} from '@/lib/forms/newsletter-form';
import { TActionResponse, TNewsletterFormValues } from '@/types';
import { Formik, FormikProps } from 'formik';
import { Fragment } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';

export default function NewsletterAddItemForm() {
  ////vars
  const { setIsAddNewsletterVisible, resetNewsletterFormikDataForPUT } =
    useNavigationState();
  const { setShowNotification } = useNotificationState();
  const { getNewsletterFormikDataForPUT } = useNavigationState();

  const isCurrentFormToPOSTData = !getNewsletterFormikDataForPUT();
  const isCurrentFormToPUTData = getNewsletterFormikDataForPUT();

  ////formik
  async function submitFormHandler(
    formData: FormData,
    formik: FormikProps<TNewsletterFormValues>
  ) {
    let response: TActionResponse | null = null;

    if (isCurrentFormToPOSTData) {
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
      resetNewsletterFormikDataForPUT();
      formik.resetForm();
      return;
    }

    if (isCurrentFormToPUTData) {
      // console.log('put');
      //check if address is in DB - if not error
      //update address

      try {
        response = await updateNewsletterAddress(
          getNewsletterFormikDataForPUT(),
          formData
        );
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
      resetNewsletterFormikDataForPUT();
      formik.resetForm();
      setIsAddNewsletterVisible(false);
      return;
    }
  }

  ////tsx
  return (
    <Fragment>
      <div className="flex items-center justify-between mb-4 mr-8 -mt-[18px]">
        <div className="prose">
          <h3>
            {isCurrentFormToPUTData
              ? 'Zmień e-mail w newsletterze'
              : 'Dodaj e-mail do newslettera'}
          </h3>
        </div>
        <div>
          <CloseIcon
            alt="Zamknij formularz."
            actionFn={() => {
              resetNewsletterFormikDataForPUT();
              setIsAddNewsletterVisible(false);
            }}
          />
        </div>
      </div>

      {/* form */}
      <Formik<NewsletterFormInputs>
        initialValues={{ email: getNewsletterFormikDataForPUT() }}
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
            >
              {/* <Form> */}
              <div className="form-input-width">
                <InputFormik<NewsletterFormInputs>
                  name="email"
                  type="email"
                  label={
                    isCurrentFormToPUTData
                      ? 'zmień adres e-mail:'
                      : 'podaj adres e-mail:'
                  }
                  placeholder="adres e-mail"
                  formik={formik}
                />
              </div>
              <div className="mt-[20px] flex gap-8">
                <CustomButton
                  text={isCurrentFormToPUTData ? 'zmień' : 'dodaj'}
                  descriptionText="Dodaj e-mail do newslettera."
                  additionalClasses="mt-[4px]"
                  onSubmit={true}
                  disabled={!formik.dirty || !formik.isValid}
                />
                <CustomButton
                  text="wróć do listy"
                  descriptionText="Wróć do listy newslettera."
                  additionalClasses="mt-[4px]"
                  disabled={false}
                  outlined={true}
                  actionFn={() => setIsAddNewsletterVisible(false)}
                />
              </div>
            </form>
          );
        }}
      </Formik>
    </Fragment>
  );
}
