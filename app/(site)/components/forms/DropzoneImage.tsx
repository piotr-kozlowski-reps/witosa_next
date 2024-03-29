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

  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  useEffect(() => {
    if (mainImageFile && preview) {
      formik.setFieldValue(
        name,
        Object.assign(mainImageFile, { preview: preview })
      );
    }
  }, [mainImageFile, preview]);

  ////formik
  const currentValue = formik.getFieldMeta(name).value as TFileWithPreview;

  //drop zone
  const [filesRejected, setFilesRejected] = useState<FileRejection[]>([]);
  const [dropZoneText, setDropZoneText] = useState('');
  const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (acceptedFiles?.length && acceptedFiles[0]) {
      const currentFile = acceptedFiles[0];

      /** main image file */
      setMainImageFile(currentFile);

      /** prev of image file */
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreview(fileReader.result);
      };
      fileReader.readAsDataURL(currentFile);
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
      maxSize: 2048 * 1000,
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
      const responseTextToErrors = createResponseText(filesRejected);
      setDropZoneText(responseTextToErrors);
      clearErrorDropZOneText();
      return;
    }

    if (!isDragActive && !currentValue) {
      setDropZoneText('przenieś obrazek na to pole lub kliknij');
      return;
    }

    if (!isDragActive && currentValue) {
      setDropZoneText(
        typeof currentValue === 'string' ? currentValue : currentValue.name
      );
      return;
    }

    return () => {
      clearTimeout(timer);
    };
  }, [filesRejected, isDragActive, currentValue]);

  useEffect(() => {
    const isFieldTouched = formik.getFieldMeta(name).touched;

    if ((isFileDialogActive || isDragActive) && !isFieldTouched) {
      formik.getFieldHelpers(name).setTouched(true);
    }
  }, [isFileDialogActive, isDragActive]);

  ////tsx
  return (
    <div
      {...getRootProps({
        className: clsx(
          'flex-grow h-16 ml-8 w-auto base-container-look hover:diagonal-lines-fill cursor-pointer',
          currentValue && !isDragActive
            ? 'diagonal-lines-fill-secondary'
            : 'diagonal-lines-fill-gray',
          isErrorPresentAndFieldWasTouched && !isDragActive
            ? 'diagonal-lines-fill-error'
            : '',
          isDragActive ? 'diagonal-lines-fill' : ''
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
function createResponseText(filesRejected: FileRejection[]) {
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
