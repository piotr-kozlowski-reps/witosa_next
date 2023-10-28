import { useModalState } from '@/context/modalState';
import { TFileWithPreview } from '@/types';
import { Fragment } from 'react';
import CustomButton from '../CustomButton';
import ImagePreviewModalInDifferentResolutions from './ImagePreviewModalInDifferentResolutions';

type Props = {
  image: TFileWithPreview | string;
};

export default function ImagePreviewForThreeDisplaysPreview(props: Props) {
  ////vars
  const { image } = props;
  const { setShowModal } = useModalState();

  ////tsx
  return (
    <Fragment>
      <CustomButton
        text={'podgląd komórka'}
        descriptionText="podgląd komórka"
        additionalClasses="mt-[4px]"
        disabled={!image}
        outlined={true}
        actionFn={() => {
          setShowModal(
            true,
            <ImagePreviewModalInDifferentResolutions
              image={image}
              width={244}
              height={352}
              isToBeRoundedFull={false}
            />
          );
        }}
      />
      <CustomButton
        text={'podgląd tablet'}
        descriptionText="podgląd tablet"
        additionalClasses="mt-[4px]"
        disabled={!image}
        outlined={true}
        actionFn={() => {
          setShowModal(
            true,
            <ImagePreviewModalInDifferentResolutions
              image={image}
              width={749}
              height={352}
              isToBeRoundedFull={false}
            />
          );
        }}
      />
      <CustomButton
        text={'podgląd komputer'}
        descriptionText="podgląd komputer"
        additionalClasses="mt-[4px]"
        disabled={!image}
        outlined={true}
        actionFn={() => {
          setShowModal(
            true,
            <ImagePreviewModalInDifferentResolutions
              image={image}
              width={1140}
              height={352}
              isToBeRoundedFull={false}
            />
          );
        }}
      />
    </Fragment>
    // </div>
  );
}
