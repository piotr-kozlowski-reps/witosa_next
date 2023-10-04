'use client';
import { addCyclicalActivity } from '@/actions/cyclicalActivityActions';
import CustomButton from '@/app/(site)/components/CustomButton';
import FormStageLink from '@/app/(site)/components/forms/FormStageLink';
import CloseIcon from '@/app/(site)/components/icons/CloseIcon';
import ComponentTransitionFromRightToLeft from '@/app/(site)/components/motionWrappers/ComponentTransitionFromRightToLeft';
import { useNavigationState } from '@/context/navigationState';
import { useNotificationState } from '@/context/notificationState';
import { dbReadingErrorMessage } from '@/lib/api/apiTextResponses';
import {
  TCyclicalActivityFormInputs,
  getCyclicalActivityValidationSchema,
  getCyclicalActivityValidationSchemaForStageOne,
  getCyclicalActivityValidationSchemaForStageTwo,
} from '@/lib/forms/cyclical-activities-form';
import {
  TActionResponse,
  TCyclicalActivitiesFormValues,
  TFormStage,
} from '@/types';
import { FormikProps, useFormik } from 'formik';
import { Fragment, useEffect, useState } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import CyclicalActivityAddFormStageOne from './CyclicalActivityAddFormStageOne';
import CyclicalActivityAddFormStageTwo from './CyclicalActivityAddFormStageTwo';

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

  const formik = useFormik<TCyclicalActivityFormInputs>({
    initialValues: {
      //stage1
      name: '',
      activityTypes: [],
      activitiesForWhom: [],
      places: [],
      isToBePublished: true,
      isExpiresAtRequired: false,
      expiresAt: null,

      //stage2
      shortDescription: '',
      isCustomLinkToDetails: false,
      customLinkToDetails: '',
      longDescription: '',
    },
    onSubmit: () => {},
    validationSchema: toFormikValidationSchema(
      getCyclicalActivityValidationSchema()
    ),
  });

  console.log({ formik });

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

  function checkValidityOfFormStageOne(
    formik: FormikProps<TCyclicalActivitiesFormValues>
  ) {
    return getCyclicalActivityValidationSchemaForStageOne().safeParse(
      formik.values
    ).success;
  }
  function checkValidityOfFormStageTwo(
    formik: FormikProps<TCyclicalActivitiesFormValues>
  ) {
    return getCyclicalActivityValidationSchemaForStageTwo().safeParse(
      formik.values
    ).success;
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

    //checking if we're on the end of array
    const isGoingNextStagePossibleWithCurrentIndex =
      currentIndex === stage.length - 1;
    if (isGoingNextStagePossibleWithCurrentIndex) {
      return false;
    }

    //checking if validation allows going further
    const isNextStageEnabedThrougValidation =
      stage[currentIndex + 1].isAccessToStage;

    return isNextStageEnabedThrougValidation ? true : false;
  }
  function checkIfPrevIsEnabled() {
    const currentIndex = getCurrentStageIndex();
    const isGoingPrevStagePossibleWithCurrentIndex = currentIndex !== 0;
    return isGoingPrevStagePossibleWithCurrentIndex;
  }

  useEffect(() => {
    //stageOne validation -> access to stageTwo
    // console.log(
    //   'checkValidityOfFormStageOne(formik): ',
    //   checkValidityOfFormStageOne(formik)
    // );

    if (checkValidityOfFormStageOne(formik)) {
      const resultStageState = [...stage];
      if (!resultStageState[1].isAccessToStage) {
        resultStageState[1].isAccessToStage = true;
        setStage(resultStageState);
      }
    }
    if (!checkValidityOfFormStageOne(formik)) {
      const resultStageState = [...stage];
      if (resultStageState[1].isAccessToStage) {
        resultStageState[1].isAccessToStage = false;
        setStage(resultStageState);
      }
    }
    //stageTwo validation -> access to stageThree
    // console.log(
    //   'checkValidityOfFormStageTwo(formik): ',
    //   checkValidityOfFormStageTwo(formik)
    // );

    if (checkValidityOfFormStageTwo(formik)) {
      const resultStageState = [...stage];
      if (!resultStageState[2].isAccessToStage) {
        resultStageState[2].isAccessToStage = true;
        setStage(resultStageState);
      }
    }
    if (!checkValidityOfFormStageTwo(formik)) {
      const resultStageState = [...stage];
      if (resultStageState[2].isAccessToStage) {
        resultStageState[2].isAccessToStage = false;
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
          <CyclicalActivityAddFormStageOne<TCyclicalActivityFormInputs>
            isCurrentFormToPUTData={isCurrentFormToPUTData}
            formik={formik}
          />
        ) : null}

        {stage[1].isActive ? (
          <CyclicalActivityAddFormStageTwo<TCyclicalActivityFormInputs>
            isCurrentFormToPUTData={isCurrentFormToPUTData}
            formik={formik}
          />
        ) : null}

        {stage[2].isActive ? (
          <ComponentTransitionFromRightToLeft>
            <Fragment>
              <div className="form-input-width -mt-[7px]">trzeci stage</div>
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
