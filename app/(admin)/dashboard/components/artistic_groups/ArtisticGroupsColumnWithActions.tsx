'use client';

import { getArtisticGroup } from '@/actions/artisticGroupsActions';
import { getCyclicalActivity } from '@/actions/cyclicalActivityActions';
import {
  rewriteUrlsIntoFileAsStringObjectToBeProperlyValidated,
  sortImagesObjectsByIndexInArtisticGroups,
  sortImagesObjectsByIndexInCyclicalActivity,
} from '@/actions/syncActionHelpers';
import CloseIcon from '@/app/(site)/components/icons/CloseIcon';
import EditIcon from '@/app/(site)/components/icons/EditIcon';
import ModalDeleteArtisticGroupContent from '@/app/(site)/components/modal/ModalDeleteArtisticGroupContent';
import ModalDeleteCyclicalActivitiesContent from '@/app/(site)/components/modal/ModalDeleteCyclicalActivitiesContent';
import { useCyclicalActivitiesState } from '@/context/cyclicalActivityState';
import { useModalState } from '@/context/modalState';
import { useNotificationState } from '@/context/notificationState';
import { useDashboardArtisticGroupsStore } from '@/context/useDashboardArtisticGroupsStore';
import {
  TArtisticGroupWithImages,
  TCyclicalActivityWithImageAndOccurrence,
} from '@/types';
import {
  ArtisticGroup,
  CyclicalActivity,
  ImageArtisticGroup,
  ImageCyclicalActivity,
} from '@prisma/client';

type Props = {
  artisticGroup: ArtisticGroup;
};

export default function ArtisticGroupsColumnWithActions(props: Props) {
  ////vars
  const { artisticGroup } = props;
  const { id, title } = artisticGroup;
  const { setShowModal } = useModalState();
  const { setShowNotification } = useNotificationState();
  const { setIsAddArtisticGroupVisible, setArtisticGroupFormikDataForPUT } =
    useDashboardArtisticGroupsStore();

  async function editArtisticGroupHandler(id: string) {
    const existingArtisticGroup = await getArtisticGroup(id);
    if (
      existingArtisticGroup.status === 'SUCCESS' &&
      typeof existingArtisticGroup.response === 'object'
    ) {
      const artisticGroupWithRewrittenUrlIntoFileProperty =
        rewriteUrlsIntoFileAsStringObjectToBeProperlyValidated<
          TArtisticGroupWithImages,
          ImageArtisticGroup
        >(existingArtisticGroup.response);

      const artisticGroupWithRewrittenUrlIntoFilePropertyAndSortedImagesByIndex: TArtisticGroupWithImages =
        await sortImagesObjectsByIndexInArtisticGroups(
          artisticGroupWithRewrittenUrlIntoFileProperty
        );

      setArtisticGroupFormikDataForPUT(
        artisticGroupWithRewrittenUrlIntoFilePropertyAndSortedImagesByIndex
      );
      setIsAddArtisticGroupVisible(true);
      return;
    }
    setShowNotification('ERROR', 'Nie znaleziono grupy artystycznej.');
  }

  ////tsx
  return (
    <div className="float-right mr-8 h-[42px] pt-[6px] flex justify-end items-center">
      <div>
        <EditIcon
          actionFn={() => {
            editArtisticGroupHandler(id);
          }}
          alt="Edytuj grupę."
        />
      </div>

      <div>
        <CloseIcon
          actionFn={() => {
            setShowModal(
              true,
              <ModalDeleteArtisticGroupContent
                artisticGroup={[{ id, title }]}
              />
            );
          }}
          alt="Wykasuj użytkownika."
        />
      </div>
    </div>
  );
}
