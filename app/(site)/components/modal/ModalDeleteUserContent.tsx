'use client';

import { deleteUsers } from '@/actions/userActions';
import { useModalState } from '@/context/modalState';
import { useNotificationState } from '@/context/notificationState';
import { useState } from 'react';
import CustomButton from '../CustomButton';
import ModalElementsToBeDeleted from './ModalElementsToBeDeleted';
import ModalTitle from './ModalTitle';

type Props = {
  users: { id: string; name: string }[];
};

export default function ModalDeleteUserContent(props: Props) {
  ////vars
  const { users } = props;
  const { setHideModal } = useModalState();
  const { setShowNotification } = useNotificationState();
  const [pending, setPending] = useState(false);

  const isOnlyOneEmailInArray = users.length === 1;

  ////tsx
  return (
    <div className="max-w-full prose">
      <ModalTitle
        text={`Czy na pewno chcesz usunąć ${
          isOnlyOneEmailInArray ? 'użytkownika' : 'użytkowników'
        }?`}
      />
      <ModalElementsToBeDeleted
        nameForListingElements={
          isOnlyOneEmailInArray ? 'Użytkownik:' : 'Użytkownicy:'
        }
        elementsNamesArray={users.map((user) => user.name)}
      />

      <div className="flex flex-col tablet:flex-row justify-start items-start tablet:items-center gap-4 tablet:gap-8 mt-[25px]">
        <div>
          <CustomButton
            text={
              pending
                ? 'usuwanie ...'
                : isOnlyOneEmailInArray
                ? 'usuń użytkownika'
                : 'usuń użytkowników'
            }
            descriptionText="Usuń użytkowników."
            disabled={pending}
            actionFn={async () => {
              setPending(true);
              const dataResponse = await deleteUsers(
                users.map((user) => user.id)
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
            descriptionText="Usuń e-mail."
            disabled={pending}
            actionFn={() => setHideModal()}
            outlined={true}
          />
        </div>
      </div>
    </div>
  );
}
