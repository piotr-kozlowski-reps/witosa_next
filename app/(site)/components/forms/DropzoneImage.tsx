import {
  createErrorsListInOneLineSeparatedWithVerticalLine,
  getPolishErrorNamesForDropZoneArea,
} from '@/lib/textHelpers';
import { TFileWithPreview } from '@/types';
import clsx from 'clsx';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';

type Props = {
  url: string;
  file: TFileWithPreview;
  setFile: Dispatch<SetStateAction<TFileWithPreview>>;
};

export default function DropzoneImage(props: Props) {
  ////vars
  const { url, file, setFile } = props;

  const [filesRejected, setFilesRejected] = useState<FileRejection[]>([]);
  const [dropZoneText, setDropZoneText] = useState('');

  //drop zone
  const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (acceptedFiles?.length && acceptedFiles[0]) {
      const currentFile = acceptedFiles[0];
      setFile(
        Object.assign(currentFile, {
          preview: URL.createObjectURL(currentFile),
        })
      );
    }
    if (rejectedFiles.length) {
      setFilesRejected(rejectedFiles);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
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

    if (!isDragActive && !file) {
      setDropZoneText('przenieś obrazek na to pole lub kliknij');
      return;
    }

    if (!isDragActive && file) {
      setDropZoneText(file.name);
      return;
    }

    return () => {
      clearTimeout(timer);
    };
  }, [filesRejected, isDragActive, file]);

  ////tsx
  return (
    <div
      {...getRootProps({
        className: clsx(
          'flex-grow h-16 ml-8 w-max base-container-look',
          file && !isDragActive
            ? 'diagonal-lines-fill-secondary'
            : 'diagonal-lines-fill',
          isDragActive ? 'diagonal-lines-fill' : ''
        ),
      })}
    >
      <input {...getInputProps()} />
      <div className="flex items-center justify-center h-full mx-auto w-96">
        <span className=" text-background font-base-regular">
          {dropZoneText}
        </span>
      </div>
    </div>
  );
}

//// utils
function createTextResponseText(filesRejected: FileRejection[]) {
  // const allErrorCodes = filesRejected[0].errors.map((error) => {
  //   return error.code;
  // });
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
