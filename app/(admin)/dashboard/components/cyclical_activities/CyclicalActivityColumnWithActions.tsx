'use client';

import { getCyclicalActivity } from '@/actions/cyclicalActivityActions';
import CloseIcon from '@/app/(site)/components/icons/CloseIcon';
import EditIcon from '@/app/(site)/components/icons/EditIcon';
import ModalDeleteCyclicalActivitiesContent from '@/app/(site)/components/modal/ModalDeleteCyclicalActivitiesContent';
import { useCyclicalActivitiesState } from '@/context/cyclicalActivityState';
import { useModalState } from '@/context/modalState';
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
  const {
    setIsAddCyclicalActivityVisible,
    setCyclicalActivityFormikDataForPUT,
  } = useCyclicalActivitiesState();

  // function mapCyclicalActivityIntoFormik(
  //   cyclicalActivity: TCyclicalActivityWithImageAndOccurrence
  // ): TCyclicalActivityWithImageAndOccurrence {
  //   return {
  //     id: cyclicalActivity.id,
  //   };
  // }

  async function editCyclicalActivityHandler(id: string) {
    const existingCyclicalActivity = await getCyclicalActivity(id);
    console.log({ existingCyclicalActivity });

    // if(existingCyclicalActivity && )

    //     const mappedGotCyclicalActivity: TCyclicalActivityFormInputs =
    //       mapCyclicalActivityIntoFormik(existingCyclicalActivity.response);

    //     setCyclicalActivityFormikDataForPUT(existingCyclicalActivity);
    //     setIsAddCyclicalActivityVisible(true);
  }

  ////tsx
  return (
    <div className="float-right mr-8 h-[42px] pt-[6px] flex justify-end items-center">
      <div>
        <EditIcon
          actionFn={() => {
            editCyclicalActivityHandler(id);
          }}
          alt="Edytuj zajęcia."
        />
      </div>

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
