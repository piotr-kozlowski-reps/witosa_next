import { TFileWithPreview } from '@/types';

export function useGetSrcAndAltFromFileDataDependingIfItIsAStringOrFile(
  file: TFileWithPreview | string
) {
  let src = '';
  let alt = '';
  let isFileATFileWithPreviewType = false;
  if (file && typeof file === 'string') {
    src = alt = file;
  }
  if (file && typeof file !== 'string') {
    const fileAsTFileWithPreview: TFileWithPreview = file as TFileWithPreview;
    src = fileAsTFileWithPreview!.preview;
    alt = fileAsTFileWithPreview!.name;
    isFileATFileWithPreviewType = true;
  }

  return { src, alt, isFileATFileWithPreviewType };
}
