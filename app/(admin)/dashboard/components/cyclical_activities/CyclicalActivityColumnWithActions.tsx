'use client';

import { getCyclicalActivity } from '@/actions/cyclicalActivityActions';
import {
  rewriteUrlsIntoFileAsStringObjectToBeProperlyValidated,
  sortImagesObjectsByIndexInCyclicalActivity,
} from '@/actions/syncActionHelpers';
import CloseIcon from '@/app/(site)/components/icons/CloseIcon';
import EditIcon from '@/app/(site)/components/icons/EditIcon';
import ModalDeleteCyclicalActivitiesContent from '@/app/(site)/components/modal/ModalDeleteCyclicalActivitiesContent';
import { useCyclicalActivitiesState } from '@/context/cyclicalActivityState';
import { useModalState } from '@/context/modalState';
import { useNotificationState } from '@/context/notificationState';
import { TCyclicalActivityWithImageAndOccurrence } from '@/types';
import { CyclicalActivity, ImageCyclicalActivity } from '@prisma/client';

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

  async function editCyclicalActivityHandler(id: string) {
    const existingCyclicalActivity = await getCyclicalActivity(id);

    if (
      existingCyclicalActivity.status === 'SUCCESS' &&
      typeof existingCyclicalActivity.response === 'object'
    ) {
      const cyclicalActivityWithRewrittenUrlIntoFileProperty =
        rewriteUrlsIntoFileAsStringObjectToBeProperlyValidated<
          TCyclicalActivityWithImageAndOccurrence,
          ImageCyclicalActivity
        >(existingCyclicalActivity.response);

      const cyclicalActivityWithRewrittenUrlIntoFilePropertyAndSortedImagesByIndex: TCyclicalActivityWithImageAndOccurrence =
        await sortImagesObjectsByIndexInCyclicalActivity(
          cyclicalActivityWithRewrittenUrlIntoFileProperty
        );

      setCyclicalActivityFormikDataForPUT(
        cyclicalActivityWithRewrittenUrlIntoFilePropertyAndSortedImagesByIndex
      );
      setIsAddCyclicalActivityVisible(true);
      return;
    }

    setShowNotification('ERROR', 'Nie znaleziono zajęć.');
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
