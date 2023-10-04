'use client';

import { isDateSchema } from '@/lib/zodSchemas';
import { DatePicker } from '@mui/x-date-pickers';
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

export default function DatePickerFormik<T>(props: Props<T>) {
  ///vars
  const {
    name,
    label,
    formik,
    additionalClasses,
    isErrorValidationTurnedOn,
    errorText,
  } = props;

  const isErrorPresentAndFieldWasTouched =
    isErrorValidationTurnedOn &&
    checkIfValueIsDate(formik.getFieldProps(name).value) === false &&
    formik.getFieldMeta(name).touched;

  const isErrorNOTPresentAndFieldWasTouched =
    isErrorValidationTurnedOn &&
    checkIfValueIsDate(formik.getFieldProps(name).value) === true &&
    formik.getFieldMeta(name).touched;

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
        <DatePicker
          format="yyyy-MM-dd"
          value={formik.getFieldProps(name).value}
          onChange={(val) => formik.getFieldHelpers(name).setValue(val)}
          views={['day']}
          showDaysOutsideCurrentMonth
          sx={{
            '& .MuiInputBase-root': {
              backgroundColor: isErrorNOTPresentAndFieldWasTouched
                ? 'var(--cta-secondary-opacity)'
                : '',
              outlineColor: clsx(
                isErrorPresentAndFieldWasTouched
                  ? 'var(--color-error)'
                  : isErrorNOTPresentAndFieldWasTouched
                  ? 'var(--cta-secondary-opacity)'
                  : ''
              ),
            },
          }}
        />
        {isErrorPresentAndFieldWasTouched ? (
          <p className="mt-[4px] text-skin-error mb-0 font-base-regular">
            {errorText || 'Błąd.'}
          </p>
        ) : null}
      </div>
    </div>
  );
}

//utils
function checkIfValueIsDate(val: any) {
  try {
    isDateSchema.parse(val);
  } catch (error) {
    return false;
  }

  return true;
}
