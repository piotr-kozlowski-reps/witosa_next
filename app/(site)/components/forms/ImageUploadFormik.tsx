import { TImagePreviewTypeKey } from '@/types';
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
      imagePreviewType: TImagePreviewTypeKey;
      isToHaveCopyFromImagesButton?: boolean;
    }
  | {
      imageFieldName: string;
      altFieldName: string;
      label: string;
      formik: FormikProps<T>;
      isCurrentFormToPUTData: string;
      isCommentPopupVisible?: true;
      commentContent?: React.ReactNode;
      imagePreviewType: TImagePreviewTypeKey;
      isToHaveCopyFromImagesButton?: boolean;
    };

export default function ImageUploadFormik<T>(props: Props<T>) {
  ////vars
  const {
    imageFieldName,
    label,
    formik,
    isCurrentFormToPUTData,
    altFieldName,
    commentContent,
    imagePreviewType,
    isToHaveCopyFromImagesButton = false,
  } = props;

  ////tsx
  return (
    <Fragment>
      <label htmlFor={label} className={clsx('font-base-regular')}>
        {label}
      </label>
      <div className={clsx('mr-8 base-container-look')}>
        <OneImageInputAndAlt<T>
          formik={formik}
          isCurrentFormToPUTData={isCurrentFormToPUTData}
          altFieldName={altFieldName}
          imageFieldName={imageFieldName}
          isCommentPopupVisible={true}
          commentContent={commentContent}
          imagePreviewType={imagePreviewType}
          isToHaveCopyFromImagesButton={isToHaveCopyFromImagesButton}
        />
      </div>
    </Fragment>
  );
}
