'use client';

import { useIsMounted } from '@/hooks/useIsMounted';
import {
  getErrorForField,
  getIsErrorNOTPresentAndFieldWasTouched,
  getIsErrorPresentAndFieldWasTouched,
} from '@/lib/formikHelpers';
import clsx from 'clsx';
import { FormikProps } from 'formik';
import dynamic from 'next/dynamic';
import { Fragment, useEffect, useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import DetailedDescriptionForThreeDisplaysPreview from './DetailedDescriptionForThreeDisplaysPreview';
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <p>Loading</p>,
});

type Props<T> =
  | {
      name: string;
      label: string;
      formik: FormikProps<T>;
    }
  | {
      name: string;
      label: string;
      formik: FormikProps<T>;
    };

export default function RichTextEditorFormik<T>(props: Props<T>) {
  ////vars
  const { name, label, formik } = props;
  const isMounted = useIsMounted();

  ////formik
  const error = getErrorForField<T>(formik, name);
  const isErrorPresentAndFieldWasTouched =
    getIsErrorPresentAndFieldWasTouched<T>(formik, name);
  const isErrorNotPresentAndFieldWasTouched =
    getIsErrorNOTPresentAndFieldWasTouched<T>(formik, name);

  const currentValue = formik.getFieldMeta(name).value as string;

  //TODO: custom hook?
  const [value, setValue] = useState(currentValue);
  useEffect(() => {
    formik.getFieldHelpers(name).setValue(
      value
        .replace(/&nbsp;/g, ' ')
        .replace(/\u00A0/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
    );
  }, [value]);

  const modules = {
    toolbar: [
      [{ header: 2 }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean'],
    ],
    history: {
      delay: 1500,
      maxStack: 500,
      userOnly: true,
    },
  };

  console.log({ value });

  ////tsx
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
      <div className={clsx('mb-4 base-container-look mr-8')}>
        <div className="mx-8 ">
          {isMounted() ? (
            <ReactQuill
              modules={modules}
              theme="snow"
              value={value}
              placeholder="dodaj szczegółowy opis ..."
              onChange={(content, delta, source, editor) => {
                if (editor.getText().trim() == '') {
                  setValue('');
                  return;
                }
                setValue(content);
              }}
              className={clsx(
                'ql-toolbar ql-container.ql-snow',
                isErrorPresentAndFieldWasTouched ? 'ql-toolbar-error' : ''
              )}
              onBlur={() => formik.getFieldHelpers(name).setTouched(true)}
              style={{
                border: isErrorPresentAndFieldWasTouched ? 'solid' : 'none',
                borderWidth: isErrorPresentAndFieldWasTouched ? '2px' : '0px',
                borderColor: isErrorPresentAndFieldWasTouched
                  ? 'var(--color-error)'
                  : 'var(--color-main-bg)',
                backgroundColor: isErrorNotPresentAndFieldWasTouched
                  ? 'var(--cta-secondary-opacity)'
                  : 'var(--color-main-bg)',
              }}
            />
          ) : null}

          {isErrorPresentAndFieldWasTouched ? (
            <p className="mt-[4px] text-skin-error mb-0 font-base-regular">
              {error}
            </p>
          ) : null}

          <div className="mt-[40px] self-start flex justify-start items-center gap-8 mb-[28px]">
            <DetailedDescriptionForThreeDisplaysPreview valueText={value} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
