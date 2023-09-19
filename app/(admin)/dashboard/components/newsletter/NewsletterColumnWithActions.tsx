'use client';

import CloseIcon from '@/app/(site)/components/icons/CloseIcon';
import CopyIcon from '@/app/(site)/components/icons/CopyIcon';
import EditIcon from '@/app/(site)/components/icons/EditIcon';
import ModalDeleteNewsletterContent from '@/app/(site)/components/modal/ModalDeleteNewsletterContent';
import { useModalState } from '@/context/modalState';
import { useNavigationState } from '@/context/navigationState';
import { useNotificationState } from '@/context/notificationState';

type Props = {
  newsletterEmail: string;
};

export default function NewsletterColumnWithActions(props: Props) {
  ////vars
  const { newsletterEmail } = props;
  const { setShowModal } = useModalState();
  const { setShowNotification } = useNotificationState();
  const { setIsAddNewsletterVisible, setNewsletterFormikDataForPUT } =
    useNavigationState();

  ////tsx
  return (
    <div className="float-right mr-8 h-[42px] pt-[6px] flex justify-end items-center">
      <div>
        <CopyIcon
          actionFn={() => {
            navigator.clipboard.writeText(newsletterEmail);
            setShowNotification(
              'SUCCESS',
              `Adres e-mail: ${newsletterEmail} został skopiowany do schowka.`
            );
          }}
          alt="Kopiuj adres e-mail."
        />
      </div>

      <div>
        <EditIcon
          actionFn={() => {
            setNewsletterFormikDataForPUT(newsletterEmail);
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
              <ModalDeleteNewsletterContent
                newsletterEmails={[newsletterEmail]}
              />
            );
          }}
          alt="Wykasuj email z Newslettera."
        />
      </div>
    </div>
  );
}
