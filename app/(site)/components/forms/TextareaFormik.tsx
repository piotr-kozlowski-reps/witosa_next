import {
  getErrorForField,
  getIsErrorNOTPresentAndFieldWasTouched,
  getIsErrorPresentAndFieldWasTouched,
} from '@/lib/formikHelpers';
import clsx from 'clsx';
import { FormikProps } from 'formik';

interface Props<T> {
  name: string;
  label: string;
  placeholder: string;
  width?: number;
  formik: FormikProps<T>;
}

export default function TextareaFormik<T>(props: Props<T>) {
  ///vars
  const { name, label, placeholder, width, formik } = props;
  //formik
  const error = getErrorForField<T>(formik, name);
  const isErrorPresentAndFieldWasTouched =
    getIsErrorPresentAndFieldWasTouched<T>(formik, name);
  const isErrorNotPresentAndFieldWasTouched =
    getIsErrorNOTPresentAndFieldWasTouched<T>(formik, name);

  const currentValue = formik.getFieldMeta(name).value as string;
  const onChangeForInput = formik.getFieldProps(name).onChange;
  const onBlurForInput = formik.getFieldProps(name).onBlur;

  ///tsx
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <label
        htmlFor={name}
        className={clsx(
          'font-base-regular',
          isErrorPresentAndFieldWasTouched ? 'text-skin-error' : ''
        )}
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        className={clsx(
          'form-input h-32',
          !width ? 'w-full' : '',
          isErrorPresentAndFieldWasTouched ? 'border-2 border-error' : '',
          isErrorNotPresentAndFieldWasTouched ? 'bg-cta-secondary-opacity' : ''
        )}
        value={currentValue}
        onBlur={onBlurForInput}
        onChange={(val) => onChangeForInput(val)}
        style={width ? { width: `${width}px` } : { width: '100%' }}
      ></textarea>
      {isErrorPresentAndFieldWasTouched ? (
        <p className="mt-[4px] text-skin-error mb-0 font-base-regular">
          {error}
        </p>
      ) : null}
    </div>
  );
}
