import {
  getErrorForField,
  getIsErrorNOTPresentAndFieldWasTouched,
  getIsErrorPresentAndFieldWasTouched,
} from '@/lib/formikHelpers';
import clsx from 'clsx';
import { FormikProps } from 'formik';
import CommentPopup from '../comment-popus/CommentPopup';

type Props<T> =
  | {
      name: string;
      label: string;
      placeholder: string;
      width?: number;
      height?: number;
      formik: FormikProps<T>;
      isCommentPopupVisible?: false;
      commentContent?: never;
      isShowCommentToTheLeft: never;
    }
  | {
      name: string;
      label: string;
      placeholder: string;
      width?: number;
      height?: number;
      formik: FormikProps<T>;
      isCommentPopupVisible?: true;
      commentContent?: React.ReactNode;
      isShowCommentToTheLeft?: boolean;
    };

export default function TextareaFormik<T>(props: Props<T>) {
  ///vars
  const {
    name,
    label,
    placeholder,
    width,
    formik,
    height,
    isCommentPopupVisible,
    commentContent,
  } = props;

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
    <div className="relative flex flex-col items-start justify-start w-full">
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
        style={{
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : `128px`,
        }}
      ></textarea>
      {isCommentPopupVisible ? (
        <div className="absolute top-[35px] px-2 -right-[32px]">
          <CommentPopup
            size="EXTRA_SMALL"
            alt={`${name} - komentarz.`}
            commentContent={commentContent}
            isShowCommentToTheLeft={true}
          />
        </div>
      ) : null}
      {isErrorPresentAndFieldWasTouched ? (
        <p className="mt-[4px] text-skin-error mb-0 font-base-regular">
          {error}
        </p>
      ) : null}
    </div>
  );
}
