import { useGetSrcAndAltFromFileDataDependingIfItIsAStringOrFile } from '@/hooks/useGetSrcAndAltFromFileDataDependingIfItIsAStringOrFile';
import {
  getErrorForField,
  getIsErrorPresentAndFieldWasTouched,
} from '@/lib/formikHelpers';
import { TFileWithPreview } from '@/types';
import clsx from 'clsx';
import { FormikProps } from 'formik';
import Image from 'next/image';
import { Fragment } from 'react';
import CommentPopup from '../comment-popus/CommentPopup';
import DropzoneImage from './DropzoneImage';

type Props<T> =
  | {
      index?: number;
      file: TFileWithPreview | string;
      formik: FormikProps<T>;
      name: string;
      isCommentPopupVisible?: false;
      commentContent?: never;
    }
  | {
      index?: number;
      file: TFileWithPreview | string;
      formik: FormikProps<T>;
      name: string;
      isCommentPopupVisible?: true;
      commentContent?: React.ReactNode;
    };

export function DropImageFormik<T>(props: Props<T>) {
  ////vars
  const { index, file, formik, name, isCommentPopupVisible, commentContent } =
    props;

  const { src, alt, isFileATFileWithPreviewType } =
    useGetSrcAndAltFromFileDataDependingIfItIsAStringOrFile(file);

  ////formik
  const error = getErrorForField<T>(formik, name);
  const isErrorPresentAndFieldWasTouched =
    getIsErrorPresentAndFieldWasTouched<T>(formik, name);

  ////tsx
  return (
    <Fragment>
      <div className="flex items-center justify-between">
        {index || index === 0 ? (
          <div className="h-16 w-11 bg-cta-secondary rounded-r-base">
            <div className="flex items-center justify-center h-16 w-11">
              <span className="text-skin-inverted font-large-bold">
                {index + 1}
              </span>
            </div>
          </div>
        ) : null}

        <div
          className={clsx(
            'w-16 h-16 ml-8',
            isErrorPresentAndFieldWasTouched
              ? 'diagonal-lines-fill-error'
              : !file
              ? 'diagonal-lines-fill-gray opacity-30'
              : ''
          )}
        >
          {file ? (
            <Image
              unoptimized
              src={src}
              width={64}
              height={64}
              alt={alt}
              className="object-fill w-full h-full"
              onLoad={() => {
                if (isFileATFileWithPreviewType) {
                  return;
                }
                const fileAsTFileWithPreview: TFileWithPreview =
                  file as TFileWithPreview;
                URL.revokeObjectURL(fileAsTFileWithPreview!.preview);
              }}
            />
          ) : null}
        </div>
        <div className="relative grow">
          <DropzoneImage<T>
            formik={formik}
            name={index ? `images.${index}.file` : name}
            isErrorPresentAndFieldWasTouched={isErrorPresentAndFieldWasTouched}
          />
          {isCommentPopupVisible ? (
            <div className="absolute top-[24px] px-2 -right-[32px] z-60">
              <CommentPopup
                size="EXTRA_SMALL"
                alt={`${name} - komentarz.`}
                commentContent={commentContent}
                isShowCommentToTheLeft={true}
              />
            </div>
          ) : null}
        </div>

        <div className="w-8 h-16"></div>
      </div>
      {isErrorPresentAndFieldWasTouched ? (
        <p className="mt-[4px]  ml-[76px] text-skin-error mb-0 font-base-regular">
          {error}
        </p>
      ) : null}
    </Fragment>
  );
}
