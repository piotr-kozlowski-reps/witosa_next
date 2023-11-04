import { TModalState } from '@/types';
import { hookstate, useHookstate } from '@hookstate/core';
import { devtools } from '@hookstate/devtools';

const modalStateData: TModalState = {
  isShowModal: false,
  canBeClosed: true,
  modalContent: <div>inside</div>,
  // defaultErrorModalContent:
  //   '<div class="flex flex-col border-t border-main_color bg-background_1_lighter">\r\n            <div class="mx-auto my-16 font-style-sm ml-8 mr-[24px] text-center">\r\n              Unfortunately, not enough data provided or occurred some error,\r\n              please try again.\r\n            </div>\r\n          </div>',
  // timeoutInMilliseconds: 0,
  // isError: false,
};

const modalState = hookstate(modalStateData, devtools({ key: 'modalState' }));

export function useModalState() {
  const state = useHookstate(modalState);

  return {
    getIsShowModal() {
      return state.isShowModal.get();
    },

    getCanModalBeClosed() {
      return state.canBeClosed.get();
    },

    getModalContent() {
      return state.modalContent.get({ noproxy: true });
    },

    setShowModal(
      isShowModal: boolean,
      passedModalContent: JSX.Element,
      canBeClosed?: boolean
    ) {
      if (canBeClosed !== undefined) state.canBeClosed.set(canBeClosed);
      state.isShowModal.set(isShowModal);
      state.modalContent.set(passedModalContent);
    },

    setHideModal() {
      state.canBeClosed.set(true);
      state.isShowModal.set(false);
    },
  };
}
