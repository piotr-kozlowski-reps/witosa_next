'use client';
import { addCyclicalActivity } from '@/actions/cyclicalActivityActions';
import CustomButton from '@/app/(site)/components/CustomButton';
import CheckboxFormik from '@/app/(site)/components/forms/CheckboxFormik';
import DatePickerFormik from '@/app/(site)/components/forms/DatePickerFormik';
import FormStageLink from '@/app/(site)/components/forms/FormStageLink';
import InputFormik from '@/app/(site)/components/forms/InputFormik';
import MultipleSelectAsSeparateButtonsFormik from '@/app/(site)/components/forms/MultipleSelectAsSeparateButtonsFormik';
import CloseIcon from '@/app/(site)/components/icons/CloseIcon';
import ComponentTransitionFromRightToLeft from '@/app/(site)/components/motionWrappers/ComponentTransitionFromRightToLeft';
import { useNavigationState } from '@/context/navigationState';
import { useNotificationState } from '@/context/notificationState';
import { dbReadingErrorMessage } from '@/lib/api/apiTextResponses';
import {
  TCyclicalActivityFormInputs,
  getCyclicalActivityValidationSchema,
} from '@/lib/forms/cyclical-activities-form';
import {
  TActionResponse,
  TCyclicalActivitiesFormValues,
  TFormStage,
} from '@/types';
import { ActivityType, ForWhom, Place } from '@prisma/client';
import { FormikProps, useFormik } from 'formik';
import { AnimatePresence } from 'framer-motion';
import { Fragment, useEffect, useState } from 'react';
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

  //expiration at logic
  // const [isExpiresAtVisible, setIsExpiresAtVisible] = useState(false);
  // const toggleExpiresAtVisibility = () => {
  //   setIsExpiresAtVisible((preState) => !preState);
  // };

  const formik = useFormik<TCyclicalActivityFormInputs>({
    initialValues: {
      name: '',
      activityTypes: [],
      activitiesForWhom: [],
      places: [],
      isToBePublished: true,
      isExpiresAtRequired: false,
      expiresAt: null,
    },
    onSubmit: () => {},
    validationSchema: toFormikValidationSchema(
      getCyclicalActivityValidationSchema()
    ),
  });

  console.log({ formik });
  // console.log(formik.getFieldProps('isExpiresAtRequired').value);
  const isExpiresAtRequired = formik.getFieldProps('isExpiresAtRequired').value;
  // console.log('valid?: ', checkValidityOfFormFirstStage(formik));

  //form stages logic
  const stagesInitialStage: TFormStage[] = [
    {
      isAccessToStage: true,
      linkName: 'informacje ogólne',
      isActive: true,
    },
    {
      isAccessToStage: false,
      linkName: 'opis zajęć oraz zdjęcia',
      isActive: false,
    },
    {
      isAccessToStage: false,
      linkName: 'godziny zajęć',
      isActive: false,
    },
  ];
  const [stage, setStage] = useState<TFormStage[]>(stagesInitialStage);
  // console.log({ stage });

  function checkValidityOfFormFirstStage(
    formik: FormikProps<TCyclicalActivitiesFormValues>
  ) {
    const fieldNames = ['name', 'activityTypes'];
    let isValid = true;

    fieldNames.forEach((field) => {
      if (formik.getFieldMeta(field).error) {
        isValid = false;
      }
    });

    return isValid;
  }

  function getCurrentStageIndex() {
    return stage.findIndex((stageItem) => stageItem.isActive);
  }

  /** if index argument not provided -> function works as go_to_next_stage | when index argument provided function goes to desired index  */
  function goToNextGivenStageOrJustNextStageOfForm(index?: number) {
    const currentIndex = getCurrentStageIndex();
    setStage((prevStage) => {
      const newState = prevStage.map((item) => ({
        ...item,
        isActive: false,
      }));

      index || index === 0
        ? (newState[index].isActive = true)
        : (newState[currentIndex + 1].isActive = true);

      return newState;
    });
  }

  function goToPrevGivenStageOrJustPrevStageOfForm(index?: number) {
    const currentIndex = getCurrentStageIndex();
    setStage((prevStage) => {
      const newState = prevStage.map((item) => ({ ...item, isActive: false }));

      index || index === 0
        ? (newState[index].isActive = true)
        : (newState[currentIndex - 1].isActive = true);

      newState[currentIndex - 1].isActive = true;
      return newState;
    });
  }
  function checkIfNextIsEnabled() {
    //index number
    const currentIndex = getCurrentStageIndex();
    const isGoingNextStagePossibleWithCurrentIndex =
      currentIndex !== stage.length - 1;

    //TODO: validation of form values that allows going further
    const validation = checkValidityOfFormFirstStage(formik);

    return isGoingNextStagePossibleWithCurrentIndex && validation;
  }
  function checkIfPrevIsEnabled() {
    const currentIndex = getCurrentStageIndex();
    const isGoingPrevStagePossibleWithCurrentIndex = currentIndex !== 0;
    return isGoingPrevStagePossibleWithCurrentIndex;
  }

  useEffect(() => {
    if (checkValidityOfFormFirstStage(formik)) {
      const resultStageState = [...stage];
      if (!resultStageState[1].isAccessToStage) {
        resultStageState[1].isAccessToStage = true;
        setStage(resultStageState);
      }
    }
    if (!checkValidityOfFormFirstStage(formik)) {
      const resultStageState = [...stage];
      if (resultStageState[1].isAccessToStage) {
        resultStageState[1].isAccessToStage = false;
        setStage(resultStageState);
      }
    }
  }, [formik]);

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

  ////tsx
  return (
    <Fragment>
      <div className="flex items-center justify-between mb-[22px] mr-8 -mt-[18px]">
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
      <form
        action={async (formData) => {
          await submitFormHandler(formData, formik);
        }}
      >
        <div className="flex mb-12 font-base-regular">
          {stage.map((stageItem, index) => (
            <FormStageLink
              key={index}
              stage={stageItem}
              index={index}
              actionFn={() => goToNextGivenStageOrJustNextStageOfForm(index)}
            />
          ))}
        </div>

        {stage[0].isActive ? (
          <ComponentTransitionFromRightToLeft>
            <Fragment>
              <div className="form-input-width -mt-[13px]">
                <InputFormik<TCyclicalActivityFormInputs>
                  name="name"
                  type="text"
                  label={isCurrentFormToPUTData ? 'zmień nazwę:' : 'nazwa:'}
                  placeholder="wpisz nazwę"
                  formik={formik}
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

              <div className="mt-[22px]">
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

              <div className="mt-[22px]">
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

              <div className="mt-[2px]">
                <CheckboxFormik<TCyclicalActivityFormInputs>
                  name="isToBePublished"
                  label="Czy zajęcia mają być opublikowane?"
                  isCommentPopupVisible={true}
                  commentContent="Pole to gdy jest zaznaczone, zajęcia będą wyświetlały się na stronie internetowej. Gdy będzie odznaczone, zajęcia będą zapisane w bazie danych, lecz nie będą widoczne dla odbiorców strony."
                  isToBeUsedAsPartFormik={true}
                  formik={formik}
                />
              </div>

              <div className="mt-[-2px]">
                <CheckboxFormik<TCyclicalActivityFormInputs>
                  name="isExpiresAtRequired"
                  label="Czy chcesz dodać datę zakończenia publikacji?"
                  isCommentPopupVisible={true}
                  commentContent="Gdy pole będzie odznaczone (zarazem data nie będzie określona), zajęcia będą widoczne na stronie internetowej bez ograniczeń czasowych. Gdy pole będzie zaznaczone, należy podać datę, po której automatycznie zajęcia przestaną się wyświetlać na stronie."
                  isToBeUsedAsPartFormik={true}
                  formik={formik}
                />
                {/* <CheckboxFormik
                  name="isExpirationDateToBeAdded"
                  label="Czy chcesz dodać datę zakończenia publikacji?"
                  isCommentPopupVisible={true}
                  commentContent="Gdy pole będzie odznaczone i zarazem data nie będzie określona, zajęcia będą widoczne na stronie internetowej bez ograniczeń czasowych. Gdy pole będzie zaznaczone, należy podać datę, po której automatycznie zajęcia przestaną się wyświetlać na stronie."
                  isToBeUsedAsPartFormik={false}
                  actionFn={toggleExpiresAtVisibility}
                  passedValue={isExpiresAtVisible}
                /> */}
              </div>

              <AnimatePresence mode="wait">
                {isExpiresAtRequired ? (
                  <ComponentTransitionFromRightToLeft>
                    <DatePickerFormik<TCyclicalActivityFormInputs>
                      name="expiresAt"
                      label="data zakończenia publikacji:"
                      formik={formik}
                      additionalClasses="mt-[13px]"
                      isErrorValidationTurnedOn={isExpiresAtRequired}
                      errorText="Data musi być określona."
                    />
                  </ComponentTransitionFromRightToLeft>
                ) : null}
              </AnimatePresence>
            </Fragment>
          </ComponentTransitionFromRightToLeft>
        ) : null}

        {stage[1].isActive ? (
          <ComponentTransitionFromRightToLeft>
            <Fragment>
              <div className="form-input-width -mt-[7px]">
                <InputFormik<TCyclicalActivityFormInputs>
                  name="name"
                  type="text"
                  label={isCurrentFormToPUTData ? 'zmień nazwę:' : 'nazwa:'}
                  placeholder="wpisz nazwę"
                  formik={formik}
                />
              </div>
            </Fragment>
          </ComponentTransitionFromRightToLeft>
        ) : null}

        {stage[2].isActive ? (
          <ComponentTransitionFromRightToLeft>
            <Fragment>
              <div className="form-input-width -mt-[7px]">
                <InputFormik<TCyclicalActivityFormInputs>
                  name="name"
                  type="text"
                  label={isCurrentFormToPUTData ? 'zmień nazwę:' : 'nazwa:'}
                  placeholder="wpisz nazwę"
                  formik={formik}
                />
              </div>
            </Fragment>
          </ComponentTransitionFromRightToLeft>
        ) : null}

        <div className="mt-[40px] flex gap-8">
          <CustomButton
            text="poprzedni etap"
            descriptionText="Przejdź dalej."
            additionalClasses="mt-[4px]"
            disabled={!checkIfPrevIsEnabled()}
            actionFn={() => goToPrevGivenStageOrJustPrevStageOfForm()}
            outlined={true}
            currentlyActive={false}
          />
          <CustomButton
            text="następny etap"
            descriptionText="Następny etap."
            additionalClasses="mt-[4px]"
            disabled={!checkIfNextIsEnabled()}
            actionFn={() => goToNextGivenStageOrJustNextStageOfForm()}
            outlined={true}
          />

          <CustomButton
            text={isCurrentFormToPUTData ? 'zmień zajęcia' : 'dodaj zajęcia'}
            descriptionText="Dodaj użytkownika."
            additionalClasses="mt-[4px]"
            onSubmit={true}
            disabled={!formik.dirty || !formik.isValid}
          />
          {/* <CustomButton
            text="wróć do listy"
            descriptionText="Wróć do listy użytkowników."
            additionalClasses="mt-[4px]"
            disabled={false}
            outlined={true}
            actionFn={() => setIsAddCyclicalActivityVisible(false)}
          /> */}
        </div>
      </form>
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
