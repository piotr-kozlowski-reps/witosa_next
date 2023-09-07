'use client';

import { subMenuVariant } from '@/lib/animations/variants';
import { AnimatePresence, motion } from 'framer-motion';
import CustomLink from './CustomLink';

export default function NotAuthenticatedError() {
  //TODO: add showing what site it is
  //TODO: button to login
  //TODO: button to main
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={subMenuVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="absolute z-40 w-full top-[128px] right-0 left-0 bg-skin-main-bg drop-shadow-big pt-[89px] pb-[99px]"
      >
        <div className="proper-container-classes">
          <div className="max-w-full prose">
            <h1 className="text-error">
              Ta część aplikacji wymaga, abyś był zalogowany.
            </h1>
            <h2 className="mt-[32px]">Proponujemy:</h2>
          </div>

          <div className="flex flex-col tablet:flex-row justify-start items-start gap-4 tablet:gap-8 mt-[25px]">
            <div>
              <CustomLink
                visibleText="zaloguj się"
                url={`/login`}
                descriptionText="Powrót do strony głównej."
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
      </motion.div>
    </AnimatePresence>
    // <div>
    //   NotAuthenticaterErrorComponent - with later path showing where error
    //   occured
    //   <div>
    //     <Link href={'/login'}>Login</Link>
    //   </div>
    //   <div>
    //     <Link href={'/'}>Strona główna</Link>
    //   </div>
    // </div>
  );
}
