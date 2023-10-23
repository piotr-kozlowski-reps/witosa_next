import CheckboxFormik from '@/app/(site)/components/forms/CheckboxFormik';
import DatePickerFormik from '@/app/(site)/components/forms/DatePickerFormik';
import InputFormik from '@/app/(site)/components/forms/InputFormik';
import MultipleSelectAsSeparateButtonsFormik from '@/app/(site)/components/forms/MultipleSelectAsSeparateButtonsFormik';
import ComponentTransitionFromRightToLeft from '@/app/(site)/components/motionWrappers/ComponentTransitionFromRightToLeft';
import { ActivityType, ForWhom, Place } from '@prisma/client';
import { FormikProps } from 'formik';
import { AnimatePresence } from 'framer-motion';
import { Fragment } from 'react';
import IsExpiresAtRequiredComment from '../form_comments/IsExpiresAtRequiredComment';
import IsToBePublishedComment from '../form_comments/IsToBePublishedComment';

type Props<T> = {
  isCurrentFormToPUTData: string;
  formik: FormikProps<T>;
};

export default function CyclicalActivityAddFormStageOne<T>(props: Props<T>) {
  ////vars
  const { isCurrentFormToPUTData, formik } = props;
  const isExpiresAtRequired = formik.getFieldProps('isExpiresAtRequired').value;

  ////tsx
  return (
    <ComponentTransitionFromRightToLeft>
      <Fragment>
        <div className="form-input-width -mt-[13px]">
          <InputFormik<T>
            name="name"
            type="text"
            label={isCurrentFormToPUTData ? 'zmień nazwę:' : 'nazwa:'}
            placeholder="wpisz nazwę"
            formik={formik}
          />
        </div>

        <div className=" mt-[20px]">
          <MultipleSelectAsSeparateButtonsFormik<ActivityType, T>
            name="activityTypes"
            label={
              isCurrentFormToPUTData ? 'zmień rodzaj zajęć:' : 'rodzaj zajęć:'
            }
            enumToIterateThrough={
              Object.keys(ActivityType) as Array<ActivityType>
            }
            formik={formik}
          />
        </div>

        <div className="mt-[22px]">
          <MultipleSelectAsSeparateButtonsFormik<ForWhom, T>
            name="activitiesForWhom"
            label={isCurrentFormToPUTData ? 'zmień dla kogo:' : 'dla kogo:'}
            enumToIterateThrough={Object.keys(ForWhom) as Array<ForWhom>}
            formik={formik}
          />
        </div>

        <div className="mt-[22px]">
          <MultipleSelectAsSeparateButtonsFormik<Place, T>
            name="places"
            label={
              isCurrentFormToPUTData ? 'zmień miejsce zajęć:' : 'miejsce zajęć:'
            }
            enumToIterateThrough={Object.keys(Place) as Array<Place>}
            formik={formik}
          />
        </div>

        <div className="mt-[2px]">
          <CheckboxFormik<T>
            name="isToBePublished"
            label="Czy zajęcia mają być opublikowane?"
            isCommentPopupVisible={true}
            commentContent={<IsToBePublishedComment />}
            isToBeUsedAsPartFormik={true}
            formik={formik}
          />
        </div>

        <div className="mt-[-2px]">
          <CheckboxFormik<T>
            name="isExpiresAtRequired"
            label="Czy chcesz dodać datę zakończenia publikacji?"
            isCommentPopupVisible={true}
            commentContent={<IsExpiresAtRequiredComment />}
            isToBeUsedAsPartFormik={true}
            formik={formik}
          />
        </div>

        <AnimatePresence mode="wait">
          {isExpiresAtRequired ? (
            <ComponentTransitionFromRightToLeft>
              <DatePickerFormik<T>
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
  );
}
