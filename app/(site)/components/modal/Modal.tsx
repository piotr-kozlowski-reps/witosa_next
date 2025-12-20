'use client';

import { useModalState } from '@/context/modalState';
import {
  overlaySubMenuVariant,
  subMenuVariant,
} from '@/lib/animations/variants';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { Fragment } from 'react';

export default function Modal() {
  ////vars
  const { getModalContent, setHideModal, getCanModalBeClosed, getIsShowModal } =
    useModalState();

  ////tsx
  return (
    <Fragment>
      <AnimatePresence>
        <motion.div
          variants={subMenuVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed z-40 w-full top-[128px] right-0 left-0 bg-skin-main-bg drop-shadow-big pt-[25px] pb-[32px] "
          style={{ visibility: getIsShowModal() ? 'visible' : 'hidden' }}
        >
          <div className="proper-container-classes">{getModalContent()}</div>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        <motion.div
          variants={overlaySubMenuVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={clsx(
            'fixed top-0 bottom-0 left-0 right-0 z-30 w-screen h-screen overlay opacity-90 overflow-clip'
          )}
          onClick={() => {
            getCanModalBeClosed() ? setHideModal() : null;
          }}
        ></motion.div>
      </AnimatePresence>
    </Fragment>
  );
}
