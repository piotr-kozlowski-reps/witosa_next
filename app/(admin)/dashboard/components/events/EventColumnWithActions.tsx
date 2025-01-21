'use client';

import { getEvent } from '@/actions/eventsActions';
import {
  rewriteUrlsIntoFileAsStringObjectToBeProperlyValidated,
  sortImagesObjectsByIndexInEvent,
} from '@/actions/syncActionHelpers';
import CloseIcon from '@/app/(site)/components/icons/CloseIcon';
import EditIcon from '@/app/(site)/components/icons/EditIcon';
import ModalDeleteEventsContent from '@/app/(site)/components/modal/ModalDeleteEventsContent';
import { useEventsState } from '@/context/eventsState';
import { useModalState } from '@/context/modalState';
import { useNotificationState } from '@/context/notificationState';
import { TEventWithImages } from '@/types';
import { Event, ImageEvent } from '@prisma/client';

type Props = {
  event: Event;
};

export default function EventColumnWithActions(props: Props) {
  ////vars
  const { event } = props;
  const { id, title } = event;
  const { setShowModal } = useModalState();
  const { setShowNotification } = useNotificationState();
  const { setEventFormikDataForPUT, setIsAddEventVisible } = useEventsState();

  async function editEventHandler(id: string) {
    const existingEvent = await getEvent(id);

    if (
      existingEvent.status === 'SUCCESS' &&
      typeof existingEvent.response === 'object'
    ) {
      const eventWithRewrittenUrlIntoFileProperty =
        rewriteUrlsIntoFileAsStringObjectToBeProperlyValidated<
          TEventWithImages,
          ImageEvent
        >(existingEvent.response);

      const eventWithRewrittenUrlIntoFilePropertyAndSortedImagesByIndex: TEventWithImages =
        sortImagesObjectsByIndexInEvent(eventWithRewrittenUrlIntoFileProperty);

      setEventFormikDataForPUT(
        eventWithRewrittenUrlIntoFilePropertyAndSortedImagesByIndex
      );
      setIsAddEventVisible(true);
      return;
    }

    setShowNotification('ERROR', 'Nie znaleziono wydarzenia.');
  }

  ////tsx
  return (
    <div className="float-right mr-8 h-[42px] pt-[6px] flex justify-end items-center">
      <div>
        <EditIcon
          actionFn={() => {
            editEventHandler(id);
          }}
          alt="Edytuj zajęcia."
        />
      </div>

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
}
