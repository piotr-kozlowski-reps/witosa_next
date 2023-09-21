'use client';

import CloseIcon from '@/app/(site)/components/icons/CloseIcon';
import EditIcon from '@/app/(site)/components/icons/EditIcon';
import ModalDeleteUserContent from '@/app/(site)/components/modal/ModalDeleteUserContent';
import { useModalState } from '@/context/modalState';
import { useNavigationState } from '@/context/navigationState';
import { useNotificationState } from '@/context/notificationState';
import { TUserPicked } from '@/types';

type Props = {
  user: TUserPicked;
};

export default function UserColumnWithActions(props: Props) {
  ////vars
  const { user } = props;
  const { id, name } = user;
  const { setShowModal } = useModalState();
  const { setShowNotification } = useNotificationState();
  const { setIsAddNewsletterVisible, setUserFormikDataForPUT } =
    useNavigationState();

  ////tsx
  return (
    <div className="float-right mr-8 h-[42px] pt-[6px] flex justify-end items-center">
      <div>
        <EditIcon
          actionFn={() => {
            setUserFormikDataForPUT({
              ...user,
              password: '',
              confirmPassword: '',
            });
            setIsAddNewsletterVisible(true);
          }}
          alt="Edytuj email Newslettera."
        />
      </div>

      <div>
        <CloseIcon
          actionFn={() => {
            setShowModal(
              true,
              <ModalDeleteUserContent users={[{ id, name }]} />
            );
          }}
          alt="Wykasuj użytkownika."
        />
      </div>
    </div>
  );
}
