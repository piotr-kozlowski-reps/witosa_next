'use client';
import { addUser, updateUser } from '@/actions/userActions';
import CustomButton from '@/app/(site)/components/CustomButton';
import InputFormik from '@/app/(site)/components/forms/InputFormik';
import SelectFormik from '@/app/(site)/components/forms/SelectFormik';
import CloseIcon from '@/app/(site)/components/icons/CloseIcon';
import { useNavigationState } from '@/context/navigationState';
import { useNotificationState } from '@/context/notificationState';
import { dbReadingErrorMessage } from '@/lib/api/apiTextResponses';
import {
  TRegisterFormInputs,
  userValidationSchemaIncludingPassword,
} from '@/lib/forms/user-form';
import { getPolishUserRoleName } from '@/lib/textHelpers';
import { TActionResponse } from '@/types';
import { UserRole } from '@prisma/client';
import { Formik, FormikProps } from 'formik';
import { Fragment, useState } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';

export default function UserAddUserForm() {
  ////vars
  const { setIsAddUserVisible, resetUserFormikDataForPUT } =
    useNavigationState();
  const { setShowNotification } = useNotificationState();
  const { getUserFormikDataForPUT } = useNavigationState();

  const isCurrentFormToPOSTData = !getUserFormikDataForPUT().name;
  const isCurrentFormToPUTData = getUserFormikDataForPUT().name;

  const [isToChangePassword, setIsToChangePassword] = useState(false);

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
    if (isCurrentFormToPUTData) {
      try {
        response = await updateUser(
          getUserFormikDataForPUT().id,
          isToChangePassword,
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
      resetUserFormikDataForPUT();
      formik.resetForm();
      setIsAddUserVisible(false);
      return;
    }
  }

  const optionsForUserRoles = (Object.keys(UserRole) as Array<UserRole>).map(
    (role) => ({ value: role, label: getPolishUserRoleName(role) })
  );

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
        validationSchema={toFormikValidationSchema(
          userValidationSchemaIncludingPassword
        )}
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
              <div className="form-input-width -mt-[7px]">
                <InputFormik
                  name="name"
                  type="text"
                  label={isCurrentFormToPUTData ? 'zmień nazwę:' : 'nazwa:'}
                  placeholder="wpisz nazwę"
                />
              </div>

              <div className="mt-[20px] form-input-width">
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

              {isCurrentFormToPOSTData ? (
                <Fragment>
                  <div className="mt-[20px] form-input-width">
                    <InputFormik
                      name="password"
                      type="password"
                      label={isCurrentFormToPUTData ? 'zmień hasło:' : 'hasło:'}
                      placeholder="wpisz hasło"
                    />
                  </div>
                  <div className="mt-[20px] form-input-width">
                    <InputFormik
                      name="confirmPassword"
                      type="password"
                      label="powtórz hasło:"
                      placeholder="powtórz hasło"
                    />
                  </div>
                </Fragment>
              ) : null}

              <div className="mt-[20px] form-input-width">
                <SelectFormik<UserRole, TRegisterFormInputs>
                  name="userRole"
                  label="uprawnienia:"
                  options={optionsForUserRoles}
                  formik={formik}
                />
              </div>
              {isCurrentFormToPUTData ? (
                <Fragment>
                  <div className="mt-[23px] form-input-width font-base-regular hover:font-base-bold">
                    <div className="checkbox-rect">
                      <input
                        type="checkbox"
                        id="checkbox-rect1"
                        checked={isToChangePassword}
                        onChange={() =>
                          setIsToChangePassword((prevState) => !prevState)
                        }
                      />
                      <label htmlFor="checkbox-rect1" className="pl-8 ">
                        czy chcesz zmienić hasło?
                      </label>
                    </div>
                  </div>
                  {isToChangePassword ? (
                    <Fragment>
                      <div className="mt-[20px] form-input-width">
                        <InputFormik
                          name="password"
                          type="password"
                          label={
                            isCurrentFormToPUTData ? 'zmień hasło:' : 'hasło:'
                          }
                          placeholder="wpisz hasło"
                        />
                      </div>
                      <div className="mt-[20px] form-input-width">
                        <InputFormik
                          name="confirmPassword"
                          type="password"
                          label="powtórz hasło:"
                          placeholder="powtórz hasło"
                        />
                      </div>
                    </Fragment>
                  ) : null}
                </Fragment>
              ) : null}

              <div className="mt-[28px] flex gap-8">
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
