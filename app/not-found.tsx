'use client';

import { useLayoutState } from '@/context/layoutState';
import { subMenuVariant } from '@/lib/animations/variants';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import CustomButton from './(site)/components/CustomButton';
import CustomLink from './(site)/components/CustomLink';
import Error404SVG from './(site)/components/svgs/Error404SVG';
import ErrorOutlineSVG from './(site)/components/svgs/ErrorOutlineSVG';

export default function NotFound() {
  ////vars
  const { getCurrentForegroundColor } = useLayoutState();
  const currentForegroundColor = getCurrentForegroundColor();
  const router = useRouter();

  ////tsx
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={subMenuVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="absolute z-40 w-full top-[128px] right-0 left-0 bg-skin-main-bg drop-shadow-big pt-24 pb-24"
      >
        <div className="proper-container-classes">
          <div className="flex flex-col items-start justify-start max-w-full gap-16 desktop:flex-row desktop:items-center">
            <div className="max-w-[376px] h-[132px] relative">
              <Error404SVG currentForegroundColor={currentForegroundColor} />
              <div className="absolute top-8 left-8">
                <ErrorOutlineSVG />
              </div>
            </div>
            <div className="w-[2px] h-16 bg-skin-gray hidden  desktop:block"></div>
            <div className="flex flex-col items-start justify-center">
              <div className="prose">
                <h3>
                  Hmm, podana strona nie istnieje. <br />
                  Proponujemy:
                </h3>
              </div>
              <div className="flex flex-col tablet:flex-row justify-center items-start tablet:items-center gap-4 tablet:gap-8 mt-[25px]">
                <div>
                  <CustomButton
                    text="wróć do strony poprzedniej"
                    descriptionText="Wróć do strony poprzedniej."
                    disabled={false}
                    actionFn={() => router.back()}
                  />
                </div>
                <div className="prose">
                  <h3>albo</h3>
                </div>
                <div>
                  <CustomLink
                    visibleText="powrót do strony głównej"
                    url={`/`}
                    descriptionText="Powrót do strony głównej."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* <div className="grid grid-cols-1 gap-y-[58px] gap-x-mobile-margin mt-[51px] items-end tablet:grid-cols-2 tablet:gap-y-[58px] tablet:gap-x-tablet-margin desktop:grid-cols-3 desktop:gap-y-0 desktop:gap-x-4"> */}
          {/* <div className="flex flex-col justify-between h-full">
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
            </div> */}

          {/* <div className="flex flex-col justify-between h-full">
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
            </div> */}

          {/* <div className="flex flex-col justify-between pb-[6px] h-full">
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
            </div> */}
          {/* </div> */}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
