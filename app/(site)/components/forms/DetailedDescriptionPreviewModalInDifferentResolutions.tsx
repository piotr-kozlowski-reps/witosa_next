import { useModalState } from '@/context/modalState';
import CustomButton from '../CustomButton';

type Props = {
  valueText: string;
  width: number;
  height: number;
};

export default function DetailedDescriptionPreviewModalInDifferentResolutions(
  props: Props
) {
  ////vars
  const { width, height, valueText } = props;
  const { setHideModal } = useModalState();

  ////tsx
  return (
    <div className="flex items-center justify-center w-full proper-container-classes">
      <div className="flex flex-col items-center justify-center">
        <div
          className="h-[352px] bg-gray-100 overflow-y-auto"
          style={{ width: width }}
        >
          <div className="prose ">
            <div
              dangerouslySetInnerHTML={{
                __html: valueText,
              }}
            ></div>
          </div>
        </div>
        <CustomButton
          text={'zamknij'}
          descriptionText="zamknij podgląd"
          additionalClasses="mt-4"
          disabled={false}
          actionFn={() => setHideModal()}
        />
      </div>
    </div>
  );
}
