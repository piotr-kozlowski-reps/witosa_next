import { TNotificationState, TNotificationType } from '@/types';
import { hookstate, useHookstate } from '@hookstate/core';
import { devtools } from '@hookstate/devtools';

const modalStateData: TNotificationState = {
  isShowNotification: false,
  notificationContent: '',
  notificationType: 'SUCCESS',
  timeoutInMilliseconds: 10000000,
};

const notificationState = hookstate(
  modalStateData,
  devtools({ key: 'modalState' })
);

export function useNotificationState() {
  ////vars
  const state = useHookstate(notificationState);

  ////utils
  function closeNotification() {
    console.log('closeNotification');
  }

  ////
  return {
    getIsShowNotification() {
      return state.isShowNotification.get();
    },

    getNotificationContent() {
      return state.notificationContent.get();
    },

    getNotificationType() {
      return state.notificationType.get();
    },

    setShowNotification(
      notificationType_Passed: TNotificationType,
      notificationContent_Passed: string,
      timeoutInMilliseconds?: number
    ) {
      state.isShowNotification.set(true);
      state.notificationContent.set(notificationContent_Passed);
      if (timeoutInMilliseconds) {
        state.timeoutInMilliseconds.set(timeoutInMilliseconds);
      }
      closeNotification();
    },

    setHideNotification() {
      state.isShowNotification.set(false);
    },
  };
}
