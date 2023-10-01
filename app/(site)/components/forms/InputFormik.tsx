import {
  getErrorForField,
  getIsErrorNOTPresentAndFieldWasTouched,
  getIsErrorPresentAndFieldWasTouched,
} from '@/lib/formikHelpers';
import clsx from 'clsx';
import { FormikProps } from 'formik';
import { Fragment } from 'react';

interface Props<T> {
  name: string;
  label: string; //TODO: na pewno string? może mogę to dookreślić, znaleźć
  type: string;
  placeholder: string;
  width?: number;
  formik: FormikProps<T>;
  // isTextarea?: boolean;
  // value: string;
  // onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  // onBlur: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  // inputData: TInputFormState;
  // dataTestId: string;
  // dataTestIdForError: string;
}

export default function InputFormik<T>(props: Props<T>) {
  ///vars
  const { name, placeholder, label, width, type, formik } = props;

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
    <div className="flex flex-col items-start justify-start">
      <Fragment>
        <label
          htmlFor={name}
          className={clsx(
            'font-base-regular',
            isErrorPresentAndFieldWasTouched ? 'text-skin-error' : ''
          )}
        >
          {label}
        </label>

        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={currentValue}
          onChange={(val) => onChangeForInput(val)}
          onBlur={onBlurForInput}
          className={clsx(
            'form-input',
            !width ? 'w-full' : '',
            isErrorPresentAndFieldWasTouched ? 'border-2 border-error' : '',
            isErrorNotPresentAndFieldWasTouched
              ? 'bg-cta-secondary-opacity'
              : ''
          )}
          style={width ? { width: `${width}px` } : {}}
        />
        {isErrorPresentAndFieldWasTouched ? (
          <p className="mt-[4px] text-skin-error mb-0 font-base-regular">
            {error}
          </p>
        ) : null}
      </Fragment>
    </div>
  );
}
