'use client';

import { deleteEvents } from '@/actions/eventsActions';
import { useModalState } from '@/context/modalState';
import { useNotificationState } from '@/context/notificationState';
import { useState } from 'react';
import CustomButton from '../CustomButton';
import ModalElementsToBeDeleted from './ModalElementsToBeDeleted';
import ModalTitle from './ModalTitle';

type Props = {
  events: { id: string; title: string }[];
};

export default function ModalDeleteEventsContent(props: Props) {
  ////vars
  const { events } = props;
  const { setHideModal } = useModalState();
  const { setShowNotification } = useNotificationState();
  const [pending, setPending] = useState(false);

  const isOnlyOneEventInArray = events.length === 1;

  ////tsx
  return (
    <div className="max-w-full prose">
      <ModalTitle
        text={`Czy na pewno chcesz usunąć ${
          isOnlyOneEventInArray ? 'wydarzenie' : 'wydarzenia'
        }?`}
      />
      <ModalElementsToBeDeleted
        nameForListingElements={
          isOnlyOneEventInArray ? 'Wydarzenie:' : 'Wydarzenia:'
        }
        elementsNamesArray={events.map((event) => event.title)}
      />

      <div className="flex flex-col tablet:flex-row justify-start items-start tablet:items-center gap-4 tablet:gap-8 mt-[25px]">
        <div>
          <CustomButton
            text={
              pending
                ? 'usuwanie ...'
                : isOnlyOneEventInArray
                ? 'usuń wydarzenie'
                : 'usuń wydarzenia'
            }
            descriptionText="Usuń zajęcia."
            disabled={pending}
            actionFn={async () => {
              setPending(true);
              const dataResponse = await deleteEvents(
                events.map((event) => event.id)
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
