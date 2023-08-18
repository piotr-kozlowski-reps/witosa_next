const pixelMoveContainerAmount = 100;

export const containerVariant = {
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

export const subMenuVariant = {
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
    },
  },
  exit: {
    scale: 0.5,
    opacity: 0,
  },
};

export const overlaySubMenuVariant = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 0.4,
  },
  exit: {
    scale: 0,
    opacity: 0,
  },
};

export const accessibilityVariant = {
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

//  initial={{ scale: 0.5, opacity: 0 }}
//     animate={{ scale: 1, opacity: 1 }}
//     exit={{ scale: 0.5, opacity: 0 }}
