import {
  accessibilityVariant,
  overlaySubMenuVariant,
  subMenuVariant,
} from '@/lib/animations/variants';
import { TFontSize, TMode } from '@/types';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { Fragment } from 'react';
import IconButton from '../IconButton';
import CloseIcon from '../icons/CloseIcon';
import HandicapIcon from '../icons/HandicapIcon';

interface Props {
  getIsAccessibilityNavigationVisible: () => boolean;
  setFontSizeToNormal: () => void;
  setFontSizeToBigger: () => void;
  setFontSizeToBiggest: () => void;
  getFontSize: () => TFontSize;
  getLayoutMode: () => TMode;
  setLayoutModeToLight: () => void;
  setLayoutModeToDark: () => void;
  setLayoutModeToContrast: () => void;
  setIsAccessibilityNavigationVisible_ToTrue: () => void;
  setIsAccessibilityNavigationVisible_ToFalse: () => void;
}

export default function NavigationAccessibilityDesktop(props: Props) {
  ////vars
  const {
    getIsAccessibilityNavigationVisible,
    setFontSizeToNormal,
    setFontSizeToBigger,
    setFontSizeToBiggest,
    getFontSize,
    getLayoutMode,
    setLayoutModeToLight,
    setLayoutModeToDark,
    setLayoutModeToContrast,
    setIsAccessibilityNavigationVisible_ToTrue,
    setIsAccessibilityNavigationVisible_ToFalse,
  } = props;

  ////tsx
  return (
    <Fragment>
      <AnimatePresence mode="wait">
        {!getIsAccessibilityNavigationVisible() ? (
          <motion.div
            variants={accessibilityVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover={{ scale: 1.07 }}
            className="absolute right-0 bg-skin-main-bg rounded-s-base drop-shadow-big top-[27px]"
          >
            <HandicapIcon
              size="NORMAL"
              alt="Narzędzia ułatwiające dostępność treści."
              actionFn={setIsAccessibilityNavigationVisible_ToTrue}
              additionalClasses="my-4 ml-4 mr-1"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {getIsAccessibilityNavigationVisible() ? (
          <motion.div
            variants={subMenuVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={clsx(
              'absolute z-40 ',
              'w-full h-[352px] top-[128px] right-0 left-0'
            )}
            id="accessibility_navigation"
          >
            <nav
              className="bg-skin-main-bg drop-shadow-big"
              aria-labelledby="accessibility_navigation_heading"
            >
              <h2 id="accessibility_navigation_heading" className="sr-only">
                Narzędzia ułatwiające dostępność treści
              </h2>
              <div className="relative h-[352px] desktop-container flex flex-col justify-center">
                <ul className="flex items-start justify-center py-8 mx-auto">
                  <div className="w-[200px] font-base-regular">
                    <span>
                      Chcemy, by <span className="font-base-bold">ART CK</span>{' '}
                      było dostępne dla wszystkich, również dla osób o
                      szczególnych potrzebach.
                    </span>
                  </div>
                  {/* dla niedowidzących - zmiana wielkosci fonta */}
                  <li className="flex flex-col ml-32">
                    <h4 className="font-base-regular">Dla niedowidzących</h4>
                    <ul className="flex gap-4 mt-4">
                      <li>
                        <IconButton
                          isCurrentlyActive={getFontSize() === 'NORMAL'}
                          iconDefaultUrl="font-small-sm_default.svg"
                          iconHoverUrl="font-small-sm_hover.svg"
                          alt="Wielkość czcionki - normalna."
                          actionFn={setFontSizeToNormal}
                        />
                      </li>
                      <li>
                        <IconButton
                          isCurrentlyActive={getFontSize() === 'BIGGER'}
                          iconDefaultUrl="font-bigger-sm_default.svg"
                          iconHoverUrl="font-bigger-sm_hover.svg"
                          alt="Wielkość czcionki - powiększona."
                          actionFn={setFontSizeToBigger}
                        />
                      </li>
                      <li>
                        <IconButton
                          isCurrentlyActive={getFontSize() === 'BIGGEST'}
                          iconDefaultUrl="font-biggest-sm_default.svg"
                          iconHoverUrl="font-biggest-sm_hover.svg"
                          alt="Wielkość czcionki - największa."
                          actionFn={setFontSizeToBiggest}
                        />
                      </li>
                    </ul>
                  </li>

                  {/*  zmiana kolorów / kontrastu */}
                  <li className="flex flex-col ml-16">
                    <h4 className="font-base-regular">
                      Kolorystyka / kontrast
                    </h4>
                    <ul className="flex gap-4 mt-4">
                      <li>
                        <IconButton
                          isCurrentlyActive={getLayoutMode() === 'LIGHT'}
                          iconDefaultUrl="layout-light-sm_default.svg"
                          iconHoverUrl="layout-light-sm_hover.svg"
                          alt="Ustawienia kolorów - tryb jasny."
                          actionFn={setLayoutModeToLight}
                        />
                      </li>
                      <li>
                        <IconButton
                          isCurrentlyActive={getLayoutMode() === 'DARK'}
                          iconDefaultUrl="layout-dark-sm_default.svg"
                          iconHoverUrl="layout-dark-sm_hover.svg"
                          alt="Ustawienia kolorów - tryb ciemny."
                          actionFn={setLayoutModeToDark}
                        />
                      </li>
                      <li>
                        <IconButton
                          isCurrentlyActive={getLayoutMode() === 'CONTRAST'}
                          iconDefaultUrl="layout-contrast-sm_default.svg"
                          iconHoverUrl="layout-contrast-sm_hover.svg"
                          alt="Ustawienia kolorów - tryb kontrastowy."
                          actionFn={setLayoutModeToContrast}
                        />
                      </li>
                    </ul>
                  </li>
                </ul>
                {/* <div className="absolute top-4 left-4" aria-hidden="true">
                  <IconButton
                    isCurrentlyActive={getIsAccessibilityNavigationVisible()}
                    iconDefaultUrl="handicap-sm_default.svg"
                    iconHoverUrl="handicap-sm_hover.svg"
                    alt="Otwórz menu z narzędziami do ustawienia ułatwień dostępności treści."
                    actionFn={setIsAccessibilityNavigationVisible_ToTrue}
                  />
                </div> */}
                <div className="absolute right-0 top-4">
                  <CloseIcon
                    alt="Zamknij menu z narzędziami do ustawienia ułatwień dostępności treści."
                    actionFn={setIsAccessibilityNavigationVisible_ToFalse}
                  />
                </div>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {/* overlay to accessibility nav */}
      <AnimatePresence mode="wait">
        {getIsAccessibilityNavigationVisible() ? (
          <motion.div
            variants={overlaySubMenuVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={clsx(
              'absolute top-0 bottom-0 left-0 right-0 z-30 w-screen h-screen overlay'
            )}
            onClick={setIsAccessibilityNavigationVisible_ToFalse}
          ></motion.div>
        ) : null}
      </AnimatePresence>
    </Fragment>
  );
}
