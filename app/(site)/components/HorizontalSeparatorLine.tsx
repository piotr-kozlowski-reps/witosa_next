'use client';

import clsx from 'clsx';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

type Props = {
  additionalClasses: string;
};

export default function HorizontalSeparatorLine(props: Props) {
  ////vars
  const { additionalClasses } = props;

  ////animation
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  ////tsx
  return (
    <motion.div
      ref={targetRef}
      style={{ scaleX: scale }}
      className={clsx(
        'bg-skin-gray w-[753px] h-[1px] mb-24 origin-left',
        additionalClasses
      )}
    ></motion.div>
  );
}
