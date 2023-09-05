'use client';

import { useLayoutState } from '@/context/layoutState';
import { subMenuVariant } from '@/lib/animations/variants';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import CustomLink from '../../components/CustomLink';
import Error404SVG from '../../components/svgs/Error404SVG';
import ErrorOutlineSVG from '../../components/svgs/ErrorOutlineSVG';

export default function EventsNotFound() {
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
                  Hmm, podane wydarzenie nie istnieje. <br />
                  Proponujemy:
                </h3>
              </div>
              <div className="flex flex-col tablet:flex-row justify-center items-start tablet:items-center gap-4 tablet:gap-8 mt-[25px]">
                <div>
                  <CustomLink
                    visibleText="powrót do wydarzeń"
                    url={`/events`}
                    descriptionText="Wróć do wszytskich wydarzeń."
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
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
