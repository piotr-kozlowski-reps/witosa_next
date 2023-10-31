import { useModalState } from '@/context/modalState';
import { useGetSrcAndAltFromFileDataDependingIfItIsAStringOrFile } from '@/hooks/useGetSrcAndAltFromFileDataDependingIfItIsAStringOrFile';
import { TFileWithPreview } from '@/types';
import clsx from 'clsx';
import Image from 'next/image';
import CustomButton from '../CustomButton';

type Props = {
  image: TFileWithPreview | string;
  width: number;
  height: number;
  isToBeRoundedFull: boolean;
};

export default function ImagePreviewModalInDifferentResolutions(props: Props) {
  ////vars
  const { image, width, height, isToBeRoundedFull } = props;
  const { src, alt } =
    useGetSrcAndAltFromFileDataDependingIfItIsAStringOrFile(image);
  const { setHideModal } = useModalState();

  return (
    <div className="flex items-center justify-center w-full">
      {image ? (
        <div className="flex flex-col items-center justify-center">
          <div className="h-[352px]" style={{ width: width }}>
            <Image
              unoptimized={true}
              src={src}
              width={1140}
              height={1000}
              alt={alt}
              style={{ width: width, height: height }}
              className={clsx(
                isToBeRoundedFull
                  ? 'rounded-full'
                  : 'object-cover object-center w-full h-full'
              )}
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
