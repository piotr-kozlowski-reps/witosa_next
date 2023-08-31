'use client';

import { motion } from 'framer-motion';

const svgVariants = {
  // hidden: { scale: 0.8 },
  visible: {
    opacity: [0.3, 1, 1, 0.3],
    scale: [0.85, 1, 1, 0.85],
    transition: {
      duration: 1.2,
      ease: 'easeInOut',
      times: [0, 0.4, 0.6, 1],
      repeat: Infinity,
    },
  },
};

const pathVariants = {
  visible: {
    pathLength: [0, 1, 1, 0],
    transition: {
      duration: 1.2,
      ease: 'easeInOut',
      times: [0, 0.4, 0.6, 1],
      repeat: Infinity,
    },
  },
};

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full mt-32">
      <div className="w-[48px] h-[64px]">
        <motion.svg
          variants={svgVariants}
          animate="visible"
          exit="exit"
          width="48"
          height="64"
          viewBox="0 0 589 796"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            d="M476.273 135.933V557.743H589V381.72C589 170.901 433.011 0 240.587 0H79.9225V123.504H464.928C471.195 123.499 476.273 129.062 476.273 135.933Z"
            // fill="#F16730"
            fill="none"
            stroke="#F16730"
            stroke-width="20"
          />
          <motion.path
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            d="M192.644 679.218V694.825C254.683 757.3 337.424 795.47 428.33 795.47H588.999V671.971H199.255C195.6 671.975 192.644 675.218 192.644 679.218Z"
            fill="none"
            stroke="#F16730"
            stroke-width="20"
          />
          <motion.path
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            d="M112.647 642.724V400.193C112.647 393.327 117.729 387.755 123.996 387.755H367.186V264.256H348.333C156.908 264.256 1.60071 433.412 0 642.724H112.647Z"
            fill="none"
            stroke="#F16730"
            stroke-width="20"
          />
        </motion.svg>
      </div>
    </div>
  );
}
