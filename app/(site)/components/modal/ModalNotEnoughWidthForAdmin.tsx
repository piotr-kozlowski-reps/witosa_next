'use client';

import { useModalState } from '@/context/modalState';
import CustomButton from '../CustomButton';
import ModalTitle from './ModalTitle';

// type Props = {
//   cyclicalActivities: { id: string; name: string }[];
// };

export default function ModalNotEnoughWidthForAdmin() {
  ////vars
  const { setHideModal } = useModalState();

  ////tsx
  return (
    <div className="max-w-full prose">
      <ModalTitle text="Mamy problem :-(" />

      <div>
        <p>
          By w pełni wykorzystać część administracyjną, szerokość ekranu powinna
          być większa. <br /> Zalecana szerokość: <b>1140 pikseli w poziomie</b>
          .
        </p>
        <p>
          W innym przypadku część elementów może być niewidoczna w całości bądź
          stać się nieczytelna.
        </p>
      </div>

      <div className="flex flex-col tablet:flex-row justify-start items-start tablet:items-center gap-4 tablet:gap-8 mt-[25px]">
        <div>
          <CustomButton
            text="jestem świadom - przejdź dalej"
            descriptionText="Jestem świadom - przejdź dalej."
            disabled={false}
            actionFn={() => setHideModal()}
            outlined={true}
          />
        </div>
      </div>
    </div>
  );
}
