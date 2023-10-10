import { TOccurrence } from '@/types';
import clsx from 'clsx';
import { FormikProps } from 'formik';
import { Fragment } from 'react';
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

  ////tsx
  return (
    <Fragment>
      <label htmlFor={name} className={clsx('font-base-regular')}>
        {label}
      </label>
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
    </Fragment>
  );
}
