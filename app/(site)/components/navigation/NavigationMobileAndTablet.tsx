'use client';

import { useLayoutState } from '@/context/layoutState';
import { useNavigationState } from '@/context/navigationState';
import { containerVariant, mobileVariant } from '@/lib/animations/variants';
import { TCurrentDevice } from '@/types';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import IconButton from '../IconButton';
import CloseIcon from '../icons/CloseIcon';
import FacebookIcon from '../icons/FacebookIcon';
import HamburgerIcon from '../icons/HamburgerIcon';
import HandicapIcon from '../icons/HandicapIcon';
import InstagramIcon from '../icons/InstagramIcon';
import PrevIcon from '../icons/PrevIcon';
import YoutubeIcon from '../icons/YoutubeIcon';
import NavigationButton from './NavigationButton';
import NavigationLink from './NavigationLink';

type Props = {
  getCurrentDevice: () => TCurrentDevice;
};

export default function NavigationMobileAndTablet(props: Props) {
  ////vars
  const {
    getLinkData,
    getSocialLinkData,
    getIsAboutSubmenuVisible,
    getIsGroupsSubmenuVisible,
    getIsMobileAccessibilitySubMenuVisible,
    toggleIsAboutSubmenuVisible,
    toggleIsGroupsSubmenuVisible,
    hideAllSubmenus,
    getIsMobileMenuFirstLevelVisible,
    getIsMobileAboutSubMenuVisible,
    getIsMobileGroupsSubMenuVisible,
    setIsMobileMenuFirstLevelVisible_ToBeVisible,
    setIsAccessibilitySubmenuVisible_ToTrue,
    setIsAccessibilitySubmenuVisibleForMobile_ToFalse,
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
            ' mx-mobile-margin'
            // getCurrentDevice() === 'MOBILE'
            //   ? // ? 'ml-mobile-margin mr-mobile-margin'
            //     'mx-mobile-margin'
            //   : '',
            // getCurrentDevice() === 'TABLET' ? 'ml-tablet-margin' : ''
          )}
          aria-labelledby="main_navigation_heading"
        >
          <h2 id="main_navigation_heading" className="sr-only">
            nawigacja główna
          </h2>
          <div className="flex items-start justify-between h-32">
            <Link href="/" className="mt-10" aria-label="Strona główna">
              <span aria-hidden="true">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}artck_logo.svg`}
                  width={77}
                  height={24}
                  alt="ART CK logo"
                />
              </span>
              <span className="sr-only">Strona główna</span>
            </Link>
            <div
              className={clsx(
                'absolute top-[33px]',
                getCurrentDevice() === 'MOBILE'
                  ? 'right-mobile-for-absolute-margin'
                  : '',
                getCurrentDevice() === 'TABLET'
                  ? 'right-tablet-for-absolute-margin'
                  : ''
              )}
            >
              <HamburgerIcon
                alt="Hamburger menu"
                size="BIG"
                actionFn={setIsMobileMenuFirstLevelVisible_ToBeVisible}
              />
            </div>
          </div>

          {/* navigation - first level - start */}
          <AnimatePresence mode="wait">
            {getIsMobileMenuFirstLevelVisible() ? (
              <motion.div
                variants={mobileVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute top-0 bottom-0 left-0 right-0 z-10 w-screen h-screen bg-skin-main-bg"
                // style={{
                //   left: getIsMobileMenuFirstLevelVisible()
                //     ? getIsAnyOfSecondLevelSubmenusVisible()
                //       ? '-80%'
                //       : '0%'
                //     : '100%',
                //   visibility: getIsMobileMenuFirstLevelVisible()
                //     ? 'visible'
                //     : 'hidden',
                // }}
              >
                <div className="bg-skin-fill">
                  <ul
                    className={clsx(
                      'flex flex-col items-end justify-center h-screen',
                      getCurrentDevice() === 'MOBILE' ? 'px-mobile-margin' : '',
                      getCurrentDevice() === 'TABLET' ? 'mx-tablet-margin' : ''
                    )}
                  >
                    <li>
                      <NavigationLink
                        url={getLinkData('news')?.path!}
                        hideAllSubmenus={hideAllSubmenus}
                        isCurrentlyUsed={getLinkData('news')?.isCurrentlyUsed!}
                        nameToBeDisplayed={
                          getLinkData('news')?.nameToBeDisplayed!
                        }
                        isMobileLink={true}
                      />
                    </li>
                    <li>
                      <NavigationLink
                        url={getLinkData('events')?.path!}
                        hideAllSubmenus={hideAllSubmenus}
                        isCurrentlyUsed={
                          getLinkData('events')?.isCurrentlyUsed!
                        }
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

                    <li>
                      <div className="z-20">
                        <NavigationButton
                          buttonName="grupy artystyczne"
                          idForAriaControls="options_groups"
                          layoutState={getLayoutMode()}
                          getIsSubmenuVisible={getIsGroupsSubmenuVisible}
                          toggleIsSubmenuVisible={toggleIsGroupsSubmenuVisible}
                          isMobileButton={true}
                          idToJumpWhenButtonClicked={idGroupsSubmenuMenu}
                        />
                      </div>
                    </li>

                    <li>
                      <div className="z-20">
                        <NavigationButton
                          buttonName="o nas"
                          idForAriaControls="options_about"
                          layoutState={getLayoutMode()}
                          getIsSubmenuVisible={getIsAboutSubmenuVisible}
                          toggleIsSubmenuVisible={toggleIsAboutSubmenuVisible}
                          isMobileButton={true}
                          idToJumpWhenButtonClicked={idAboutSubmenuMenu}
                        />
                      </div>
                    </li>
                    <li>
                      <NavigationLink
                        url={getLinkData('bistro')?.path!}
                        hideAllSubmenus={hideAllSubmenus}
                        isCurrentlyUsed={
                          getLinkData('bistro')?.isCurrentlyUsed!
                        }
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
                        isCurrentlyUsed={
                          getLinkData('contact')?.isCurrentlyUsed!
                        }
                        nameToBeDisplayed={
                          getLinkData('contact')?.nameToBeDisplayed!
                        }
                        isMobileLink={true}
                      />
                    </li>
                    <ul className="flex items-center justify-end gap-[5px] mt-4">
                      <li>
                        <FacebookIcon
                          alt="Facebook"
                          size="BIG"
                          url={getSocialLinkData('FACEBOOK')!.path}
                        />
                      </li>
                      <li>
                        <InstagramIcon
                          alt="Instagram"
                          size="BIG"
                          url={getSocialLinkData('INSTAGRAM')!.path}
                        />
                      </li>
                      <li>
                        <YoutubeIcon
                          alt="Youtube"
                          size="BIG"
                          url={getSocialLinkData('YOUTUBE')!.path}
                        />
                      </li>
                      <div className="separator-vertical"></div>
                      <li>
                        <HandicapIcon
                          size="BIG"
                          alt="Narzędzia ułatwiające dostępność treści."
                          actionFn={setIsAccessibilitySubmenuVisible_ToTrue}
                          additionalClasses="mt-2 -ml-[3px]"
                        />
                      </li>
                    </ul>
                    <li className="absolute top-[30px]">
                      <CloseIcon
                        alt="Zamknij mobilne menu."
                        actionFn={hideAllSubmenus}
                      />
                    </li>
                  </ul>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
          {/* navigation - first level - end */}

          {/* groups submenu - start */}
          <AnimatePresence mode="wait">
            {getIsMobileGroupsSubMenuVisible() ? (
              <motion.div
                variants={mobileVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute top-0 bottom-0 left-0 right-0 z-10 w-screen h-screen bg-skin-main-bg"
                id={idGroupsSubmenuMenu}
              >
                <div className="absolute top-0 w-screen h-screen bg-skin-fill ">
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
                          getLinkData('groups_marzenie_mini_mini')
                            ?.isCurrentlyUsed!
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
                          getLinkData('groups_hipnoteria_bis')
                            ?.nameToBeDisplayed!
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
                    <li className="absolute top-[30px]">
                      <PrevIcon
                        alt="Zamknij mobilne menu."
                        actionFn={toggleIsGroupsSubmenuVisible}
                      />
                    </li>
                  </ul>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
          {/* groups submenu - end */}

          {/* about submenu - start */}
          <AnimatePresence mode="wait">
            {getIsMobileAboutSubMenuVisible() ? (
              <motion.div
                variants={mobileVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute top-0 bottom-0 left-0 right-0 z-10 w-screen h-screen bg-skin-main-bg "
                id={idAboutSubmenuMenu}
                // style={{
                //   left: getIsMobileAboutSubMenuVisible() ? '0%' : '100%',
                //   visibility: getIsMobileAboutSubMenuVisible()
                //     ? 'visible'
                //     : 'hidden',
                // }}
              >
                <div className="absolute top-0 w-screen h-screen bg-skin-fill">
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
                        url={
                          getLinkData('about_availability_declarations')?.path!
                        }
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
                        isCurrentlyUsed={
                          getLinkData('contact')?.isCurrentlyUsed!
                        }
                        nameToBeDisplayed={
                          getLinkData('contact')?.nameToBeDisplayed!
                        }
                        isMobileLink={true}
                      />
                    </li>
                    <li className="absolute top-[30px]">
                      <PrevIcon
                        alt="Zamknij mobilne menu."
                        actionFn={toggleIsAboutSubmenuVisible}
                      />
                    </li>
                  </ul>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
          {/* about submenu - end */}

          {/* accessibility submenu - start */}
          <AnimatePresence mode="wait">
            {getIsMobileAccessibilitySubMenuVisible() ? (
              <motion.div
                variants={mobileVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                // className="absolute top-0 bottom-0 left-0 right-0 w-screen h-screen bg-skin-main-bg"
                className="absolute top-0 bottom-0 left-0 right-0 z-10 w-screen h-screen bg-skin-main-bg"
                id={idAccessibilitySubmenuMenu}
              >
                <div className="absolute top-0 w-screen h-screen">
                  <ul
                    id="options_accessibility"
                    className={clsx(
                      'flex flex-col items-end justify-center h-full my-auto',
                      getCurrentDevice() === 'MOBILE' ? 'mx-mobile-margin' : '',
                      getCurrentDevice() === 'TABLET' ? 'mx-tablet-margin' : ''
                    )}
                  >
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

                    <li className="flex flex-col items-end mt-11">
                      <h4 className="font-base-regular">
                        Kolorystyka / kontrast
                      </h4>
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
                    <li className="absolute top-[30px]">
                      <PrevIcon
                        alt="Zamknij mobilne menu."
                        actionFn={
                          setIsAccessibilitySubmenuVisibleForMobile_ToFalse
                        }
                      />
                    </li>
                  </ul>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
          {/* accessibility submenu - end */}
        </motion.nav>
      </AnimatePresence>
    </Fragment>
  );
}
