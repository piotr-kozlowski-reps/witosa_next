'use client';

import { useLayoutState } from '@/context/layoutState';
import { useModalState } from '@/context/modalState';
import { useNavigationState } from '@/context/navigationState';
import { useNotificationState } from '@/context/notificationState';
import { useGetCurrentDevice } from '@/hooks/useGetCurrentDevice';
import { TFontSize, TMode } from '@/types';
import { AnimatePresence } from 'framer-motion';
import { Fragment, useEffect } from 'react';
import FirstLinksToAccessContentOrAccessibilityMenuForHandicapped from '../FirstLinksToAccessContentOrAccessibilityMenuForHandicapped';
import Modal from '../modal/Modal';
import NotificationContent from '../notification/NotificationContent';
import NavigationDesktop from './NavigationDesktop';
import NavigationMobileAndTablet from './NavigationMobileAndTablet';

export default function Navigation() {
  ////vars
  useGetCurrentDevice();
  const currentMode = useLayoutState().getLayoutMode();
  const currentFontSize = useLayoutState().getFontSize();
  const { getCurrentDevice } = useNavigationState();
  const { getIsShowModal } = useModalState();
  const { getIsShowNotification } = useNotificationState();

  useEffect(() => {
    const bodyElementClassesList = document.body.classList;
    layoutChangeHandler(currentMode, bodyElementClassesList);
    fontSizeChangeHandler(currentFontSize, bodyElementClassesList);
  }, [currentMode, currentFontSize]);

  ////tsx
  return (
    <Fragment>
      {/* modal - start */}
      {getIsShowModal() ? <Modal /> : null}
      {/* modal - end */}

      {/* notification - start */}
      <AnimatePresence mode="wait">
        {getIsShowNotification() ? <NotificationContent /> : null}
      </AnimatePresence>
      {/* notification - end */}

      <FirstLinksToAccessContentOrAccessibilityMenuForHandicapped />

      {getCurrentDevice() === 'MOBILE' || getCurrentDevice() === 'TABLET' ? (
        <NavigationMobileAndTablet getCurrentDevice={getCurrentDevice} />
      ) : null}
      {getCurrentDevice() === 'DESKTOP' ? <NavigationDesktop /> : null}

      <div id="main_content"></div>
    </Fragment>
  );
}

////utils
const clearAllDesiredCssClasses = (
  objectCssClasses: DOMTokenList,
  classesToBeCleared: string[]
) => {
  classesToBeCleared.forEach((cssClass) => {
    if (objectCssClasses.contains(cssClass)) {
      objectCssClasses.remove(cssClass);
    }
  });
};

//layout
const layoutCssClassesToBeCleared = ['theme-dark', 'theme-contrast'];
function layoutChangeHandler(
  currentMode: TMode,
  objectWithCssClasses: DOMTokenList
) {
  if (currentMode === 'LIGHT') {
    clearAllDesiredCssClasses(
      objectWithCssClasses,
      layoutCssClassesToBeCleared
    );
  }

  if (currentMode === 'DARK') {
    clearAllDesiredCssClasses(
      objectWithCssClasses,
      layoutCssClassesToBeCleared
    );
    objectWithCssClasses.add('theme-dark');
  }

  if (currentMode === 'CONTRAST') {
    clearAllDesiredCssClasses(
      objectWithCssClasses,
      layoutCssClassesToBeCleared
    );
    objectWithCssClasses.add('theme-contrast');
  }
}

//font sizes
const fontCssClassesToBeCleared = [
  'theme-font-size-bigger',
  'theme-font-size-biggest',
];
function fontSizeChangeHandler(
  currentMode: TFontSize,
  objectCssClasses: DOMTokenList
) {
  if (currentMode === 'NORMAL') {
    clearAllDesiredCssClasses(objectCssClasses, fontCssClassesToBeCleared);
  }

  if (currentMode === 'BIGGER') {
    clearAllDesiredCssClasses(objectCssClasses, fontCssClassesToBeCleared);
    objectCssClasses.add('theme-font-size-bigger');
  }

  if (currentMode === 'BIGGEST') {
    clearAllDesiredCssClasses(objectCssClasses, fontCssClassesToBeCleared);
    objectCssClasses.add('theme-font-size-biggest');
  }
}
