import { useIconsLogicHandler } from '@/hooks/useIconsLogicHandler';
import { subMenuVariant } from '@/lib/animations/variants';
import { TIconSize } from '@/types';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import InfoIcon from '../icons/InfoIcon';

type Props = {
  alt: string;
  size?: TIconSize;
  commentContent: React.ReactNode;
  isShowCommentToTheLeft?: boolean;
};

export default function CommentPopup(props: Props) {
  ////vars
  const { alt, size, commentContent, isShowCommentToTheLeft = false } = props;
  const { width, height } = useIconsLogicHandler(size);
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
            className={clsx(
              'absolute bottom-0 w-80 p-4 bg-skin-main-bg font-base-regular drop-shadow-big rounded-base z-60',
              isShowCommentToTheLeft ? 'right-8' : 'left-8'
            )}
          >
            {commentContent}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
