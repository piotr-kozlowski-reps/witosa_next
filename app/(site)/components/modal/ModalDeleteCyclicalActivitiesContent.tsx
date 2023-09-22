'use client';

import { deleteCyclicalActivities } from '@/actions/cyclicalActivityActions';
import { useModalState } from '@/context/modalState';
import { useNotificationState } from '@/context/notificationState';
import { useState } from 'react';
import CustomButton from '../CustomButton';
import ModalElementsToBeDeleted from './ModalElementsToBeDeleted';
import ModalTitle from './ModalTitle';

type Props = {
  cyclicalActivities: { id: string; name: string }[];
};

export default function ModalDeleteCyclicalActivitiesContent(props: Props) {
  ////vars
  const { cyclicalActivities } = props;
  const { setHideModal } = useModalState();
  const { setShowNotification } = useNotificationState();
  const [pending, setPending] = useState(false);

  const isOnlyOneEmailInArray = cyclicalActivities.length === 1;

  ////tsx
  return (
    <div className="max-w-full prose">
      <ModalTitle
        text={`Czy na pewno chcesz usunąć ${
          isOnlyOneEmailInArray ? 'zajęcia' : 'zajęcia'
        }?`}
      />
      <ModalElementsToBeDeleted
        nameForListingElements={isOnlyOneEmailInArray ? 'Zajęcia:' : 'Zajęcia:'}
        elementsNamesArray={cyclicalActivities.map((activity) => activity.name)}
      />

      <div className="flex flex-col tablet:flex-row justify-start items-start tablet:items-center gap-4 tablet:gap-8 mt-[25px]">
        <div>
          <CustomButton
            text={
              pending
                ? 'usuwanie ...'
                : isOnlyOneEmailInArray
                ? 'usuń zajęcia'
                : 'usuń zajęcia'
            }
            descriptionText="Usuń zajęcia."
            disabled={pending}
            actionFn={async () => {
              setPending(true);
              const dataResponse = await deleteCyclicalActivities(
                cyclicalActivities.map((activity) => activity.id)
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
