import CloseIcon from '@/app/(site)/components/icons/CloseIcon';
import { useEventsState } from '@/context/eventsState';
import { generateValidationForEvents } from '@/lib/forms/events-form';
import { TEventFormInputs } from '@/types';
import { useFormik, validateYupSchema, yupToFormErrors } from 'formik';
import { Fragment } from 'react';

export default function EventAddForm() {
  ////vars
  const {
    getEventFormikDataForPUT,
    resetEventFormikDataForPUT,
    setIsAddEventVisible,
  } = useEventsState();
  const isCurrentFormToPOSTData = !getEventFormikDataForPUT().title;
  const isCurrentFormToPUTData = getEventFormikDataForPUT().title;

  //formik
  const validationSchema = generateValidationForEvents();
  const formik = useFormik<TEventFormInputs>({
    initialValues: getEventFormikDataForPUT() as TEventFormInputs,
    onSubmit: () => {},
    validate: (value) => {
      try {
        validateYupSchema(value, validationSchema, true, value);
      } catch (error) {
        return yupToFormErrors(error);
      }
    },
  });

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

      {/* form */}
      {/* <form
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
      </form> */}
    </Fragment>
  );
}
