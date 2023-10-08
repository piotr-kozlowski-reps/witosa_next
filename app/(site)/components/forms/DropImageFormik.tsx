import {
  getErrorForField,
  getIsErrorPresentAndFieldWasTouched,
} from '@/lib/formikHelpers';
import { TFileWithPreview } from '@/types';
import clsx from 'clsx';
import { FormikProps } from 'formik';
import Image from 'next/image';
import { Fragment } from 'react';
import DropzoneImage from './DropzoneImage';

type Props<T> = {
  index: number;
  file: TFileWithPreview;
  formik: FormikProps<T>;
  name: string;
};

export function DropImageFormik<T>(props: Props<T>) {
  ////vars
  const { index, file, formik, name } = props;

  ////formik
  const error = getErrorForField<T>(formik, name);
  const isErrorPresentAndFieldWasTouched =
    getIsErrorPresentAndFieldWasTouched<T>(formik, name);

  ////tsx
  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <div className="h-16 w-11 bg-cta-secondary rounded-r-base">
          <div className="flex items-center justify-center h-16 w-11">
            <span className="text-skin-inverted font-large-bold">
              {index + 1}
            </span>
          </div>
        </div>
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
              src={file.preview}
              width={64}
              height={64}
              alt={file.name}
              className="object-fill w-full h-full"
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
            />
          ) : null}
        </div>

        <DropzoneImage<T>
          formik={formik}
          name={`images.${index}.file`}
          isErrorPresentAndFieldWasTouched={isErrorPresentAndFieldWasTouched}
        />

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
