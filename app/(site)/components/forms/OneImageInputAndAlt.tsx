import ImageAltComment from '@/app/(admin)/dashboard/components/form_comments/ImageAltComment';
import { useModalState } from '@/context/modalState';
import { useGetSrcAndAltFromFileDataDependingIfItIsAStringOrFile } from '@/hooks/useGetSrcAndAltFromFileDataDependingIfItIsAStringOrFile';
import { TFileWithPreview } from '@/types';
import { FormikProps } from 'formik';
import Image from 'next/image';
import CustomButton from '../CustomButton';
import { DropImageFormik } from './DropImageFormik';
import InputFormik from './InputFormik';

type Props<T> =
  | {
      imageFieldName: string;
      altFieldName: string;
      formik: FormikProps<T>;
      isCurrentFormToPUTData: string;
      isCommentPopupVisible?: false;
      commentContent?: never;
    }
  | {
      imageFieldName: string;
      altFieldName: string;
      formik: FormikProps<T>;
      isCurrentFormToPUTData: string;
      isCommentPopupVisible?: true;
      commentContent?: React.ReactNode;
    };

export default function OneImageInputAndAlt<T>(props: Props<T>) {
  ////vars
  const {
    altFieldName,
    imageFieldName,
    formik,
    isCurrentFormToPUTData,
    isCommentPopupVisible,
    commentContent,
  } = props;
  const { setShowModal, setHideModal } = useModalState();
  const imageGotFromFormik = formik.getFieldMeta(imageFieldName).value;

  let image: TFileWithPreview | string = '';
  if (imageGotFromFormik) {
    image = imageGotFromFormik as unknown as TFileWithPreview | string;
  }

  const { src, alt } =
    useGetSrcAndAltFromFileDataDependingIfItIsAStringOrFile(image);

  function prevImageInDifferentResolutions(width: number) {
    return (
      <div className="flex items-center justify-center w-full">
        {image ? (
          <div className="flex flex-col items-center justify-center">
            <div className="h-[352px]" style={{ width: width }}>
              <Image
                src={src}
                width={271}
                height={271}
                alt={alt}
                className="w-[271px] h-[271px] rounded-full"
              />
            </div>
            <CustomButton
              text={'zamknij'}
              descriptionText="zamknij podgląd"
              additionalClasses="mt-4"
              disabled={false}
              actionFn={() => setHideModal()}
            />
          </div>
        ) : null}
      </div>
    );
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

      <div className="pl-8 mt-[40px] self-start">
        <CustomButton
          text={'podgląd obrazka'}
          descriptionText="podgląd obrazka"
          additionalClasses="mt-[4px]"
          disabled={!image}
          outlined={true}
          actionFn={() => {
            setShowModal(true, prevImageInDifferentResolutions(271));
          }}
        />
      </div>
    </div>
  );
}
