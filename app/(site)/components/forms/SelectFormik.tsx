import clsx from 'clsx';
import CSS from 'csstype';
import { Field, FormikProps } from 'formik';
import { Fragment, useEffect, useState } from 'react';
import Select from 'react-select';

interface Props<T, R> {
  name: string;
  label: string;
  options: { value: T; label: string }[];
  formik: FormikProps<R>;
  width?: number;
}

export default function SelectFormik<T, R>(props: Props<T, R>) {
  ///vars
  const { name, label, options, width, formik } = props;

  const [selectedOption, setSelectedOption] = useState(options[0]);
  // const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    formik.setFieldValue(name, selectedOption.value);
  }, []);

  return (
    <div className="flex flex-col items-start justify-start">
      <Field id={name} name="name">
        {(formik: any) => {
          ////vars
          const { field, form, touched } = formik;
          const { onChange, onBlur } = field;
          const { errors } = form;

          // if (!isMounted) {
          //   form.setFieldValue(name, selectedOption.value);
          // }

          const stylesCommon: CSS.Properties = {
            width: '100%',
            fontSize: 'var(--font-size-normal)',
            lineHeight: 'var(--font-size-normal-line-height)',
            color: 'var(--color-foreground-base)',
            marginTop: '3px',
            borderRadius: '20px',
            backgroundColor: 'var(--color-background-base)',
            paddingTop: '4px',
            paddingBottom: '4px',
            paddingLeft: '2rem',
            paddingRight: '1rem',
            outline: '2px solid transparent',
            outlineOffset: '2px',
            boxShadow: '-4px 4px 18px var(--color-shadow)',
            transitionProperty: 'all',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDuration: '150ms',
            msTransitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          };

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

              <div
                className="custom-select"
                style={{ width: width ? width : '100%' }}
              >
                <Select
                  options={options}
                  defaultValue={selectedOption}
                  name={name}
                  id={name}
                  onChange={(val) => {
                    setSelectedOption({ value: val!.value, label: val!.label });
                    form.setFieldValue(name, val!.value);
                  }}
                  onBlur={onBlur}
                  value={selectedOption}
                  styles={{
                    container: (baseStyles) => ({
                      ...baseStyles,
                    }),
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      ...stylesCommon,
                      cursor: 'pointer',
                      fontWeight: state.isFocused ? 600 : 400,
                      border:
                        state.isFocused || state.menuIsOpen
                          ? '2px solid var(--cta-secondary)'
                          : '2px solid var(--color-background-base)',
                    }),
                    menu: () => ({
                      width: '100%',
                    }),
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      ...stylesCommon,
                      fontWeight: state.isSelected
                        ? 600
                        : state.isFocused
                        ? 600
                        : 400,
                      color: state.isSelected
                        ? 'var(--color-background-base)'
                        : 'var(--color-foreground-base)',
                      backgroundColor: state.isSelected
                        ? 'var(--cta-secondary)'
                        : state.isFocused
                        ? 'var(--cta-primary)'
                        : 'var(--color-background-base)',
                      border: state.isSelected
                        ? '0px solid var(--cta-primary)'
                        : state.isFocused
                        ? '0px solid var(--cta-primary)'
                        : '2px solid var(--cta-primary)',
                      padding: '5px',
                      cursor: state.isSelected ? 'default' : 'pointer',
                      height: '44px',
                      display: 'flex',
                      justifyContent: 'start',
                      alignItems: 'center',
                      boxShadow: 'none',
                    }),
                  }}
                />
              </div>

              {isErrorPresentAndFieldWasTouched ? (
                <p className="mt-[4px] text-skin-error mb-0 font-base-regular">
                  {errors[name]}
                </p>
              ) : null}
            </Fragment>
          );
        }}
      </Field>
    </div>
  );
}
