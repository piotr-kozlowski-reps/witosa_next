import { mobileVariant } from '@/lib/animations/variants';
import { motion } from 'framer-motion';
import { Fragment } from 'react';

type Props = {
  children: JSX.Element | null;
};

export default function ComponentTransitionFromRightToLeft(props: Props) {
  ////vars
  const { children } = props;

  ////tsx
  return (
    <Fragment>
      {children ? (
        <motion.div
          variants={mobileVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {children}
        </motion.div>
      ) : null}
    </Fragment>
  );
}
