'use client';

import CloseIcon from '@/app/(site)/components/icons/CloseIcon';
import ModalDeleteEventsContent from '@/app/(site)/components/modal/ModalDeleteEventsContent';
import { useCyclicalActivitiesState } from '@/context/cyclicalActivityState';
import { useModalState } from '@/context/modalState';
import { useNotificationState } from '@/context/notificationState';
import { Event } from '@prisma/client';

type Props = {
  event: Event;
};

export default function EventColumnWithActions(props: Props) {
  ////vars
  const { event } = props;
  const { id, title } = event;
  const { setShowModal } = useModalState();
  const { setShowNotification } = useNotificationState();
  const {
    setIsAddCyclicalActivityVisible,
    setCyclicalActivityFormikDataForPUT,
  } = useCyclicalActivitiesState();

  // async function editCyclicalActivityHandler(id: string) {
  //   const existingCyclicalActivity = await getCyclicalActivity(id);

  //   if (
  //     existingCyclicalActivity.status === 'SUCCESS' &&
  //     typeof existingCyclicalActivity.response === 'object'
  //   ) {
  //     const cyclicalActivityWithRewrittenUrlIntoFileProperty =
  //       rewriteUrlsIntoFileAsStringObjectToBeProperlyValidated(
  //         existingCyclicalActivity.response
  //       );

  //     const cyclicalActivityWithRewrittenUrlIntoFilePropertyAndSortedImagesByIndex: TCyclicalActivityWithImageAndOccurrence =
  //       sortImagesObjectsByIndex(
  //         cyclicalActivityWithRewrittenUrlIntoFileProperty
  //       );

  //     setCyclicalActivityFormikDataForPUT(
  //       cyclicalActivityWithRewrittenUrlIntoFilePropertyAndSortedImagesByIndex
  //     );
  //     setIsAddCyclicalActivityVisible(true);
  //     return;
  //   }

  //   setShowNotification('ERROR', 'Nie znaleziono zajęć.');
  // }

  ////tsx
  return (
    <div className="float-right mr-8 h-[42px] pt-[6px] flex justify-end items-center">
      {/* <div>
        <EditIcon
          actionFn={() => {
            editCyclicalActivityHandler(id);
          }}
          alt="Edytuj zajęcia."
        />
      </div> */}

      <div>
        <CloseIcon
          actionFn={() => {
            setShowModal(
              true,
              <ModalDeleteEventsContent events={[{ id, title }]} />
            );
          }}
          alt="Wykasuj użytkownika."
        />
      </div>
    </div>
  );

  ////utils
  //   function rewriteUrlsIntoFileAsStringObjectToBeProperlyValidated(
  //     cyclicalActivity: TCyclicalActivityWithImageAndOccurrence
  //   ) {
  //     const images = cyclicalActivity.images as ImageCyclicalActivity[];

  //     let imagesRemapped: ImageCyclicalActivity[];
  //     if (images && images.length > 0) {
  //       imagesRemapped = images.map((image) => ({ ...image, file: image.url }));
  //       return { ...cyclicalActivity, images: imagesRemapped };
  //     }

  //     return cyclicalActivity;
  //   }
  // }

  // function sortImagesObjectsByIndex(
  //   cyclicalActivity: TCyclicalActivityWithImageAndOccurrence
  // ): TCyclicalActivityWithImageAndOccurrence {
  //   const imageObjects = [...cyclicalActivity.images];
  //   imageObjects.sort((imageObject1, imageObject2) => {
  //     return imageObject1.index < imageObject2.index ? -1 : 1;
  //   });

  //   const resultCyclicalImagesObject = { ...cyclicalActivity };
  //   resultCyclicalImagesObject.images = imageObjects;

  //   return resultCyclicalImagesObject;
}
