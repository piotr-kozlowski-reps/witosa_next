'use client';
import {
  addCyclicalActivity,
  updateCyclicalActivity,
} from '@/actions/cyclicalActivityActions';
import CustomButton from '@/app/(site)/components/CustomButton';
import FormStageLink from '@/app/(site)/components/forms/FormStageLink';
import CloseIcon from '@/app/(site)/components/icons/CloseIcon';
import ComponentTransitionFromRightToLeft from '@/app/(site)/components/motionWrappers/ComponentTransitionFromRightToLeft';
import { useCyclicalActivitiesState } from '@/context/cyclicalActivityState';
import { useNotificationState } from '@/context/notificationState';
import { dbReadingErrorMessage } from '@/lib/api/apiTextResponses';
import {
  generateValidationForCyclicalActivities,
  validateValuesForCyclicalActivitiesStageOne,
  validateValuesForCyclicalActivitiesStageTwo,
} from '@/lib/forms/cyclical-activities-form';
import {
  TActionResponse,
  TCyclicalActivityFormInputs,
  TFormStage,
  TImageCyclicalActivityFormValues,
} from '@/types';
import {
  FormikProps,
  useFormik,
  validateYupSchema,
  yupToFormErrors,
} from 'formik';
import { Fragment, useEffect, useState } from 'react';
import CyclicalActivityAddFormStageOne from './CyclicalActivityAddFormStageOne';
import CyclicalActivityAddFormStageThree from './CyclicalActivityAddFormStageThree';
import CyclicalActivityAddFormStageTwo from './CyclicalActivityAddFormStageTwo';

export default function CyclicalActivityAddForm() {
  ////vars
  const validationSchema = generateValidationForCyclicalActivities();
  const { setShowNotification } = useNotificationState();
  const {
    setIsAddCyclicalActivityVisible,
    resetCyclicalActivityFormikDataForPUT,
    getCyclicalActivityFormikDataForPUT,
  } = useCyclicalActivitiesState();

  const isCurrentFormToPOSTData = !getCyclicalActivityFormikDataForPUT().name;
  const isCurrentFormToPUTData = getCyclicalActivityFormikDataForPUT().name;

  const formik = useFormik<TCyclicalActivityFormInputs>({
    initialValues:
      getCyclicalActivityFormikDataForPUT() as TCyclicalActivityFormInputs,
    onSubmit: () => {},
    validate: (value) => {
      try {
        validateYupSchema(value, validationSchema, true, value);
      } catch (error) {
        return yupToFormErrors(error);
      }
    },
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

  function getCurrentStageIndex() {
    return stage.findIndex((stageItem) => stageItem.isActive);
  }

  /**
   * if index argument not provided -> function works as go_to_next_stage
   * when index argument provided function goes to desired index
   * */
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
  function goToFirstStage() {
    setStage(stagesInitialStage);
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
  function resetFormToInitialState() {
    resetCyclicalActivityFormikDataForPUT();
    formik.resetForm();
  }

  useEffect(() => {
    //stageOne validation -> access to stageTwo
    if (validateValuesForCyclicalActivitiesStageOne(formik.values)) {
      const resultStageState = [...stage];
      if (!resultStageState[1].isAccessToStage) {
        resultStageState[1].isAccessToStage = true;
        setStage(resultStageState);
      }
    }
    if (!validateValuesForCyclicalActivitiesStageOne(formik.values)) {
      const resultStageState = [...stage];
      if (resultStageState[1].isAccessToStage) {
        resultStageState[1].isAccessToStage = false;
        setStage(resultStageState);
      }
    }

    //stageTwo validation -> access to stageThree
    if (validateValuesForCyclicalActivitiesStageTwo(formik.values)) {
      const resultStageState = [...stage];
      if (!resultStageState[2].isAccessToStage) {
        resultStageState[2].isAccessToStage = true;
        setStage(resultStageState);
      }
    }
    if (!validateValuesForCyclicalActivitiesStageTwo(formik.values)) {
      const resultStageState = [...stage];
      if (resultStageState[2].isAccessToStage) {
        resultStageState[2].isAccessToStage = false;
        setStage(resultStageState);
      }
    }
  }, [formik]);

  ////formik
  async function submitFormHandler(
    formik: FormikProps<TCyclicalActivityFormInputs>
  ) {
    let response: TActionResponse | null = null;

    const formikValues: TCyclicalActivityFormInputs = { ...formik.values };
    const isIncludeImages = formikValues.isCustomLinkToDetails;
    const originalImages =
      formikValues.images as TImageCyclicalActivityFormValues[];

    let imagesRemapped: TImageCyclicalActivityFormValues[] = [];
    if (!isIncludeImages) {
      imagesRemapped = originalImages.map((image) => ({
        alt: image.alt,
        url: image.url,
        additionInfoThatMustBeDisplayed: image.additionInfoThatMustBeDisplayed,
        file:
          typeof image.file! === 'string' ? image.file! : image.file!.preview,
        id: image.id as string,
      }));
    }
    formikValues.images = imagesRemapped;

    /**
     * post
     * */
    if (isCurrentFormToPOSTData) {
      try {
        response = await addCyclicalActivity(formikValues);
      } catch (error) {
        setShowNotification('ERROR', dbReadingErrorMessage);
      }
    }

    /**
     * put
     * */
    if (isCurrentFormToPUTData) {
      const originalCyclicalActivity = getCyclicalActivityFormikDataForPUT();
      const changedCyclicalActivity = { ...formikValues };
      try {
        response = await updateCyclicalActivity(
          originalCyclicalActivity as TCyclicalActivityFormInputs,
          changedCyclicalActivity
        );
      } catch (error) {
        setShowNotification('ERROR', dbReadingErrorMessage);
      }
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

    if (isCurrentFormToPOSTData) {
      resetFormToInitialState();
      goToFirstStage();
    }
    if (isCurrentFormToPUTData) {
      resetFormToInitialState();
      setIsAddCyclicalActivityVisible(false);
    }
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
          await submitFormHandler(formik);
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
              <CyclicalActivityAddFormStageThree<TCyclicalActivityFormInputs>
                isCurrentFormToPUTData={isCurrentFormToPUTData}
                formik={formik}
              />
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
        </div>
      </form>
    </Fragment>
  );
}
