import { TFileWithPreview } from '@/types';

export function useGetSrcAndAltFromFileDataDependingIfItIsAStringOrFile(
  fileOrURLString: TFileWithPreview | string
) {
  let src = '';
  let alt = '';
  let isFileATFileWithPreviewType = false;

  if (
    fileOrURLString &&
    typeof fileOrURLString === 'string' &&
    fileOrURLString !== ''
  ) {
    alt = fileOrURLString;
    src = `${process.env.NEXT_PUBLIC_BASE_URL}${fileOrURLString}`;
  }
  if (fileOrURLString && typeof fileOrURLString !== 'string') {
    const fileAsTFileWithPreview: TFileWithPreview =
      fileOrURLString as TFileWithPreview;
    src = fileAsTFileWithPreview!.preview;
    alt = fileAsTFileWithPreview!.name;
    isFileATFileWithPreviewType = true;
  }

  return { src, alt, isFileATFileWithPreviewType };
}
