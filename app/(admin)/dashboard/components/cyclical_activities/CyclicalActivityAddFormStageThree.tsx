import OccurrenceFormik from '@/app/(site)/components/forms/OccurrenceFormik';
import ComponentTransitionFromRightToLeft from '@/app/(site)/components/motionWrappers/ComponentTransitionFromRightToLeft';
import { FormikProps } from 'formik';
import { Fragment } from 'react';

type Props<T> = {
  isCurrentFormToPUTData: string;
  formik: FormikProps<T>;
};

export default function CyclicalActivityAddFormStageThree<T>(props: Props<T>) {
  ////vars
  const { isCurrentFormToPUTData, formik } = props;

  ////tsx
  return (
    <ComponentTransitionFromRightToLeft>
      <Fragment>
        <div className="-mt-[13px]">
          <OccurrenceFormik
            formik={formik}
            name="occurrence"
            label="dzień oraz godziny zajęć:"
            isCurrentFormToPUTData={isCurrentFormToPUTData}
          />
        </div>
      </Fragment>
    </ComponentTransitionFromRightToLeft>
  );
}
