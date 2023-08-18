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
  const { name, placeholder, label, width } = props;

  return (
    <div className="flex flex-col items-start justify-start">
      <Field id={name} name="name">
        {(formik: any) => {
          ////vars
          const { field, form } = formik;
          const { onChange, onBlur } = field;
          const { errors } = form;

          const isErrorPresent: undefined | string = errors[name];

          return (
            <Fragment>
              <label
                htmlFor={name}
                className={clsx(
                  'font-base-regular',
                  isErrorPresent ? 'text-skin-error' : ''
                )}
              >
                {label}
              </label>
              <input
                id={name}
                name={name}
                placeholder={placeholder}
                value={form.values[name]}
                onChange={(val) => onChange(val)}
                onBlur={onBlur}
                className={clsx(
                  'py-[12px] px-8 font-base-regular rounded-base drop-shadow-big mt-[3px] transition-all duration-50 ease-out bg-skin-main-bg outline-none focus:border-2 focus:border-cta-secondary',
                  !width ? 'w-full' : '',
                  isErrorPresent ? 'border-2 border-error' : ''
                )}
                style={width ? { width: `${width}px` } : {}}
              />
              <p className="mt-[4px] text-skin-error">{errors[name]}</p>
            </Fragment>
          );
        }}
      </Field>
    </div>
  );
}
