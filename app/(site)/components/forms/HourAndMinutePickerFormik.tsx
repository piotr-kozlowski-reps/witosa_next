'use client';

import {
  getErrorForField,
  getIsErrorNOTPresentAndFieldWasTouched,
  getIsErrorPresentAndFieldWasTouched,
} from '@/lib/formikHelpers';
import { TimePicker, renderTimeViewClock } from '@mui/x-date-pickers';
import clsx from 'clsx';
import { FormikProps } from 'formik';

type Props<T> = {
  name: string;
  label: string;
  formik: FormikProps<T>;
  additionalClasses?: string;
  isErrorValidationTurnedOn: boolean;
  errorText?: string;
};

export default function HourAndMinutePickerFormik<T>(props: Props<T>) {
  ///vars
  const { name, label, formik, additionalClasses } = props;

  const error = getErrorForField<T>(formik, name);

  const isErrorPresentAndFieldWasTouched =
    getIsErrorPresentAndFieldWasTouched<T>(formik, name);
  const isErrorNotPresentAndFieldWasTouched =
    getIsErrorNOTPresentAndFieldWasTouched<T>(formik, name);

  ///tsx
  return (
    <div className="flex flex-col items-start justify-start font-base-regular">
      <div
        className={additionalClasses ? additionalClasses : ''}
        onBlur={() => formik.getFieldHelpers(name).setTouched(true)}
      >
        <div
          className={clsx(
            'font-base-regular mb-[3px]',
            isErrorPresentAndFieldWasTouched ? 'text-skin-error' : ''
          )}
        >
          {label}
        </div>
        <TimePicker
          value={formik.getFieldProps(name).value}
          onChange={(val) => formik.getFieldHelpers(name).setValue(val)}
          views={['hours', 'minutes']}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
          }}
          sx={{
            '& .MuiInputBase-root': {
              backgroundColor: isErrorNotPresentAndFieldWasTouched
                ? 'var(--cta-secondary-opacity)'
                : '',
              outlineColor: clsx(
                isErrorPresentAndFieldWasTouched
                  ? 'var(--color-error)'
                  : isErrorNotPresentAndFieldWasTouched
                  ? 'var(--cta-secondary-opacity)'
                  : ''
              ),
            },
          }}
        />

        {isErrorPresentAndFieldWasTouched ? (
          <p className="mt-[4px] text-skin-error mb-0 font-base-regular">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}
