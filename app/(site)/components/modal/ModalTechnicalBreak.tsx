'use client';

import { useModalState } from '@/context/modalState';
import ModalTitle from './ModalTitle';

// type Props = {
//   cyclicalActivities: { id: string; name: string }[];
// };

export default function ModalTechnicalBreak() {
  ////vars
  const { setHideModal } = useModalState();

  ////tsx
  return (
    <div className="max-w-full prose">
      <ModalTitle text="Przerwa techniczna" />

      <div>
        <p>Trwają prace konserwacyjne, strona niedługo znów będzie dostępna.</p>

        <p>
          Pozdrawiamy,
          <br />
          Zespół Art CK
        </p>
      </div>

      {/* <div className="flex flex-col tablet:flex-row justify-start items-start tablet:items-center gap-4 tablet:gap-8 mt-[25px]">
        <div>
          <CustomButton
            text="jestem świadom - przejdź dalej"
            descriptionText="Jestem świadom - przejdź dalej."
            disabled={false}
            actionFn={() => setHideModal()}
            outlined={true}
          />
        </div>
      </div> */}
    </div>
  );
}
