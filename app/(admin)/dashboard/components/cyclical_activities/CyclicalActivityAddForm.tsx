'use client';
import { addCyclicalActivity } from '@/actions/cyclicalActivityActions';
import CustomButton from '@/app/(site)/components/CustomButton';
import CheckboxFormik from '@/app/(site)/components/forms/CheckboxFormik';
import InputFormik from '@/app/(site)/components/forms/InputFormik';
import MultipleSelectAsSeparateButtonsFormik from '@/app/(site)/components/forms/MultipleSelectAsSeparateButtonsFormik';
import CloseIcon from '@/app/(site)/components/icons/CloseIcon';
import { useNavigationState } from '@/context/navigationState';
import { useNotificationState } from '@/context/notificationState';
import { dbReadingErrorMessage } from '@/lib/api/apiTextResponses';
import {
  TCyclicalActivityFormInputs,
  cyclicalActivityValidationSchema,
} from '@/lib/forms/cyclical-activities-form';
import { TActionResponse } from '@/types';
import { ActivityType, ForWhom, Place } from '@prisma/client';
import { Formik, FormikProps } from 'formik';
import { Fragment } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';

export default function CyclicalActivityAddForm() {
  ////vars
  const { setIsAddCyclicalActivityVisible, resetUserFormikDataForPUT } =
    useNavigationState();
  const { setShowNotification } = useNotificationState();
  const {
    getCyclicalActivityFormikDataForPUT,
    resetCyclicalActivityFormikDataForPUT,
  } = useNavigationState();

  const isCurrentFormToPOSTData = !getCyclicalActivityFormikDataForPUT().name;
  const isCurrentFormToPUTData = getCyclicalActivityFormikDataForPUT().name;

  ////formik
  async function submitFormHandler(
    formData: FormData,
    formik: FormikProps<TCyclicalActivityFormInputs>
  ) {
    let response: TActionResponse | null = null;

    //append all arrays into formData
    appendEnumTypes(formik, formData, 'activityTypes');
    appendEnumTypes(formik, formData, 'activitiesForWhom');
    appendEnumTypes(formik, formData, 'places');

    ////post cyclical activity
    if (isCurrentFormToPOSTData) {
      try {
        response = await addCyclicalActivity(formData);
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
      resetCyclicalActivityFormikDataForPUT();
      formik.resetForm();
      return;
    }
    // if (isCurrentFormToPUTData) {
    //   try {
    //     response = await updateUser(
    //       getUserFormikDataForPUT().id,
    //       isToChangePassword,
    //       formData
    //     );
    //   } catch (error) {
    //     setShowNotification('ERROR', dbReadingErrorMessage);
    //   }
    //   if (!response || !response.status || !response.response) {
    //     setShowNotification('ERROR', dbReadingErrorMessage);
    //     return;
    //   }
    //   if (response.status === 'ERROR') {
    //     setShowNotification('ERROR', response.response);
    //     return;
    //   }
    //   setShowNotification('SUCCESS', response.response);
    //   resetUserFormikDataForPUT();
    //   formik.resetForm();
    //   setIsAddUserVisible(false);
    //   return;
    // }
  }

  // const optionsForUserRoles = (Object.keys(UserRole) as Array<UserRole>).map(
  //   (role) => ({ value: role, label: getPolishUserRoleName(role) })
  // );

  ////tsx
  return (
    <Fragment>
      <div className="flex items-center justify-between mb-4 mr-8 -mt-[18px]">
        <div className="prose">
          <h3>
            {isCurrentFormToPUTData ? 'Zmień szczegóły zajęć' : 'Dodaj zajęcia'}
          </h3>
        </div>
        <div>
          <CloseIcon
            alt="Zamknij formularz."
            actionFn={() => {
              resetCyclicalActivityFormikDataForPUT();
              setIsAddCyclicalActivityVisible(false);
            }}
          />
        </div>
      </div>

      {/* form */}
      <Formik<TCyclicalActivityFormInputs>
        // initialValues={getUserFormikDataForPUT()} //TODO: potem popraw
        initialValues={{
          name: '',
          activityTypes: [],
          activitiesForWhom: [],
          places: [],
          isToBePublished: true,
        }}
        onSubmit={() => {}}
        validationSchema={toFormikValidationSchema(
          cyclicalActivityValidationSchema
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
              <div className="flex gap-8 mb-12 font-base-regular">
                <div>etap1 - informacje ogólne</div>
                <div>etap2 - opis zajęć</div>
                <div>etap3 - godziny zajęć</div>
                <div>etap4 - zdjęcia</div>
              </div>

              <div className="form-input-width -mt-[7px]">
                <InputFormik
                  name="name"
                  type="text"
                  label={isCurrentFormToPUTData ? 'zmień nazwę:' : 'nazwa:'}
                  placeholder="wpisz nazwę"
                />
              </div>

              <div className=" mt-[20px]">
                <MultipleSelectAsSeparateButtonsFormik<
                  ActivityType,
                  TCyclicalActivityFormInputs
                >
                  name="activityTypes"
                  label={
                    isCurrentFormToPUTData
                      ? 'zmień rodzaj zajęć:'
                      : 'rodzaj zajęć:'
                  }
                  enumToIterateThrough={
                    Object.keys(ActivityType) as Array<ActivityType>
                  }
                  // enumToIterateThrough={ActivityType}
                  formik={formik}
                />
              </div>

              <div className="mt-[20px]">
                <MultipleSelectAsSeparateButtonsFormik<
                  ForWhom,
                  TCyclicalActivityFormInputs
                >
                  name="activitiesForWhom"
                  label={
                    isCurrentFormToPUTData ? 'zmień dla kogo:' : 'dla kogo:'
                  }
                  enumToIterateThrough={Object.keys(ForWhom) as Array<ForWhom>}
                  formik={formik}
                />
              </div>

              <div className="mt-[20px]">
                <MultipleSelectAsSeparateButtonsFormik<
                  Place,
                  TCyclicalActivityFormInputs
                >
                  name="places"
                  label={
                    isCurrentFormToPUTData
                      ? 'zmień miejsce zajęć:'
                      : 'miejsce zajęć:'
                  }
                  enumToIterateThrough={Object.keys(Place) as Array<Place>}
                  formik={formik}
                />
              </div>

              <div className="mt-[20px]">
                <CheckboxFormik
                  name="isToBePublished"
                  label="Czy zajęcia mają być opublikowane?"

                  // label={
                  //   isCurrentFormToPUTData
                  //     ? 'zmień miejsce zajęć:'
                  //     : 'miejsce zajęć:'
                  // }
                  // enumToIterateThrough={Object.keys(Place) as Array<Place>}
                  // formik={formik}
                />
              </div>

              {/* <div className="mt-[20px] form-input-width">
                <SelectFormik<UserRole, TRegisterFormInputs>
                  name="userRole"
                  label="uprawnienia:"
                  options={optionsForUserRoles}
                  formik={formik}
                />
              </div> */}
              {/* {isCurrentFormToPUTData ? (
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
              ) : null} */}

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
                  actionFn={() => setIsAddCyclicalActivityVisible(false)}
                />
              </div>
            </form>
          );
        }}
      </Formik>
    </Fragment>
  );
}

//utils
function appendEnumTypes(
  formik: FormikProps<TCyclicalActivityFormInputs>,
  formData: FormData,
  valueName: string
) {
  (formik.getFieldProps(valueName).value as Array<string>).forEach(
    (activity) => {
      formData.append(valueName, activity);
    }
  );
}
