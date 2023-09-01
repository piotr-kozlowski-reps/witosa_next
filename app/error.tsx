'use client';

import { subMenuVariant } from '@/lib/animations/variants';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import CustomButton from './(site)/components/CustomButton';
import CustomLink from './(site)/components/CustomLink';

const Error = ({ error, reset }: { error: Error; reset: () => {} }) => {
  const router = useRouter();

  return (
    <Fragment>
      <AnimatePresence mode="wait">
        <motion.div
          variants={subMenuVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute z-40 w-full top-[128px] right-0 left-0 bg-skin-main-bg drop-shadow-big pt-[25px] pb-[32px]"
        >
          <div className="proper-container-classes">
            <div className="prose max-w-full">
              <h1 className="text-error">W aplikacji pojawił sie problem:</h1>
              <h2 className="-mt-[18px]">
                {error.message || 'Coś poszło nie tak'}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-y-[58px] gap-x-mobile-margin mt-[51px] items-end tablet:grid-cols-2 tablet:gap-y-[58px] tablet:gap-x-tablet-margin desktop:grid-cols-3 desktop:gap-y-0 desktop:gap-x-4">
              <div className="flex flex-col justify-between h-full">
                <div className="text-skin-base">
                  Jeżeli jest to chwilowy błąd, może się okazać, że naciśnięcie
                  przycisku &quot;odśwież&quot; (poniżej) rozwiąże problem.
                </div>
                <div className="mt-[25px]">
                  <CustomButton
                    text="odśwież"
                    descriptionText="Odśwież stronę."
                    disabled={false}
                    actionFn={reset}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between  h-full">
                <div className="text-skin-base">
                  Aby wrócić do strony poprzedniej, naciśnij przycisk poniżej.
                </div>
                <div className="mt-[25px] -pb-[5px]">
                  <CustomButton
                    text="wróć do strony poprzedniej"
                    descriptionText="Wróć do strony poprzedniej."
                    disabled={false}
                    actionFn={() => router.back()}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between pb-[6px] h-full">
                <div className="text-skin-base">
                  Aby wrócić do strony głównej, naciśnij przycisk poniżej.
                </div>
                <div className="mt-[25px]">
                  <CustomLink
                    visibleText="powrót do strony głównej"
                    url={`/`}
                    descriptionText="Powrót do strony głównej."
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </Fragment>
  );
};

export default Error;
