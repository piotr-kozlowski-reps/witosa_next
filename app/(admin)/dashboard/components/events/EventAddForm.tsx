import CustomButton from '@/app/(site)/components/CustomButton';
import FormStageLink from '@/app/(site)/components/forms/FormStageLink';
import CloseIcon from '@/app/(site)/components/icons/CloseIcon';
import ComponentTransitionFromRightToLeft from '@/app/(site)/components/motionWrappers/ComponentTransitionFromRightToLeft';
import { useEventsState } from '@/context/eventsState';
import { useFormStages } from '@/hooks/useFormStages';
import { useFormikForEvents } from '@/hooks/useFormikForEvents';
import { getInitialFormStagesForEventsObject } from '@/lib/forms/events-form';
import { TEventFormInputs, TFormStage } from '@/types';
import { FormikProps } from 'formik';
import { Fragment } from 'react';
import EventAddFormStageOne from './EventAddFormStageOne';

export default function EventAddForm() {
  ////vars
  const {
    getEventFormikDataForPUT,
    resetEventFormikDataForPUT,
    setIsAddEventVisible,
  } = useEventsState();

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

  const submitFormHandler = (formik: FormikProps<TEventFormInputs>) => {
    console.log('formik submitted', formik);
  };

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
            <EventAddFormStageOne<TEventFormInputs>
              isCurrentFormToPUTData={isCurrentFormToPUTData}
              formik={formik}
            />
          </ComponentTransitionFromRightToLeft>
        ) : null}

        {/* {stage[1].isActive ? (
          <CyclicalActivityAddFormStageTwo<TCyclicalActivityFormInputs>
            isCurrentFormToPUTData={isCurrentFormToPUTData}
            formik={formik}
          />
        ) : null} */}

        {/* {stage[2].isActive ? (
          <ComponentTransitionFromRightToLeft>
            <Fragment>
              <CyclicalActivityAddFormStageThree<TCyclicalActivityFormInputs>
                isCurrentFormToPUTData={isCurrentFormToPUTData}
                formik={formik}
              />
            </Fragment>
          </ComponentTransitionFromRightToLeft>
        ) : null} */}

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
