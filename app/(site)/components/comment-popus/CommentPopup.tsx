import { useIconsLogicHandler } from '@/hooks/useIconsLogicHandler';
import { subMenuVariant } from '@/lib/animations/variants';
import { TIconSize } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import InfoIcon from '../icons/InfoIcon';

type Props = {
  alt: string;
  size?: TIconSize;
  commentContent: string;
  // additionalClasses?: string;
  // actionFn: () => void;
};

export default function CommentPopup(props: Props) {
  ////vars
  const { alt, size, commentContent } = props;
  const { width, height, currentForegroundColor } = useIconsLogicHandler(size);
  const [isCommentVisible, setIsCommentVisible] = useState(false);

  function turnOnCommentVisibility() {
    setIsCommentVisible(true);
  }
  function turnOffCommentVisibility() {
    setIsCommentVisible(false);
  }

  ////tsx
  return (
    <div style={{ width: width, height: height }} className="relative">
      <span className="sr-only">{alt}</span>
      <button
        // className="icon-active"
        type="button"
        onMouseOver={turnOnCommentVisibility}
        onMouseLeave={turnOffCommentVisibility}
      >
        <InfoIcon width={width} height={height} />
      </button>
      <AnimatePresence mode="wait">
        {isCommentVisible ? (
          <motion.div
            variants={subMenuVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bottom-0 w-56 p-4 left-8 bg-skin-main-bg font-base-regular drop-shadow-big rounded-base"
          >
            {commentContent}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
