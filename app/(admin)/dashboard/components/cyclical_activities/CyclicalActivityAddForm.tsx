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
import { useFormStages } from '@/hooks/useFormStages';
import { useFormikForCyclicalActivities } from '@/hooks/useFormikForCyclicalActivities';
import { dbReadingErrorMessage } from '@/lib/api/apiTextResponses';
import { getInitialFormStagesForCyclicalActivitiesObject } from '@/lib/forms/cyclical-activities-form';
import {
  TActionResponse,
  TCyclicalActivityFormInputs,
  TFormStage,
  TImageCyclicalActivityFormValues,
} from '@/types';
import { FormikProps } from 'formik';
import { Fragment } from 'react';
import CyclicalActivityAddFormStageOne from './CyclicalActivityAddFormStageOne';
import CyclicalActivityAddFormStageThree from './CyclicalActivityAddFormStageThree';
import CyclicalActivityAddFormStageTwo from './CyclicalActivityAddFormStageTwo';

export default function CyclicalActivityAddForm() {
  ////vars
  const { setShowNotification } = useNotificationState();
  const {
    setIsAddCyclicalActivityVisible,
    resetCyclicalActivityFormikDataForPUT,
    getCyclicalActivityFormikDataForPUT,
  } = useCyclicalActivitiesState();

  const formik = useFormikForCyclicalActivities();

  const isCurrentFormToPOSTData = !getCyclicalActivityFormikDataForPUT().name;
  const isCurrentFormToPUTData = getCyclicalActivityFormikDataForPUT().name;

  const stagesInitialStage: TFormStage[] =
    getInitialFormStagesForCyclicalActivitiesObject(formik.values);

  const {
    goToFirstStage,
    stage,
    goToNextGivenStageOrJustNextStageOfForm,
    goToPrevGivenStageOrJustPrevStageOfForm,
    checkIfPrevIsEnabled,
    checkIfNextIsEnabled,
  } = useFormStages<TCyclicalActivityFormInputs>(stagesInitialStage, formik);

  function resetFormToInitialState() {
    resetCyclicalActivityFormikDataForPUT();
    formik.resetForm();
  }

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
        index: image.index,
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

      {/**
       * form start
       */}
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
            descriptionText="Poprzedni etap."
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
            descriptionText="Dodaj zajęcia."
            additionalClasses="mt-[4px]"
            onSubmit={true}
            disabled={!formik.dirty || !formik.isValid}
          />
        </div>
      </form>
      {/**
       * form end
       */}
    </Fragment>
  );
}
