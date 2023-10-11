import { getErrorForField } from '@/lib/formikHelpers';
import { TOccurrence } from '@/types';
import clsx from 'clsx';
import { FormikProps } from 'formik';
import { Fragment } from 'react';
import CustomButton from '../CustomButton';
import OccurrenceContentFormik from './OccurrenceContentFormik';

type Props<T> = {
  name: string;
  label: string;
  formik: FormikProps<T>;
  isCurrentFormToPUTData: string;
};

export default function OccurrenceFormik<T>(props: Props<T>) {
  ////vars
  const { name, label, formik, isCurrentFormToPUTData } = props;

  ////formik
  const currentOccurrencesValue = formik.getFieldMeta(name)
    .value as TOccurrence[];
  const error = getErrorForField<T>(formik, name);

  function addNewOccurrence() {
    const resultImagesArray = [
      ...currentOccurrencesValue,
      {
        day: 'MONDAY',
        activityStart: null,
        activityEnd: null,
      },
    ];
    formik.setFieldValue(name, resultImagesArray);
  }

  ////tsx
  return (
    <Fragment>
      <label htmlFor={name} className={clsx('font-base-regular')}>
        {label}
      </label>
      <div className={clsx('base-container-look mr-8')}>
        {currentOccurrencesValue.map((occurrence, index) => {
          return (
            <OccurrenceContentFormik<T>
              key={index}
              name={`occurrence`}
              index={index}
              formik={formik}
            />
          );
        })}
        <div className="ml-8">
          <CustomButton
            text={'dodaj dzień'}
            descriptionText="Dodaj dzień."
            additionalClasses="mt-[4px]"
            disabled={!!error}
            outlined={true}
            actionFn={() => {
              addNewOccurrence();
            }}
          />
        </div>
      </div>
    </Fragment>
  );
}
