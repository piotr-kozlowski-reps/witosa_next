import {
  getErrorForField,
  getIsErrorNOTPresentAndFieldWasTouched,
  getIsErrorPresentAndFieldWasTouched,
} from '@/lib/formikHelpers';
import { DateTimePicker, renderTimeViewClock } from '@mui/x-date-pickers';
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
export default function DateAndTimePickerFormik<T>(props: Props<T>) {
  ///vars
  const { name, label, formik, additionalClasses } = props;

  const error = getErrorForField<T>(formik, name);
  const valueFromFormik = formik.getFieldProps(name).value;

  const isErrorPresentAndFieldWasTouched =
    getIsErrorPresentAndFieldWasTouched<T>(formik, name);
  const isErrorNotPresentAndFieldWasTouched =
    getIsErrorNOTPresentAndFieldWasTouched<T>(formik, name);

  function getDateValue(date: Date): Date {
    // const dateZoned = utcToZonedTime(date, timeZone);

    // return dateZoned;
    return date;
  }

  function setUTCDateValueForDB(date: Date): Date {
    // const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // const utcDate = zonedTimeToUtc(date, timeZone);

    // return utcDate;
    return date;
  }

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
        <DateTimePicker
          value={valueFromFormik ? getDateValue(valueFromFormik) : null}
          onChange={(val) =>
            formik
              .getFieldHelpers(name)
              .setValue(setUTCDateValueForDB(val as Date))
          }
          views={['year', 'month', 'day', 'hours', 'minutes']}
          showDaysOutsideCurrentMonth
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
          }}
          sx={{
            '& .MuiInputBase-root': {
              color: 'var(--color-foreground-base)',
              svg: { color: 'var(--color-foreground-base)' },
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
