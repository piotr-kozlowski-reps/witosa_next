import { useNotificationState } from '@/context/notificationState';
import { AnimatePresence } from 'framer-motion';
import SuccessIcon from '../icons/SuccessIcon';
import ComponentTransitionFromRightToLeft from '../motionWrappers/ComponentTransitionFromRightToLeft';

export default function NotificationContent() {
  ////vars
  const { getNotificationContent, getNotificationType } =
    useNotificationState();

  ////tsx
  return (
    <ComponentTransitionFromRightToLeft>
      <AnimatePresence mode="wait">
        <div className="absolute z-50 flex justify-center w-full mx-auto top-11">
          <div className="flex px-8 py-4 drop-shadow-big shadow-cta-secondary rounded-base bg-skin-main-bg">
            {getNotificationType() ? <SuccessIcon alt="Success." /> : 'error'}
            <span className="text-skin-base font-base-regular">
              {getNotificationContent()}
            </span>
          </div>
        </div>
      </AnimatePresence>
    </ComponentTransitionFromRightToLeft>
  );
}
