import { useModalState } from '@/context/modalState';
import { Fragment } from 'react';
import CustomButton from '../CustomButton';
import DetailedDescriptionPreviewModalInDifferentResolutions from './DetailedDescriptionPreviewModalInDifferentResolutions';

type Props = {
  valueText: string;
};

export default function DetailedDescriptionForThreeDisplaysPreview(
  props: Props
) {
  ////vars
  const { valueText } = props;
  const { setShowModal } = useModalState();

  return (
    <Fragment>
      <CustomButton
        text={'podgląd komórka'}
        descriptionText="podgląd komórka"
        additionalClasses="mt-[4px]"
        disabled={false}
        outlined={true}
        actionFn={() => {
          setShowModal(
            true,
            <DetailedDescriptionPreviewModalInDifferentResolutions
              width={244}
              height={352}
              valueText={valueText}
            />
          );
        }}
      />
      <CustomButton
        text={'podgląd tablet'}
        descriptionText="podgląd tablet"
        additionalClasses="mt-[4px]"
        disabled={false}
        outlined={true}
        actionFn={() => {
          setShowModal(
            true,
            <DetailedDescriptionPreviewModalInDifferentResolutions
              width={749}
              height={352}
              valueText={valueText}
            />
          );
        }}
      />
      <CustomButton
        text={'podgląd komputer'}
        descriptionText="podgląd komputer"
        additionalClasses="mt-[4px]"
        disabled={false}
        outlined={true}
        actionFn={() => {
          setShowModal(
            true,
            <DetailedDescriptionPreviewModalInDifferentResolutions
              width={1140}
              height={352}
              valueText={valueText}
            />
            // <ImagePreviewModalInDifferentResolutions
            //   image={image}
            //   width={1140}
            //   height={352}
            //   isToBeRoundedFull={false}
            // />
          );
        }}
      />
    </Fragment>
  );
}
