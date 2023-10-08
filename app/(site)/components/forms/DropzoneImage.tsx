import {
  createErrorsListInOneLineSeparatedWithVerticalLine,
  getPolishErrorNamesForDropZoneArea,
} from '@/lib/textHelpers';
import { TFileWithPreview } from '@/types';
import clsx from 'clsx';
import { FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';

type Props<T> = {
  formik: FormikProps<T>;
  name: string;
  isErrorPresentAndFieldWasTouched: boolean | '' | undefined;
};

export default function DropzoneImage<T>(props: Props<T>) {
  ////vars
  const { formik, name, isErrorPresentAndFieldWasTouched } = props;

  ////formik
  const currentValue = formik.getFieldMeta(name).value as TFileWithPreview;

  const onBlurForInput = formik.getFieldProps(name).onBlur;

  //drop zone
  const [filesRejected, setFilesRejected] = useState<FileRejection[]>([]);
  const [dropZoneText, setDropZoneText] = useState('');
  const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (acceptedFiles?.length && acceptedFiles[0]) {
      const currentFile = acceptedFiles[0];
      formik.setFieldValue(
        name,
        Object.assign(currentFile, {
          preview: URL.createObjectURL(currentFile),
        })
      );
    }
    if (rejectedFiles.length) {
      setFilesRejected(rejectedFiles);
    }
  };

  const { getRootProps, getInputProps, isDragActive, isFileDialogActive } =
    useDropzone({
      onDrop,
      accept: { 'image/*': [] },
      maxFiles: 1,
      maxSize: 4096 * 1000,
    });

  let timer: ReturnType<typeof setTimeout>;
  const clearErrorDropZOneText = () => {
    timer = setTimeout(() => {
      setFilesRejected([]);
    }, 4000);
  };

  useEffect(() => {
    if (isDragActive) {
      setDropZoneText('upuść obrazek tutaj');
      return;
    }

    if (!isDragActive && filesRejected.length) {
      const responseTextToErrors = createTextResponseText(filesRejected);
      setDropZoneText(responseTextToErrors);
      clearErrorDropZOneText();
      return;
    }

    if (!isDragActive && !currentValue) {
      setDropZoneText('przenieś obrazek na to pole lub kliknij');
      return;
    }

    if (!isDragActive && currentValue) {
      setDropZoneText(currentValue.name);
      return;
    }

    return () => {
      clearTimeout(timer);
    };
  }, [filesRejected, isDragActive, currentValue]);

  useEffect(() => {
    const isFieldTouched = formik.getFieldMeta(name).touched;

    if (!isFieldTouched) {
      formik.getFieldHelpers(name).setTouched(true);
    }
  }, [isFileDialogActive, isDragActive]);

  ////tsx
  return (
    <div
      {...getRootProps({
        className: clsx(
          'flex-grow h-16 ml-8 w-max base-container-look hover:diagonal-lines-fill',
          currentValue && !isDragActive
            ? 'diagonal-lines-fill-secondary'
            : 'diagonal-lines-fill-gray',
          isDragActive ? 'diagonal-lines-fill' : '',
          isErrorPresentAndFieldWasTouched ? 'diagonal-lines-fill-error' : ''
        ),
      })}
    >
      <input {...getInputProps()} />
      <div
        className="flex items-center justify-center h-full mx-auto w-96"
        onBlur={() => {
          alert('on blur');
        }}
      >
        <span
          className={clsx(
            'text-background font-base-regular',
            isErrorPresentAndFieldWasTouched ? 'text-skin-error' : ''
          )}
        >
          {dropZoneText}
        </span>
      </div>
    </div>
  );
}

//// utils
function createTextResponseText(filesRejected: FileRejection[]) {
  const allErrorCodes: string[] = [];
  filesRejected.forEach((fileRejected) => {
    fileRejected.errors.forEach((error) => allErrorCodes.push(error.code));
  });

  const uniqueErrorCodes = Array.from(new Set(allErrorCodes));

  const finalResult = createErrorsListInOneLineSeparatedWithVerticalLine(
    uniqueErrorCodes.map((code) => getPolishErrorNamesForDropZoneArea(code))
  );

  return finalResult;
}
