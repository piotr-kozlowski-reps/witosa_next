'use client';

// import { deleteCyclicalActivities } from '@/actions/cyclicalActivityActions';
import { useModalState } from '@/context/modalState';
import { useNotificationState } from '@/context/notificationState';
import { useState } from 'react';
import ModalTitle from './ModalTitle';
import CustomButton from '../CustomButton';
import { deleteArtisticGroups } from '@/actions/artisticGroupsActions';
import ModalElementsToBeDeleted from './ModalElementsToBeDeleted';
// import CustomButton from '../CustomButton';
// import ModalElementsToBeDeleted from './ModalElementsToBeDeleted';
// import ModalTitle from './ModalTitle';

type Props = {
  artisticGroup: { id: string; title: string }[];
};

export default function ModalDeleteArtisticGroupContent(props: Props) {
  ////vars
  const { artisticGroup } = props;
  const { setHideModal } = useModalState();
  const { setShowNotification } = useNotificationState();
  const [pending, setPending] = useState(false);

  const isOnlyOneArtisticGroupInArray = artisticGroup.length === 1;

  ////tsx
  return (
    <div className="max-w-full prose">
      <ModalTitle
        text={`Czy na pewno chcesz usunąć ${
          isOnlyOneArtisticGroupInArray
            ? 'grupę artystyczną'
            : 'grupy artystyczne'
        }?`}
      />
      <ModalElementsToBeDeleted
        nameForListingElements={
          isOnlyOneArtisticGroupInArray
            ? 'Grupa artystyczna:'
            : 'Grupy artystyczne:'
        }
        elementsNamesArray={artisticGroup.map((gr) => gr.title)}
      />

      <div className="flex flex-col tablet:flex-row justify-start items-start tablet:items-center gap-4 tablet:gap-8 mt-[25px]">
        <div>
          <CustomButton
            text={
              pending
                ? 'usuwanie ...'
                : isOnlyOneArtisticGroupInArray
                  ? 'usuń grupę artystyczną'
                  : 'usuń grupy artystyczne'
            }
            descriptionText="Usuń grupę artystyczną."
            disabled={pending}
            actionFn={async () => {
              setPending(true);
              const dataResponse = await deleteArtisticGroups(
                artisticGroup.map((gr) => gr.id)
              );

              if (dataResponse.status === 'ERROR') {
                setShowNotification('ERROR', dataResponse.response);
                setHideModal();
                setPending(false);
                return;
              }
              setShowNotification('SUCCESS', dataResponse.response);
              setHideModal();
              setPending(false);
            }}
          />
        </div>
        <div className="prose">
          <h3>albo</h3>
        </div>
        <div>
          <CustomButton
            text="odrzuć"
            descriptionText="Odrzuć."
            disabled={pending}
            actionFn={() => setHideModal()}
            outlined={true}
          />
        </div>
      </div>
    </div>
  );
}
