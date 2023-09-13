import clsx from 'clsx';
import { Field } from 'formik';
import { Fragment } from 'react';

interface Props {
  name: string;
  label: string; //TODO: na pewno string? może mogę to dookreślić, znaleźć
  type: string;
  placeholder: string;
  width?: number;
  // isTextarea?: boolean;
  // value: string;
  // onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  // onBlur: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  // inputData: TInputFormState;
  // dataTestId: string;
  // dataTestIdForError: string;
}

export default function InputFormik(props: Props) {
  ///vars
  const { name, placeholder, label, width, type } = props;

  return (
    <div className="flex flex-col items-start justify-start">
      <Field id={name} name="name">
        {(formik: any) => {
          ////vars
          const { field, form, touched } = formik;
          const { onChange, onBlur } = field;
          const { errors } = form;

          const isErrorPresentAndFieldWasTouched: undefined | string =
            errors[name] && form.touched[name];

          return (
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
                value={form.values[name]}
                onChange={(val) => onChange(val)}
                onBlur={onBlur}
                className={clsx(
                  'form-input',
                  !width ? 'w-full' : '',
                  isErrorPresentAndFieldWasTouched
                    ? 'border-2 border-error'
                    : ''
                )}
                style={width ? { width: `${width}px` } : {}}
              />
              {isErrorPresentAndFieldWasTouched ? (
                <p className="mt-[4px] text-skin-error mb-0">{errors[name]}</p>
              ) : null}
            </Fragment>
          );
        }}
      </Field>
    </div>
  );
}
