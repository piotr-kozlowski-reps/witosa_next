import { useNotificationState } from '@/context/notificationState';
import { notificationVariant } from '@/lib/animations/variants';
import { motion } from 'framer-motion';
import { Fragment } from 'react';
import ErrorIcon from '../icons/ErrorIcon';
import SuccessIcon from '../icons/SuccessIcon';

export default function NotificationContent() {
  ////vars
  const { getNotificationContent, getNotificationType } =
    useNotificationState();

  console.log(getNotificationType());

  ////tsx
  return (
    <Fragment>
      <motion.div
        variants={notificationVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed flex items-start justify-center w-screen h-screen mx-auto z-60 top-11"
      >
        <div className="flex items-center justify-center px-8 pt-4 bg-skin-main-bg shadow-cta-secondary drop-shadow-big rounded-base z-60">
          {getNotificationType() === 'SUCCESS' ? (
            <SuccessIcon alt="Sukces." additionalClasses="-mb-[4px]" />
          ) : (
            <ErrorIcon alt="Błąd." additionalClasses="-mb-[4px]" />
          )}

          <span className="pb-4 text-skin-base font-base-regular">
            {getNotificationContent()}
          </span>
        </div>
      </motion.div>
    </Fragment>
  );
}
