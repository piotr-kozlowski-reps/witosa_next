import AdditionalDescriptionComment from '@/app/(admin)/dashboard/components/form_comments/AdditionalDescriptionComment';
import ImageAltComment from '@/app/(admin)/dashboard/components/form_comments/ImageAltComment';
import { TImageCyclicalActivityFormValues } from '@/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FormikProps } from 'formik';
import CustomButton from '../CustomButton';
import CloseIcon from '../icons/CloseIcon';
import { DropImageFormik } from './DropImageFormik';
import InputFormik from './InputFormik';
import TextareaFormik from './TextareaFormik';

type Props<T> = {
  imageProps: TImageCyclicalActivityFormValues;
  // imageProps: TImageCyclicalActivityFormValues & {
  //   id: number | string;
  //   file: TFileWithPreview;
  // };
  index: number;
  formik: FormikProps<T>;
  isCurrentFormToPUTData: string;
  name: string;
};

export default function ImageInputFormik<T>(props: Props<T>) {
  ////vars
  const { imageProps, index, formik, isCurrentFormToPUTData } = props;
  const { file } = imageProps;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: imageProps.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="mx-8 mb-4 base-container-look"
    >
      <div className="relative flex flex-col items-center justify-start mb-[28px]">
        <div className="absolute right-0 -top-[16px] z-60">
          <CloseIcon
            alt="Zamknij mobilne menu."
            actionFn={() => alert('close icon no implemented')}
          />
        </div>

        <div className="mt-[27px] w-full">
          <DropImageFormik<T>
            index={index}
            file={file}
            formik={formik}
            name={`images.${index}.file`}
          />
        </div>

        <div className="mt-[20px] ml-[76px] form-input-width self-start ">
          <InputFormik<T>
            name={`images.${index}.alt`}
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

        <div className="mt-[20px] pl-[76px] self-start w-full flex justify-start items-center">
          <TextareaFormik<T>
            name={`images.${index}.additionInfoThatMustBeDisplayed`}
            label={
              isCurrentFormToPUTData
                ? 'zmień opcjonalne informacje dodatkowe:'
                : 'opcjonalne informacje dodatkowe:'
            }
            placeholder="dodaj opcjonalne informacje dodatkowe..."
            formik={formik}
            height={70}
            isCommentPopupVisible={true}
            commentContent={<AdditionalDescriptionComment />}
            isShowCommentToTheLeft={true}
          />
          <div className="w-8"></div>
        </div>

        <div className="pl-[76px] mt-[40px] self-start flex justify-start items-center gap-8">
          <CustomButton
            text={'podgląd komórka'}
            descriptionText="podgląd komórka"
            additionalClasses="mt-[4px]"
            disabled={false}
            outlined={true}
            actionFn={() => {
              alert('podgląd komórka - not implemented');
            }}
          />
          <CustomButton
            text={'podgląd tablet'}
            descriptionText="podgląd tablet"
            additionalClasses="mt-[4px]"
            disabled={false}
            outlined={true}
            actionFn={() => {
              alert('podgląd tablet - not implemented');
            }}
          />
          <CustomButton
            text={'podgląd komputer'}
            descriptionText="podgląd komputer"
            additionalClasses="mt-[4px]"
            disabled={false}
            outlined={true}
            actionFn={() => {
              alert('podgląd komputer - not implemented');
            }}
          />
        </div>
      </div>
    </div>
  );
}
