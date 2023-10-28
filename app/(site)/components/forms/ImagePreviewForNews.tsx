import { useModalState } from '@/context/modalState';
import { TFileWithPreview } from '@/types';
import CustomButton from '../CustomButton';
import ImagePreviewModalInDifferentResolutions from './ImagePreviewModalInDifferentResolutions';

type Props = {
  image: TFileWithPreview | string;
};

export default function ImagePreviewForNews(props: Props) {
  ////vars
  const { image } = props;
  const { setShowModal } = useModalState();

  ////tsx
  return (
    <CustomButton
      text={'podgląd obrazka'}
      descriptionText="podgląd obrazka"
      additionalClasses="mt-[4px]"
      disabled={!image}
      outlined={true}
      actionFn={() => {
        setShowModal(
          true,
          <ImagePreviewModalInDifferentResolutions
            image={image}
            width={271}
            height={271}
            isToBeRoundedFull={true}
          />
        );
      }}
    />
  );
}
