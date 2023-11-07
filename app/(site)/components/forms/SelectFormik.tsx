import {
  getErrorForField,
  getIsErrorNOTPresentAndFieldWasTouched,
  getIsErrorPresentAndFieldWasTouched,
} from '@/lib/formikHelpers';
import clsx from 'clsx';
import CSS from 'csstype';
import { FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import CommentPopup from '../comment-popus/CommentPopup';

type Props<T, R> =
  | {
      name: string;
      label: string;
      options: { value: T; label: string }[];
      formik: FormikProps<R>;
      width?: number;
      indexForChosenOptionWhenInitializing?: number;
      isCommentPopupVisible?: true;
      commentContent?: React.ReactNode;
    }
  | {
      name: string;
      label: string;
      options: { value: T; label: string }[];
      formik: FormikProps<R>;
      width?: number;
      indexForChosenOptionWhenInitializing?: number;
      isCommentPopupVisible?: false;
      commentContent?: never;
    };

export default function SelectFormik<T, R>(props: Props<T, R>) {
  ///vars
  const {
    name,
    label,
    options,
    width,
    formik,
    isCommentPopupVisible,
    commentContent,
  } = props;

  //formik
  const error = getErrorForField<R>(formik, name);
  const isErrorPresentAndFieldWasTouched =
    getIsErrorPresentAndFieldWasTouched<R>(formik, name);
  const isErrorNotPresentAndFieldWasTouched =
    getIsErrorNOTPresentAndFieldWasTouched<R>(formik, name);

  const currentValue = formik.getFieldMeta(name).value;

  const [selectedOption, setSelectedOption] = useState(() => {
    return options.find((option) => option.value === currentValue);
  });

  useEffect(() => {
    setSelectedOption(options.find((option) => option.value === currentValue));
  }, [currentValue, setSelectedOption, options]);

  const stylesCommon: CSS.Properties = {
    width: '100%',
    fontSize: 'var(--font-size-normal)',
    lineHeight: 'var(--font-size-normal-line-height)',
    color: 'var(--color-foreground-base)',
    marginTop: '3px',
    borderRadius: '20px',
    backgroundColor: isErrorNotPresentAndFieldWasTouched
      ? 'var(--cta-secondary-opacity)'
      : 'var(--color-background-base)',
    paddingTop: '4px',
    paddingBottom: '4px',
    paddingLeft: '2rem',
    paddingRight: '1rem',
    borderColor: isErrorNotPresentAndFieldWasTouched
      ? 'var(--cta-secondary-opacity)'
      : 'var(--color-background-base)',
    outline: '2px solid transparent',
    outlineOffset: '2px',
    boxShadow: '-4px 4px 18px var(--color-shadow)',
    transitionProperty: 'all',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '150ms',
    msTransitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
  };

  return (
    <div className="flex flex-col items-start justify-start">
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
        className="relative custom-select"
        style={{ width: width ? width : '100%' }}
      >
        <Select
          options={options}
          defaultValue={selectedOption}
          name={name}
          id={name}
          onChange={(val) => {
            formik.setFieldTouched(name);
            if (val && val.value !== undefined && val.value !== null) {
              formik.setFieldValue(name, val!.value);
            }
          }}
          onBlur={() => formik.setFieldTouched(name)}
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
              fontWeight: state.isSelected ? 600 : state.isFocused ? 600 : 400,
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
        {isCommentPopupVisible ? (
          <div className="absolute top-[18px] px-2 -right-[32px]">
            <CommentPopup
              size="EXTRA_SMALL"
              alt={`${name} - komentarz.`}
              commentContent={commentContent}
            />
          </div>
        ) : null}
      </div>
      {isErrorPresentAndFieldWasTouched ? (
        <p className="mt-[4px] text-skin-error mb-0 font-base-regular">
          {error}
        </p>
      ) : null}
    </div>
  );
}
