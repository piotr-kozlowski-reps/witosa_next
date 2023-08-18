'use client';
import { useLayoutState } from '@/context/layoutState';
import { useNavigationState } from '@/context/navigationState';
import { containerVariant } from '@/lib/animations/variants';
import { motion } from 'framer-motion';
import { Fragment } from 'react';
import NavigationAccessibilityDesktop from './NavigationAccessibilityDesktop';
import NavigationMainDesktop from './NavigationMainDesktop';

export default function NavigationDesktop() {
  ////vars
  const {
    getLinkData,
    getIsAboutSubmenuVisible,
    getIsGroupsSubmenuVisible,
    toggleIsAboutSubmenuVisible,
    toggleIsGroupsSubmenuVisible,
    hideAllSubmenus,
    getIsAccessibilitySubmenuVisible: getIsAccessibilityNavigationVisible,
    setIsAccessibilitySubmenuVisible_ToTrue:
      setIsAccessibilityNavigationVisible_ToTrue,
    setIsAccessibilitySubmenuVisible_ToFalse,
    getSocialLinkData,
  } = useNavigationState();

  const {
    getFontSize,
    setFontSizeToNormal,
    setFontSizeToBigger,
    setFontSizeToBiggest,
    getLayoutMode,
    setLayoutModeToLight,
    setLayoutModeToDark,
    setLayoutModeToContrast,
  } = useLayoutState();
  return (
    <Fragment>
      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <NavigationMainDesktop
          getLinkData={getLinkData}
          hideAllSubmenus={hideAllSubmenus}
          getLayoutMode={getLayoutMode}
          getIsGroupsSubmenuVisible={getIsGroupsSubmenuVisible}
          toggleIsGroupsSubmenuVisible={toggleIsGroupsSubmenuVisible}
          getIsAboutSubmenuVisible={getIsAboutSubmenuVisible}
          toggleIsAboutSubmenuVisible={toggleIsAboutSubmenuVisible}
          getSocialLinkData={getSocialLinkData}
        />

        <NavigationAccessibilityDesktop
          getIsAccessibilityNavigationVisible={
            getIsAccessibilityNavigationVisible
          }
          setFontSizeToNormal={setFontSizeToNormal}
          getFontSize={getFontSize}
          setFontSizeToBigger={setFontSizeToBigger}
          setFontSizeToBiggest={setFontSizeToBiggest}
          getLayoutMode={getLayoutMode}
          setLayoutModeToLight={setLayoutModeToLight}
          setLayoutModeToDark={setLayoutModeToDark}
          setLayoutModeToContrast={setLayoutModeToContrast}
          setIsAccessibilityNavigationVisible_ToTrue={
            setIsAccessibilityNavigationVisible_ToTrue
          }
          setIsAccessibilityNavigationVisible_ToFalse={
            setIsAccessibilitySubmenuVisible_ToFalse
          }
        />
      </motion.div>
    </Fragment>
  );
}
