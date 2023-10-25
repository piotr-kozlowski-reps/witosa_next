import clsx from 'clsx';
import { FormikProps } from 'formik';
import { Fragment } from 'react';
import OneImageInputAndAlt from './OneImageInputAndAlt';

type Props<T> =
  | {
      imageFieldName: string;
      altFieldName: string;
      label: string;
      formik: FormikProps<T>;
      isCurrentFormToPUTData: string;
      isCommentPopupVisible?: false;
      commentContent?: never;
    }
  | {
      imageFieldName: string;
      altFieldName: string;
      label: string;
      formik: FormikProps<T>;
      isCurrentFormToPUTData: string;
      isCommentPopupVisible?: true;
      commentContent?: React.ReactNode;
    };

// type TFormImageType = TImageCyclicalActivityFormValues[];

export default function ImageUploadFormik<T>(props: Props<T>) {
  ////vars
  const {
    imageFieldName,
    label,
    formik,
    isCurrentFormToPUTData,
    altFieldName,
    commentContent,
  } = props;

  ////tsx
  return (
    <Fragment>
      <label
        htmlFor={label}
        className={clsx(
          'font-base-regular'
          // isErrorPresentAndFieldWasTouched ? 'text-skin-error' : ''
        )}
      >
        {label}
      </label>
      <div
        className={clsx(
          'mr-8 base-container-look'
          // error ? 'border-2 border-error' : ''
        )}
      >
        <OneImageInputAndAlt<T>
          formik={formik}
          isCurrentFormToPUTData={isCurrentFormToPUTData}
          altFieldName={altFieldName}
          imageFieldName={imageFieldName}
          isCommentPopupVisible={true}
          commentContent={commentContent}
        />
      </div>
    </Fragment>
  );
}
