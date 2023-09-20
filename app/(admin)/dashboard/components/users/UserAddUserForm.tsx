'use client';

import { addUser } from '@/actions/userActions';
import CustomButton from '@/app/(site)/components/CustomButton';
import InputFormik from '@/app/(site)/components/forms/InputFormik';
import SelectFormik from '@/app/(site)/components/forms/SelectFormik';
import CloseIcon from '@/app/(site)/components/icons/CloseIcon';
import { useNavigationState } from '@/context/navigationState';
import { useNotificationState } from '@/context/notificationState';
import { dbReadingErrorMessage } from '@/lib/api/apiTextResponses';
import {
  TRegisterFormInputs,
  userValidationSchema,
} from '@/lib/forms/user-form';
import { getPolishUserRoleName } from '@/lib/textHelpers';
import { TActionResponse } from '@/types';
import { UserRole } from '@prisma/client';
import { Formik, FormikProps } from 'formik';
import { Fragment } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';

export default function UserAddUserForm() {
  ////vars
  const { setIsAddUserVisible, resetUserFormikDataForPUT } =
    useNavigationState();
  const { setShowNotification } = useNotificationState();
  const { getUserFormikDataForPUT } = useNavigationState();

  const isCurrentFormToPOSTData = !getUserFormikDataForPUT().name;
  const isCurrentFormToPUTData = getUserFormikDataForPUT().name;

  ////formik
  async function submitFormHandler(
    formData: FormData,
    formik: FormikProps<TRegisterFormInputs>
  ) {
    let response: TActionResponse | null = null;
    if (isCurrentFormToPOSTData) {
      // console.log([...formData]);

      try {
        response = await addUser(formData);
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
      resetUserFormikDataForPUT();
      formik.resetForm();
      return;
    }
    //   if (isCurrentFormToPUTData) {
    //     // console.log('put');
    //     //check if address is in DB - if not error
    //     //update address
    //     try {
    //       response = await updateNewsletterAddress(
    //         getNewsletterFormikDataForPUT(),
    //         formData
    //       );
    //     } catch (error) {
    //       setShowNotification('ERROR', dbReadingErrorMessage);
    //     }
    //     if (!response || !response.status || !response.response) {
    //       setShowNotification('ERROR', dbReadingErrorMessage);
    //       return;
    //     }
    //     if (response.status === 'ERROR') {
    //       setShowNotification('ERROR', response.response);
    //       return;
    //     }
    //     setShowNotification('SUCCESS', response.response);
    //     resetNewsletterFormikDataForPUT();
    //     formik.resetForm();
    //     setIsAddNewsletterVisible(false);
    //     return;
    //   }
  }

  const optionsForUserRoles = (Object.keys(UserRole) as Array<UserRole>).map(
    (role) => ({ value: role, label: getPolishUserRoleName(role) })
  );
  // const optionsCustomNamesForUserRoles = (
  //   Object.keys(UserRole) as Array<UserRole>
  // ).map((role) => getPolishUserRoleName(role));

  // console.log({ optionsCustomNamesForUserRoles });

  ////tsx
  return (
    <Fragment>
      <div className="flex items-center justify-between mb-4 mr-8 -mt-[18px]">
        <div className="prose">
          <h3>
            {isCurrentFormToPUTData ? 'Zmień użytkownika' : 'Dodaj użytkownika'}
          </h3>
        </div>
        <div>
          <CloseIcon
            alt="Zamknij formularz."
            actionFn={() => {
              resetUserFormikDataForPUT();
              setIsAddUserVisible(false);
            }}
          />
        </div>
      </div>

      {/* form */}
      <Formik<TRegisterFormInputs>
        initialValues={getUserFormikDataForPUT()}
        onSubmit={() => {}}
        validationSchema={toFormikValidationSchema(userValidationSchema)}
      >
        {(formik) => {
          console.log({ formik });

          ////tsx
          return (
            <form
              action={async (formData) => {
                await submitFormHandler(formData, formik);
              }}
            >
              <div className="form-input-width">
                <InputFormik
                  name="name"
                  type="text"
                  label={isCurrentFormToPUTData ? 'zmień nazwę:' : 'nazwa:'}
                  placeholder="wpisz nazwę"
                />
              </div>

              <div className="mt-4 form-input-width">
                <InputFormik
                  name="email"
                  type="email"
                  label={
                    isCurrentFormToPUTData
                      ? 'zmień adres e-mail:'
                      : 'adres e-mail:'
                  }
                  placeholder="wpisz adres e-mail"
                />
              </div>

              <div className="mt-4 form-input-width">
                <InputFormik
                  name="password"
                  type="password"
                  label={isCurrentFormToPUTData ? 'zmień hasło:' : 'hasło:'}
                  placeholder="wpisz hasło"
                />
              </div>

              <div className="mt-4 form-input-width">
                <InputFormik
                  name="confirmPassword"
                  type="password"
                  label="powtórz hasło:"
                  placeholder="powtórz hasło"
                />
              </div>

              <div className="mt-4 form-input-width">
                <SelectFormik<UserRole, TRegisterFormInputs>
                  name="userRole"
                  label="uprawnienia:"
                  options={optionsForUserRoles}
                  formik={formik}
                />
                {/* <label htmlFor="userRole">Uprawienia:</label>
                <select name="userRole" id="userRole">
                  {(Object.keys(UserRole) as Array<UserRole>).map((role) => (
                    <option value={role} key={role}>
                      {getPolishUserRoleName(role)}
                    </option>
                  ))}
                </select> */}
              </div>

              {/* buttons */}
              <div className="mt-[20px] flex gap-8">
                <CustomButton
                  text={isCurrentFormToPUTData ? 'zmień' : 'dodaj'}
                  descriptionText="Dodaj użytkownika."
                  additionalClasses="mt-[4px]"
                  onSubmit={true}
                  disabled={!formik.dirty || !formik.isValid}
                />
                <CustomButton
                  text="wróć do listy"
                  descriptionText="Wróć do listy użytkowników."
                  additionalClasses="mt-[4px]"
                  disabled={false}
                  outlined={true}
                  actionFn={() => setIsAddUserVisible(false)}
                />
              </div>
            </form>
          );
        }}
      </Formik>
    </Fragment>
  );
}
