import { Field } from 'formik';
import { Fragment } from 'react';

interface Props {
  name: string;
  label: string;
  // type: string;
  // placeholder: string;
  // width?: number;
  // isTextarea?: boolean;
  // value: string;
  // onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  // onBlur: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  // inputData: TInputFormState;
  // dataTestId: string;
  // dataTestIdForError: string;
}

export default function CheckboxFormik(props: Props) {
  ///vars
  const { name, label } = props;

  return (
    <div className="flex flex-col items-start justify-start">
      <Field id={name} name={name}>
        {(formik: any) => {
          ////vars
          const { field, form, touched } = formik;
          const { onChange, onBlur } = field;
          const { errors } = form;

          const isErrorPresentAndFieldWasTouched: undefined | string =
            errors[name] && form.touched[name];

          console.log({ field });

          return (
            <Fragment>
              <div className="mt-[23px] form-input-width font-base-regular hover:font-base-bold">
                <div className="checkbox-rect">
                  <input
                    type="checkbox"
                    id={name}
                    name={name}
                    // checked={isToChangePassword}
                    checked={form.values[name]}
                    onChange={(val) => onChange(val)}
                    value={form.values[name]}

                    // onChange={() =>
                    //   setIsToChangePassword((prevState) => !prevState)
                    // }
                  />
                  <label htmlFor={name} className="pl-8 ">
                    {label}
                  </label>
                </div>
              </div>
              {/* <label
                htmlFor={name}
                className={clsx(
                  'font-base-regular',
                  isErrorPresentAndFieldWasTouched ? 'text-skin-error' : ''
                )}
              >
                {label}
              </label> */}
              {/* <input
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
              /> */}
              {/* {isErrorPresentAndFieldWasTouched ? (
                <p className="mt-[4px] text-skin-error mb-0 font-base-regular">
                  {errors[name]}
                </p>
              ) : null} */}
            </Fragment>
          );
        }}
      </Field>
    </div>
  );
}
