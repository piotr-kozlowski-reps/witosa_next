import { addEvent, updateEvent } from '@/actions/eventsActions';
import CustomButton from '@/app/(site)/components/CustomButton';
import FormStageLink from '@/app/(site)/components/forms/FormStageLink';
import CloseIcon from '@/app/(site)/components/icons/CloseIcon';
import ComponentTransitionFromRightToLeft from '@/app/(site)/components/motionWrappers/ComponentTransitionFromRightToLeft';
import { useEventsState } from '@/context/eventsState';
import { useNotificationState } from '@/context/notificationState';
import { useFormStages } from '@/hooks/useFormStages';
import { useFormikForEvents } from '@/hooks/useFormikForEvents';
import { dbReadingErrorMessage } from '@/lib/api/apiTextResponses';
import {
  getInitialFormStagesForEventsObject,
  prepareEventValuesForBackend,
} from '@/lib/forms/events-form';
import { TActionResponse, TEventFormInputs, TFormStage } from '@/types';
import { FormikProps } from 'formik';
import { Fragment } from 'react';
import EventAddFormStageFive from './EventAddFormStageFive';
import EventAddFormStageFour from './EventAddFormStageFour';
import EventAddFormStageOne from './EventAddFormStageOne';
import EventAddFormStageThree from './EventAddFormStageThree';
import EventAddFormStageTwo from './EventAddFormStageTwo';

export default function EventAddForm() {
  ////vars
  const {
    getEventFormikDataForPUT,
    resetEventFormikDataForPUT,
    setIsAddEventVisible,
  } = useEventsState();
  const { setShowNotification } = useNotificationState();

  const isCurrentFormToPOSTData = !getEventFormikDataForPUT().title;
  const isCurrentFormToPUTData = getEventFormikDataForPUT().title;

  const formik = useFormikForEvents();

  const stagesInitialStage: TFormStage[] = getInitialFormStagesForEventsObject(
    formik.values
  );

  const {
    goToFirstStage,
    stage,
    goToNextGivenStageOrJustNextStageOfForm,
    goToPrevGivenStageOrJustPrevStageOfForm,
    checkIfPrevIsEnabled,
    checkIfNextIsEnabled,
  } = useFormStages<TEventFormInputs>(stagesInitialStage, formik);

  function resetFormToInitialState() {
    resetEventFormikDataForPUT();
    formik.resetForm();
  }

  const submitFormHandler = async (formik: FormikProps<TEventFormInputs>) => {
    let response: TActionResponse | null = null;

    let formikValuesPreparedForBackend: TEventFormInputs;
    try {
      formikValuesPreparedForBackend = prepareEventValuesForBackend(
        formik.values
      );
    } catch (error) {
      setShowNotification('ERROR', (error as Error).message);
      return;
    }

    /**
     * post
     * */
    if (isCurrentFormToPOSTData) {
      try {
        response = await addEvent(formikValuesPreparedForBackend);
      } catch (error) {
        setShowNotification('ERROR', dbReadingErrorMessage);
      }
    }

    /**
     * put
     * */
    if (isCurrentFormToPUTData) {
      const originalEvent = getEventFormikDataForPUT();
      const changedEvent = { ...formikValuesPreparedForBackend };
      try {
        response = await updateEvent(
          originalEvent as TEventFormInputs,
          changedEvent
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
      setIsAddEventVisible(false);
    }
  };

  ////tsx
  return (
    <Fragment>
      <div className="flex items-center justify-between mb-[20px] mr-8 -mt-[18px]">
        <div className="prose">
          <h3>
            {isCurrentFormToPUTData
              ? 'Zmień szczegóły wydarzenia'
              : 'Dodaj wydarzenie'}
          </h3>
        </div>
        <div>
          <CloseIcon
            alt="Zamknij formularz."
            actionFn={() => {
              resetEventFormikDataForPUT();
              setIsAddEventVisible(false);
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
        <div className="flex mb-12 font-base-regular ">
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
            <EventAddFormStageOne<TEventFormInputs>
              isCurrentFormToPUTData={isCurrentFormToPUTData}
              formik={formik}
            />
          </ComponentTransitionFromRightToLeft>
        ) : null}

        {stage[1].isActive ? (
          <ComponentTransitionFromRightToLeft>
            <EventAddFormStageTwo<TEventFormInputs>
              isCurrentFormToPUTData={isCurrentFormToPUTData}
              formik={formik}
            />
          </ComponentTransitionFromRightToLeft>
        ) : null}

        {stage[2].isActive ? (
          <ComponentTransitionFromRightToLeft>
            <EventAddFormStageThree<TEventFormInputs>
              isCurrentFormToPUTData={isCurrentFormToPUTData}
              formik={formik}
            />
          </ComponentTransitionFromRightToLeft>
        ) : null}

        {stage[3].isActive ? (
          <ComponentTransitionFromRightToLeft>
            <EventAddFormStageFour<TEventFormInputs>
              isCurrentFormToPUTData={isCurrentFormToPUTData}
              formik={formik}
            />
          </ComponentTransitionFromRightToLeft>
        ) : null}

        {stage[4].isActive ? (
          <ComponentTransitionFromRightToLeft>
            <EventAddFormStageFive<TEventFormInputs>
              isCurrentFormToPUTData={isCurrentFormToPUTData}
              formik={formik}
            />
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
            text={
              isCurrentFormToPUTData ? 'zmień wydarzenie' : 'dodaj wydarzenie'
            }
            descriptionText="Dodaj wydarzenie."
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
