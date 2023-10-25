import {
  getErrorForField,
  getIsErrorNOTPresentAndFieldWasTouched,
  getIsErrorPresentAndFieldWasTouched,
} from '@/lib/formikHelpers';
import clsx from 'clsx';
import { FormikProps } from 'formik';
import { Fragment } from 'react';
import CommentPopup from '../comment-popus/CommentPopup';

// type Props<T, R> =
//   | {
//       name: string;
//       label: string;
//       options: { value: T; label: string }[];
//       formik: FormikProps<R>;
//       width?: number;
//       isCommentPopupVisible?: true;
//       commentContent?: React.ReactNode;
//     }
//   | {
//       name: string;
//       label: string;
//       options: { value: T; label: string }[];
//       formik: FormikProps<R>;
//       width?: number;
//       isCommentPopupVisible?: false;
//       commentContent?: never;
//     };
type Props<T> =
  | {
      name: string;
      label: string;
      type: string;
      placeholder: string;
      width?: number;
      formik: FormikProps<T>;
      isCommentPopupVisible?: false;
      commentContent?: never;
    }
  | {
      name: string;
      label: string;
      type: string;
      placeholder: string;
      width?: number;
      formik: FormikProps<T>;
      isCommentPopupVisible?: true;
      commentContent?: React.ReactNode;
    };

export default function InputFormik<T>(props: Props<T>) {
  ////vars
  const {
    name,
    placeholder,
    label,
    width,
    type,
    formik,
    isCommentPopupVisible,
    commentContent,
  } = props;

  ////formik
  const error = getErrorForField<T>(formik, name);
  const isErrorPresentAndFieldWasTouched =
    getIsErrorPresentAndFieldWasTouched<T>(formik, name);
  const isErrorNotPresentAndFieldWasTouched =
    getIsErrorNOTPresentAndFieldWasTouched<T>(formik, name);

  // console.log({ isErrorPresentAndFieldWasTouched });
  // console.log({ isErrorNotPresentAndFieldWasTouched });

  const currentValue = formik.getFieldMeta(name).value as string;
  const onChangeForInput = formik.getFieldProps(name).onChange;
  const onBlurForInput = formik.getFieldProps(name).onBlur;

  // const onBluerHandler = () => {
  //   onBlurForInput;
  //   // alert('on blur');
  // };

  ///tsx
  return (
    <div className="relative flex flex-col items-start justify-start">
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
          // onBlur={onBlurForInput}
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
        {isCommentPopupVisible ? (
          <div className="absolute top-[35px] px-2 -right-[32px]">
            <CommentPopup
              size="EXTRA_SMALL"
              alt={`${name} - komentarz.`}
              commentContent={commentContent}
            />
          </div>
        ) : null}
        {isErrorPresentAndFieldWasTouched ? (
          <p className="mt-[4px] text-skin-error mb-0 font-base-regular">
            {error}
          </p>
        ) : null}
      </Fragment>
    </div>
  );
}
