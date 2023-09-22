'use client';

import CloseIcon from '@/app/(site)/components/icons/CloseIcon';
import ModalDeleteCyclicalActivitiesContent from '@/app/(site)/components/modal/ModalDeleteCyclicalActivitiesContent';
import { useModalState } from '@/context/modalState';
import { useNavigationState } from '@/context/navigationState';
import { useNotificationState } from '@/context/notificationState';
import { CyclicalActivity } from '@prisma/client';

type Props = {
  cyclicalActivity: CyclicalActivity;
};

export default function CyclicalActivityColumnWithActions(props: Props) {
  ////vars
  const { cyclicalActivity } = props;
  const { id, name } = cyclicalActivity;
  const { setShowModal } = useModalState();
  const { setShowNotification } = useNotificationState();
  const { setIsAddUserVisible, setUserFormikDataForPUT } = useNavigationState();

  ////tsx
  return (
    <div className="float-right mr-8 h-[42px] pt-[6px] flex justify-end items-center">
      {/* <div>
        <EditIcon
          actionFn={() => {
            setUserFormikDataForPUT({
              ...user,
              password: '!!!!!',
              confirmPassword: '!!!!!',
            });
            setIsAddUserVisible(true);
          }}
          alt="Edytuj email Newslettera."
        />
      </div> */}

      <div>
        <CloseIcon
          actionFn={() => {
            setShowModal(
              true,
              <ModalDeleteCyclicalActivitiesContent
                cyclicalActivities={[{ id, name }]}
              />
            );
          }}
          alt="Wykasuj użytkownika."
        />
      </div>
    </div>
  );
}
