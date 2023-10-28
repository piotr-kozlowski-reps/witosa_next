import ImageAltComment from '@/app/(admin)/dashboard/components/form_comments/ImageAltComment';
import { TFileWithPreview, TImagePreviewTypeKey } from '@/types';
import clsx from 'clsx';
import { FormikProps } from 'formik';
import CopyImageFromImagesArray from './CopyImageFromImagesArray';
import { DropImageFormik } from './DropImageFormik';
import ImagePreviewForNews from './ImagePreviewForNews';
import ImagePreviewForThreeDisplaysPreview from './ImagePreviewForThreeDisplaysPreview';
import InputFormik from './InputFormik';

type Props<T> =
  | {
      imageFieldName: string;
      altFieldName: string;
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
      formik: FormikProps<T>;
      isCurrentFormToPUTData: string;
      isCommentPopupVisible?: true;
      commentContent?: React.ReactNode;
      imagePreviewType: TImagePreviewTypeKey;
      isToHaveCopyFromImagesButton?: boolean;
    };

export default function OneImageInputAndAlt<T>(props: Props<T>) {
  ////vars
  const {
    altFieldName,
    imageFieldName,
    formik,
    isCurrentFormToPUTData,
    commentContent,
    imagePreviewType,
    isToHaveCopyFromImagesButton = false,
  } = props;

  const imageGotFromFormik = formik.getFieldMeta(imageFieldName).value;

  let image: TFileWithPreview | string = '';
  if (imageGotFromFormik) {
    image = imageGotFromFormik as unknown as TFileWithPreview | string;
  }

  ////tsx
  return (
    <div className="relative flex flex-col items-center justify-start mb-[28px]">
      <div className="mt-[27px] w-full">
        <DropImageFormik<T>
          file={image}
          formik={formik}
          name={imageFieldName}
          isCommentPopupVisible={true}
          commentContent={commentContent}
        />
      </div>

      <div className="mt-[20px] ml-[32px] form-input-width self-start ">
        <InputFormik<T>
          name={altFieldName}
          type="text"
          label={
            isCurrentFormToPUTData
              ? 'zmień opis obrazka (WCAG):'
              : 'opis obrazka (WCAG):'
          }
          placeholder="opis obrazka"
          formik={formik}
          isCommentPopupVisible={true}
          commentContent={<ImageAltComment />}
        />
      </div>

      {isToHaveCopyFromImagesButton ? (
        <div className="pl-8 mt-[37px] self-start">
          <CopyImageFromImagesArray<T> formik={formik} />
        </div>
      ) : null}

      {imagePreviewType === 'NEWS_IMAGE_PREVIEW' ? (
        <div className="pl-8 mt-[40px] self-start">
          <ImagePreviewForNews image={image} />
        </div>
      ) : null}
      {imagePreviewType === 'THREE_DISPLAYS_PREVIEW' ? (
        <div
          className={clsx(
            'pl-8  self-start flex justify-start items-center gap-8',
            isToHaveCopyFromImagesButton ? 'mt-[26px]' : 'mt-[40px]'
          )}
        >
          <ImagePreviewForThreeDisplaysPreview image={image} />
        </div>
      ) : null}
    </div>
  );
}
