'use client';

import { deleteNewsletterAddresses } from '@/actions/newsletterActions';
import { useModalState } from '@/context/modalState';
import { useNotificationState } from '@/context/notificationState';
import { useState } from 'react';
import CustomButton from '../CustomButton';
import ModalElementsToBeDeleted from './ModalElementsToBeDeleted';
import ModalTitle from './ModalTitle';

type Props = {
  newsletterEmails: string[];
};

export default function ModalDeleteNewsletterContent(props: Props) {
  ////vars
  const { newsletterEmails } = props;
  const { setHideModal } = useModalState();
  const { setShowNotification } = useNotificationState();
  const [pending, setPending] = useState(false);

  const isOnlyOneEmailInArray = newsletterEmails.length === 1;

  ////tsx
  return (
    <div className="max-w-full prose">
      <ModalTitle
        text={`Czy na pewno chcesz usunąć ${
          isOnlyOneEmailInArray ? 'e-mail' : 'e-maile'
        }?`}
      />
      <ModalElementsToBeDeleted
        nameForListingElements={isOnlyOneEmailInArray ? 'E-mail:' : 'E-maile:'}
        elementsNamesArray={newsletterEmails}
      />

      <div className="flex flex-col tablet:flex-row justify-start items-start tablet:items-center gap-4 tablet:gap-8 mt-[25px]">
        <div>
          <CustomButton
            text={
              pending
                ? 'usuwanie ...'
                : isOnlyOneEmailInArray
                ? 'usuń e-mail'
                : 'usuń e-maile'
            }
            descriptionText="Usuń e-maile."
            disabled={pending}
            actionFn={async () => {
              setPending(true);
              const dataResponse = await deleteNewsletterAddresses(
                newsletterEmails
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
