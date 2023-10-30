import CustomButton from '@/app/(site)/components/CustomButton';
import CheckboxFormik from '@/app/(site)/components/forms/CheckboxFormik';
import DateAndTimePickerFormik from '@/app/(site)/components/forms/DateAndTimePickerFormik';
import DatePickerFormik from '@/app/(site)/components/forms/DatePickerFormik';
import InputFormik from '@/app/(site)/components/forms/InputFormik';
import MultipleSelectAsSeparateButtonsFormik from '@/app/(site)/components/forms/MultipleSelectAsSeparateButtonsFormik';
import ComponentTransitionFromRightToLeft from '@/app/(site)/components/motionWrappers/ComponentTransitionFromRightToLeft';
import { useNotificationState } from '@/context/notificationState';
import { dateOfEventIsNotDefined } from '@/lib/api/apiTextResponses';
import { setTodaysDateFromMidnight } from '@/lib/dateHelpers';
import { copyDateFromOneFormikFieldToAnother } from '@/lib/forms/events-form';
import { EventType, ForWhom, Place } from '@prisma/client';
import { FormikProps } from 'formik';
import { AnimatePresence } from 'framer-motion';
import { Fragment } from 'react';
import IsEventToBePublished from '../form_comments/IsEventToBePublished';
import VisibleFromComment from '../form_comments/VisibleFromComment';
import VisibleToComment from '../form_comments/VisibleToComment';

type Props<T> = {
  isCurrentFormToPUTData: string;
  formik: FormikProps<T>;
};

export default function EventAddFormStageOne<T>(props: Props<T>) {
  ////vars
  const { setShowNotification } = useNotificationState();
  const { isCurrentFormToPUTData, formik } = props;
  const isIsToBePublished = formik.getFieldProps('isToBePublished').value;

  function visibleToHandler(formik: FormikProps<T>) {
    try {
      copyDateFromOneFormikFieldToAnother(
        formik,
        'eventStartDate',
        'visibleTo'
      );
    } catch (error) {
      setShowNotification('ERROR', dateOfEventIsNotDefined);
      return;
    }
  }

  return (
    <Fragment>
      <div className="form-input-width -mt-[11px]">
        <InputFormik<T>
          name="title"
          type="text"
          label={isCurrentFormToPUTData ? 'zmień nazwę:' : 'nazwa:'}
          placeholder="wpisz nazwę"
          formik={formik}
        />
      </div>

      <div className="mt-[28px]">
        <MultipleSelectAsSeparateButtonsFormik<EventType, T>
          name="eventTypes"
          label={
            isCurrentFormToPUTData
              ? 'zmień rodzaj wydarzenia:'
              : 'rodzaj wydarzenia:'
          }
          enumToIterateThrough={Object.keys(EventType) as Array<EventType>}
          formik={formik}
        />
      </div>

      <div className="mt-[27px]">
        <MultipleSelectAsSeparateButtonsFormik<ForWhom, T>
          name="eventForWhom"
          label={isCurrentFormToPUTData ? 'zmień dla kogo:' : 'dla kogo:'}
          enumToIterateThrough={Object.keys(ForWhom) as Array<ForWhom>}
          formik={formik}
        />
      </div>

      <div className="mt-[27px]">
        <MultipleSelectAsSeparateButtonsFormik<Place, T>
          name="places"
          label={
            isCurrentFormToPUTData ? 'zmień miejsce zajęć:' : 'miejsce zajęć:'
          }
          enumToIterateThrough={Object.keys(Place) as Array<Place>}
          formik={formik}
        />
      </div>

      <div className="mt-[28px]">
        <DateAndTimePickerFormik<T>
          name="eventStartDate"
          label="data i godzina wydarzenia:"
          formik={formik}
          isErrorValidationTurnedOn={true}
          errorText="Data musi być określona."
        />
      </div>

      <div className="w-8 mt-[31px] mb-[0px] separator-horizontal"></div>

      <div className="mt-[6px]">
        <CheckboxFormik<T>
          name="isToBePublished"
          label="Czy wydarzenie ma być opublikowane?"
          isCommentPopupVisible={true}
          commentContent={<IsEventToBePublished />}
          isToBeUsedAsPartFormik={true}
          formik={formik}
        />
      </div>

      <AnimatePresence mode="wait">
        {isIsToBePublished ? (
          <ComponentTransitionFromRightToLeft>
            <Fragment>
              <div className="flex items-center justify-start">
                <div className="mt-[26px]">
                  <DatePickerFormik<T>
                    name="visibleFrom"
                    label={
                      isCurrentFormToPUTData
                        ? 'zmień datę rozpoczęcia publikacji:'
                        : 'data rozpoczęcia publikacji:'
                    }
                    formik={formik}
                    isErrorValidationTurnedOn={true}
                    isCommentPopupVisible={true}
                    commentContent={<VisibleFromComment />}
                  />
                </div>
                <div className="mt-[46px] ml-4">
                  <CustomButton
                    text="ustaw pole na dzisiejszą datę"
                    descriptionText="Ustaw pole na dzisiejszą datę."
                    disabled={false}
                    actionFn={() => {
                      formik
                        .getFieldHelpers('visibleFrom')
                        .setValue(setTodaysDateFromMidnight());
                    }}
                    outlined={true}
                    currentlyActive={false}
                  />
                </div>
              </div>

              <div className="flex items-center justify-start">
                <div className="mt-[26px]">
                  <DatePickerFormik<T>
                    name="visibleTo"
                    label={
                      isCurrentFormToPUTData
                        ? 'zmień datę zakończenia publikacji:'
                        : 'data zakończenia publikacji:'
                    }
                    formik={formik}
                    isErrorValidationTurnedOn={true}
                    isCommentPopupVisible={true}
                    commentContent={<VisibleToComment />}
                  />
                </div>
                <div className="mt-[46px] ml-4">
                  <CustomButton
                    text="ustaw datę na dzień wydarzenia"
                    descriptionText="Ustaw datę na dzień wydarzenia."
                    disabled={false}
                    actionFn={() => visibleToHandler(formik)}
                    outlined={true}
                    currentlyActive={false}
                  />
                </div>
              </div>
            </Fragment>
          </ComponentTransitionFromRightToLeft>
        ) : null}
      </AnimatePresence>
    </Fragment>
  );
}
