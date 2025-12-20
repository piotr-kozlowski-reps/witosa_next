import { Variants } from 'framer-motion';

const pixelMoveContainerAmount = 100;

export const containerVariant: Variants = {
  hidden: {
    y: `${pixelMoveContainerAmount}px`,
    opacity: 0,
  },
  visible: {
    y: 0,
    scale: 1,
    opacity: 1,
  },
  exit: {
    y: `-${pixelMoveContainerAmount}px`,
    opacity: 0,
  },
};

export const subMenuVariant: Variants = {
  hidden: {
    scale: 0.5,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.3,
      duration: 0.2,
    },
  },
  exit: {
    scale: 0.5,
    opacity: 0,
  },
};

export const overlaySubMenuVariant: Variants = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 0.7,
    transition: {
      bounce: 0.3,
      duration: 0.1,
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
  },
};

export const accessibilityVariant: Variants = {
  hidden: {
    scale: 0.5,
    opacity: 0,
    x: '100%',
  },
  visible: {
    scale: 1,
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      bounce: 0.3,
    },
  },
  exit: {
    scale: 0.5,
    opacity: 0,
  },
};
export const mobileVariant: Variants = {
  hidden: {
    opacity: 0,
    x: '50%',
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.2,
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    x: '50%',
  },
};

export const notificationVariant: Variants = {
  hidden: {
    opacity: 0,
    x: '50%',
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.2,
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    x: '-50%',
  },
};

export const pageVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
    scale: 1,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      bounce: 0.3,
    },
  },
  exit: {
    opacity: 0,
    y: 15,
    scale: 1,
  },
};
