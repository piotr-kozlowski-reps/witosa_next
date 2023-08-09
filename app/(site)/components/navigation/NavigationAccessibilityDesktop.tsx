import { TFontSize, TMode } from '@/types';
import clsx from 'clsx';
import { Fragment } from 'react';
import IconButton from '../IconButton';

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
      <div
        className={clsx(
          'absolute transition-accessibility-menu z-40',
          getIsAccessibilityNavigationVisible()
            ? 'w-full top-[128px] right-0'
            : '-right-[1076px] top-[128px]'
        )}
        id="accessibility_navigation"
      >
        <nav
          className="bg-skin-main-bg desktop-container drop-shadow-big rounded-base"
          aria-labelledby="accessibility_navigation_heading"
        >
          <h2 id="accessibility_navigation_heading" className="sr-only">
            Narzędzia ułatwiające dostępność treści
          </h2>
          <ul className="flex items-start justify-center py-8 mx-auto">
            <div className="w-[200px] font-base-regular">
              <span>
                Chcemy, by <span className="font-base-bold">ART CK</span> było
                dostępne dla wszystkich, również dla osób o szczególnych
                potrzebach.
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
              <h4 className="font-base-regular">Kolorystyka / kontrast</h4>
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
          <div className="absolute top-4 left-4" aria-hidden="true">
            <IconButton
              isCurrentlyActive={getIsAccessibilityNavigationVisible()}
              iconDefaultUrl="handicap-sm_default.svg"
              iconHoverUrl="handicap-sm_hover.svg"
              alt="Otwórz menu z narzędziami do ustawienia ułatwień dostępności treści."
              actionFn={setIsAccessibilityNavigationVisible_ToTrue}
            />
          </div>
          <div className="absolute top-4 right-4">
            <IconButton
              iconDefaultUrl="close-sm_default.svg"
              iconHoverUrl="close-sm_hover.svg"
              alt="Zamknij menu z narzędziami do ustawienia ułatwień dostępności treści."
              actionFn={setIsAccessibilityNavigationVisible_ToFalse}
            />
          </div>
        </nav>
      </div>
      {/* overlay to accessibility nav */}
      <div
        className={clsx(
          'absolute top-0 bottom-0 left-0 right-0 z-30 w-screen h-screen overlay transition-accessibility-menu',
          getIsAccessibilityNavigationVisible() ? 'visible' : 'hidden'
        )}
        onClick={setIsAccessibilityNavigationVisible_ToFalse}
      ></div>
    </Fragment>
  );
}
