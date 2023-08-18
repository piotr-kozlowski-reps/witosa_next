import { useLayoutState } from '@/context/layoutState';
import { useNavigationState } from '@/context/navigationState';
import { containerVariant } from '@/lib/animations/variants';
import { TCurrentDevice } from '@/types';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { Fragment } from 'react';
import IconButton from '../IconButton';
import NavigationButton from './NavigationButton';
import NavigationLink from './NavigationLink';

type Props = {
  getCurrentDevice: () => TCurrentDevice;
};

// const pixelMoveContainerAmount = 50;
// const variants = {
//   hidden: { y: Number(`${pixelMoveContainerAmount}`), opacity: 0 },
//   visible: { y: 0, opacity: 1 },
// };

export default function NavigationMobileAndTablet(props: Props) {
  ////vars
  const {
    getLinkData,
    getIsAboutSubmenuVisible,
    getIsGroupsSubmenuVisible,
    getIsMobileAccessibilitySubMenuVisible,
    toggleIsAboutSubmenuVisible,
    toggleIsGroupsSubmenuVisible,
    hideAllSubmenus,
    getIsMobileMenuFirstLevelVisible,
    getIsMobileAboutSubMenuVisible,
    getIsAnyOfSecondLevelSubmenusVisible,
    getIsMobileGroupsSubMenuVisible,
    setIsMobileMenuFirstLevelVisible_ToBeVisible,
    setIsAccessibilitySubmenuVisible_ToTrue,
    setIsAccessibilitySubmenuVisible_ToFalse,
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

  const { getCurrentDevice } = props;

  const idGroupsSubmenuMenu = 'mobile_groups_submenu';
  const idAboutSubmenuMenu = 'mobile_about_submenu';
  const idAccessibilitySubmenuMenu = 'accessibility_navigation';

  ////tsx
  return (
    <Fragment>
      <AnimatePresence mode="wait">
        <motion.nav
          variants={containerVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={clsx(
            'w-full',
            getCurrentDevice() === 'MOBILE' ? 'ml-mobile-margin' : '',
            getCurrentDevice() === 'TABLET' ? 'ml-tablet-margin' : ''
          )}
          aria-labelledby="main_navigation_heading"
        >
          <h2 id="main_navigation_heading" className="sr-only">
            nawigacja główna
          </h2>
          <div className="flex items-start justify-between h-32">
            <button onClick={() => {}} className="mt-10">
              <span aria-hidden="true">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}artck_logo.svg`}
                  width={77}
                  height={24}
                  alt="ART CK logo"
                />
              </span>
              <span className="sr-only">Strona główna</span>
            </button>
            <div
              className={clsx(
                'absolute top-[30px]',
                getCurrentDevice() === 'MOBILE'
                  ? 'right-mobile-for-absolute-margin'
                  : '',
                getCurrentDevice() === 'TABLET'
                  ? 'right-tablet-for-absolute-margin'
                  : ''
              )}
            >
              <IconButton
                isCurrentlyActive={false}
                iconDefaultUrl="hamburger-l_default.svg"
                iconHoverUrl="hamburger-l_hover.svg"
                alt="Hamburger menu"
                size="BIG"
                actionFn={setIsMobileMenuFirstLevelVisible_ToBeVisible}
              />
            </div>
          </div>

          {/* navigation - first level - start */}
          <div
            className="absolute top-0 bottom-0 w-screen h-screen transition-all"
            style={{
              left: getIsMobileMenuFirstLevelVisible()
                ? getIsAnyOfSecondLevelSubmenusVisible()
                  ? '-80%'
                  : '0%'
                : '100%',
              visibility: getIsMobileMenuFirstLevelVisible()
                ? 'visible'
                : 'hidden',
            }}
          >
            <div className="w-full h-full bg-skin-fill">
              <ul
                className={clsx(
                  'flex flex-col items-end justify-center h-screen my-auto',
                  getCurrentDevice() === 'MOBILE' ? 'mx-mobile-margin' : '',
                  getCurrentDevice() === 'TABLET' ? 'mx-tablet-margin' : ''
                )}
              >
                <li>
                  <NavigationLink
                    url={getLinkData('news')?.path!}
                    hideAllSubmenus={hideAllSubmenus}
                    isCurrentlyUsed={getLinkData('news')?.isCurrentlyUsed!}
                    nameToBeDisplayed={getLinkData('news')?.nameToBeDisplayed!}
                    isMobileLink={true}
                  />
                </li>
                <li>
                  <NavigationLink
                    url={getLinkData('events')?.path!}
                    hideAllSubmenus={hideAllSubmenus}
                    isCurrentlyUsed={getLinkData('events')?.isCurrentlyUsed!}
                    nameToBeDisplayed={
                      getLinkData('events')?.nameToBeDisplayed!
                    }
                    isMobileLink={true}
                  />
                </li>
                <li>
                  <NavigationLink
                    url={getLinkData('activities')?.path!}
                    hideAllSubmenus={hideAllSubmenus}
                    isCurrentlyUsed={
                      getLinkData('activities')?.isCurrentlyUsed!
                    }
                    nameToBeDisplayed={
                      getLinkData('activities')?.nameToBeDisplayed!
                    }
                    isMobileLink={true}
                  />
                </li>

                {/* groups */}
                <li>
                  <div className="z-20">
                    <NavigationButton
                      buttonName="grupy artystyczne"
                      idForAriaControls="options_groups"
                      layoutState={getLayoutMode()}
                      getIsSubmenuVisible={getIsGroupsSubmenuVisible}
                      toggleIsSubmenuVisible={toggleIsGroupsSubmenuVisible}
                      isMobileButton={true}
                      // idToJumpWhenButtonClicked={idGroupsSubmenuMenu}
                    />
                  </div>
                </li>

                {/* about */}
                <li>
                  <div className="z-20">
                    <NavigationButton
                      buttonName="o nas"
                      idForAriaControls="options_about"
                      layoutState={getLayoutMode()}
                      getIsSubmenuVisible={getIsAboutSubmenuVisible}
                      toggleIsSubmenuVisible={toggleIsAboutSubmenuVisible}
                      isMobileButton={true}
                      // idToJumpWhenButtonClicked={idAboutSubmenuMenu}
                    />
                  </div>
                </li>

                <li>
                  <NavigationLink
                    url={getLinkData('bistro')?.path!}
                    hideAllSubmenus={hideAllSubmenus}
                    isCurrentlyUsed={getLinkData('bistro')?.isCurrentlyUsed!}
                    nameToBeDisplayed={
                      getLinkData('bistro')?.nameToBeDisplayed!
                    }
                    isMobileLink={true}
                  />
                </li>

                <li>
                  <NavigationLink
                    url={getLinkData('contact')?.path!}
                    hideAllSubmenus={hideAllSubmenus}
                    isCurrentlyUsed={getLinkData('contact')?.isCurrentlyUsed!}
                    nameToBeDisplayed={
                      getLinkData('contact')?.nameToBeDisplayed!
                    }
                    isMobileLink={true}
                  />
                </li>

                {/* internal socials ul  */}
                <ul className="flex items-center justify-end gap-4 mt-4">
                  <li>
                    <IconButton
                      isCurrentlyActive={false}
                      iconDefaultUrl="facebook-xsm_default.svg"
                      iconHoverUrl="facebook-xsm_hover.svg"
                      alt="Facebook"
                      size="BIG"
                      actionFn={() => alert('go to facebook - not implemented')} //TODO: link facebook
                    />
                  </li>
                  <li>
                    <IconButton
                      isCurrentlyActive={false}
                      iconDefaultUrl="instagram-xsm_default.svg"
                      iconHoverUrl="instagram-xsm_hover.svg"
                      alt="Instagram"
                      size="BIG"
                      actionFn={() =>
                        alert('go to instagram - not implemented')
                      } //TODO: link instagram
                    />
                  </li>
                  <li>
                    <IconButton
                      isCurrentlyActive={false}
                      iconDefaultUrl="youtube-xsm_default.svg"
                      iconHoverUrl="youtube-xsm_hover.svg"
                      alt="Youtube"
                      size="BIG"
                      actionFn={() => alert('go to youtube - not implemented')} //TODO: link youtube
                    />
                  </li>
                  <div className="separator-vertical"></div>
                  <li>
                    <IconButton
                      isCurrentlyActive={false}
                      iconDefaultUrl="handicap-sm_default.svg"
                      iconHoverUrl="handicap-sm_hover.svg"
                      alt="Youtube"
                      size="BIG"
                      actionFn={setIsAccessibilitySubmenuVisible_ToTrue}
                    />
                  </li>

                  {/* close menu */}
                  <li className="absolute top-8">
                    <IconButton
                      isCurrentlyActive={false}
                      iconDefaultUrl="close-sm_default.svg"
                      iconHoverUrl="close-sm_hover.svg"
                      alt="Zamknij mobilne menu."
                      size="BIG"
                      actionFn={hideAllSubmenus}
                    />
                  </li>
                </ul>
              </ul>
            </div>
          </div>
          {/* navigation - first level - end */}

          {/* groups submenu - start */}
          <div
            className="absolute top-0 bottom-0 left-0 right-0 w-screen h-screen transition-all"
            id={idGroupsSubmenuMenu}
            style={{
              left: getIsMobileGroupsSubMenuVisible() ? '0%' : '100%',
              visibility: getIsMobileGroupsSubMenuVisible()
                ? 'visible'
                : 'hidden',
            }}
          >
            <div className="absolute top-0 w-screen h-screen bg-skin-fill drop-shadow-big">
              <ul
                id="options_groups"
                className={clsx(
                  'flex flex-col items-end justify-center h-full my-auto',
                  getCurrentDevice() === 'MOBILE' ? 'mx-mobile-margin' : '',
                  getCurrentDevice() === 'TABLET' ? 'mx-tablet-margin' : ''
                )}
              >
                <li>
                  <NavigationLink
                    url={getLinkData('groups_marzenie_mini_mini')?.path!}
                    hideAllSubmenus={hideAllSubmenus}
                    isCurrentlyUsed={
                      getLinkData('groups_marzenie_mini_mini')?.isCurrentlyUsed!
                    }
                    nameToBeDisplayed={
                      getLinkData('groups_marzenie_mini_mini')
                        ?.nameToBeDisplayed!
                    }
                    isMobileLink={true}
                  />
                </li>

                <li>
                  <NavigationLink
                    url={getLinkData('groups_marzenie_bis')?.path!}
                    hideAllSubmenus={hideAllSubmenus}
                    isCurrentlyUsed={
                      getLinkData('groups_marzenie_bis')?.isCurrentlyUsed!
                    }
                    nameToBeDisplayed={
                      getLinkData('groups_marzenie_bis')?.nameToBeDisplayed!
                    }
                    isMobileLink={true}
                  />
                </li>

                <li>
                  <NavigationLink
                    url={getLinkData('groups_marzenie')?.path!}
                    hideAllSubmenus={hideAllSubmenus}
                    isCurrentlyUsed={
                      getLinkData('groups_marzenie')?.isCurrentlyUsed!
                    }
                    nameToBeDisplayed={
                      getLinkData('groups_marzenie')?.nameToBeDisplayed!
                    }
                    isMobileLink={true}
                  />
                </li>

                <li>
                  <NavigationLink
                    url={getLinkData('groups_hipnoteria_bis')?.path!}
                    hideAllSubmenus={hideAllSubmenus}
                    isCurrentlyUsed={
                      getLinkData('groups_hipnoteria_bis')?.isCurrentlyUsed!
                    }
                    nameToBeDisplayed={
                      getLinkData('groups_hipnoteria_bis')?.nameToBeDisplayed!
                    }
                    isMobileLink={true}
                  />
                </li>

                <li>
                  <NavigationLink
                    url={getLinkData('groups_hipnoteria')?.path!}
                    hideAllSubmenus={hideAllSubmenus}
                    isCurrentlyUsed={
                      getLinkData('groups_hipnoteria')?.isCurrentlyUsed!
                    }
                    nameToBeDisplayed={
                      getLinkData('groups_hipnoteria')?.nameToBeDisplayed!
                    }
                    isMobileLink={true}
                  />
                </li>

                <li
                  className={clsx(
                    'absolute top-8',
                    getCurrentDevice() === 'MOBILE'
                      ? 'right-mobile-for-absolute-margin'
                      : '',
                    getCurrentDevice() === 'TABLET'
                      ? 'right-mobile-for-absolute-margin'
                      : ''
                  )}
                >
                  <IconButton
                    isCurrentlyActive={false}
                    iconDefaultUrl="prev-sm_default.svg"
                    iconHoverUrl="prev-sm_hover.svg"
                    alt="Wróc do menu głównego."
                    size="BIG"
                    actionFn={toggleIsGroupsSubmenuVisible}
                  />
                </li>
              </ul>
            </div>
          </div>
          {/* groups submenu - end */}

          {/* about submenu - start */}
          <div
            className="absolute top-0 bottom-0 left-0 right-0 w-screen h-screen transition-all"
            id={idAboutSubmenuMenu}
            style={{
              left: getIsMobileAboutSubMenuVisible() ? '0%' : '100%',
              visibility: getIsMobileAboutSubMenuVisible()
                ? 'visible'
                : 'hidden',
            }}
          >
            <div className="absolute top-0 w-screen h-screen bg-skin-fill drop-shadow-big">
              <ul
                id="options_groups"
                className={clsx(
                  'flex flex-col items-end justify-center h-full my-auto',
                  getCurrentDevice() === 'MOBILE' ? 'mx-mobile-margin' : '',
                  getCurrentDevice() === 'TABLET' ? 'mx-tablet-margin' : ''
                )}
              >
                <li>
                  <NavigationLink
                    url={getLinkData('about_about')?.path!}
                    hideAllSubmenus={hideAllSubmenus}
                    isCurrentlyUsed={
                      getLinkData('about_about')?.isCurrentlyUsed!
                    }
                    nameToBeDisplayed={
                      getLinkData('about_about')?.nameToBeDisplayed!
                    }
                    isMobileLink={true}
                  />
                </li>

                <li>
                  <NavigationLink
                    url={getLinkData('about_rent')?.path!}
                    hideAllSubmenus={hideAllSubmenus}
                    isCurrentlyUsed={
                      getLinkData('about_rent')?.isCurrentlyUsed!
                    }
                    nameToBeDisplayed={
                      getLinkData('about_rent')?.nameToBeDisplayed!
                    }
                    isMobileLink={true}
                  />
                </li>

                <li>
                  <NavigationLink
                    url={getLinkData('about_regulations')?.path!}
                    hideAllSubmenus={hideAllSubmenus}
                    isCurrentlyUsed={
                      getLinkData('about_regulations')?.isCurrentlyUsed!
                    }
                    nameToBeDisplayed={
                      getLinkData('about_regulations')?.nameToBeDisplayed!
                    }
                    isMobileLink={true}
                  />
                </li>

                <li>
                  <NavigationLink
                    url={getLinkData('about_availability_declarations')?.path!}
                    hideAllSubmenus={hideAllSubmenus}
                    isCurrentlyUsed={
                      getLinkData('about_availability_declarations')
                        ?.isCurrentlyUsed!
                    }
                    nameToBeDisplayed={
                      getLinkData('about_availability_declarations')
                        ?.nameToBeDisplayed!
                    }
                    isMobileLink={true}
                  />
                </li>

                <li>
                  <NavigationLink
                    url={getLinkData('about_rodo')?.path!}
                    hideAllSubmenus={hideAllSubmenus}
                    isCurrentlyUsed={
                      getLinkData('about_rodo')?.isCurrentlyUsed!
                    }
                    nameToBeDisplayed={
                      getLinkData('about_rodo')?.nameToBeDisplayed!
                    }
                    isMobileLink={true}
                  />
                </li>

                <li>
                  <NavigationLink
                    url={getLinkData('contact')?.path!}
                    hideAllSubmenus={hideAllSubmenus}
                    isCurrentlyUsed={getLinkData('contact')?.isCurrentlyUsed!}
                    nameToBeDisplayed={
                      getLinkData('contact')?.nameToBeDisplayed!
                    }
                    isMobileLink={true}
                  />
                </li>

                <li
                  className={clsx(
                    'absolute top-8',
                    getCurrentDevice() === 'MOBILE'
                      ? 'right-mobile-for-absolute-margin'
                      : '',
                    getCurrentDevice() === 'TABLET'
                      ? 'right-tablet-for-absolute-margin'
                      : ''
                  )}
                >
                  <IconButton
                    isCurrentlyActive={false}
                    iconDefaultUrl="prev-sm_default.svg"
                    iconHoverUrl="prev-sm_hover.svg"
                    alt="Wróc do menu głównego."
                    size="BIG"
                    actionFn={toggleIsAboutSubmenuVisible}
                  />
                </li>
              </ul>
            </div>
          </div>
          {/* about submenu - end */}

          {/* accessibility submenu - start */}
          <div
            className="absolute top-0 bottom-0 left-0 right-0 w-screen h-screen transition-all"
            id={idAccessibilitySubmenuMenu}
            style={{
              left: getIsMobileAccessibilitySubMenuVisible() ? '0%' : '100%',
              visibility: getIsMobileAccessibilitySubMenuVisible()
                ? 'visible'
                : 'hidden',
            }}
          >
            <div className="absolute top-0 w-screen h-screen bg-skin-fill drop-shadow-big">
              <ul
                id="options_accessibility"
                className={clsx(
                  'flex flex-col items-end justify-center h-full my-auto',
                  getCurrentDevice() === 'MOBILE' ? 'mx-mobile-margin' : '',
                  getCurrentDevice() === 'TABLET' ? 'mx-tablet-margin' : ''
                )}
              >
                {/* dla niedowidzących - zmiana wielkosci fonta */}
                <li className="flex flex-col items-end">
                  <h4 className="font-base-regular">Dla niedowidzących</h4>
                  <ul className="flex justify-end gap-4 mt-4">
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
                <li className="flex flex-col items-end mt-11">
                  <h4 className="font-base-regular">Kolorystyka / kontrast</h4>
                  <ul className="flex justify-end gap-4 mt-4">
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

                <li
                  className={clsx(
                    'absolute top-8',
                    getCurrentDevice() === 'MOBILE'
                      ? 'right-mobile-for-absolute-margin'
                      : '',
                    getCurrentDevice() === 'TABLET'
                      ? 'right-tablet-for-absolute-margin'
                      : ''
                  )}
                >
                  <IconButton
                    isCurrentlyActive={false}
                    iconDefaultUrl="prev-sm_default.svg"
                    iconHoverUrl="prev-sm_hover.svg"
                    alt="Wróc do menu głównego."
                    size="BIG"
                    actionFn={setIsAccessibilitySubmenuVisible_ToFalse}
                  />
                </li>
              </ul>
            </div>
          </div>
          {/* accessibility submenu - end */}
        </motion.nav>
      </AnimatePresence>
    </Fragment>
  );
}
