import { useModalState } from '@/context/modalState';
import { TImageEventFormValue } from '@/types';
import { FormikProps } from 'formik';
import CustomButton from '../CustomButton';
import ImagesListingForCopying from './ImagesListingForCopying';
import ModalTitle from './ModalTitle';

type Props<T> = {
  formik: FormikProps<T>;
};

export default function ModalCopyImageFromImagesArray<T>(props: Props<T>) {
  ////vars
  const { formik } = props;
  const { setHideModal } = useModalState();
  const images = formik.getFieldProps('images').value as TImageEventFormValue[];

  const copyDataOfDesiredImageHandler = (index: number) => {
    const imageItem = images[index];

    formik.setFieldValue('sliderImageUrl', imageItem.file);
    formik.setFieldValue('sliderImageAlt', imageItem.alt);
    setHideModal();
  };

  ////tsx
  return (
    <div className="max-w-full prose">
      <ModalTitle text="Wybierz obrazek, który chcesz skopiować." />

      <div className="not-prose">
        {images.map((image, index) => (
          <ImagesListingForCopying
            key={index}
            image={image.file}
            altProvided={image.alt}
            index={index}
            actionFn={copyDataOfDesiredImageHandler}
          />
        ))}
      </div>

      <div className="mt-[31px]">
        <CustomButton
          text="odrzuć"
          descriptionText="Odrzuć."
          disabled={false}
          actionFn={() => setHideModal()}
          outlined={true}
        />
      </div>
    </div>
  );
}
