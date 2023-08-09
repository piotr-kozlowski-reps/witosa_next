'use client';

import { useLayoutState } from '@/context/layoutState';
import { useNavigationState } from '@/context/navigationState';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import IconButton from '../IconButton';
import NavigationButton from './NavigationButton';
import NavigationLink from './NavigationLink';

export default function Navigation() {
  ////vars
  const {
    getLinkData,
    getIsAboutSubmenuVisible,
    getIsGroupsSubmenuVisible,
    toggleIsAboutSubmenuVisible,
    toggleIsGroupsSubmenuVisible,
    hideAllSubmenus,
    getIsAccessibilityNavigationVisible,
    setIsAccessibilityNavigationVisible_ToTrue,
    setIsAccessibilityNavigationVisible_ToFalse,
  } = useNavigationState();

  const layoutState = useLayoutState();

  // const signOutHandler = () => {
  //   console.log('signOut');
  //   signOut();
  // };

  ////tsx
  return (
    <Fragment>
      <nav
        className="relative flex items-start justify-between h-32 bg-skin-fill desktop-container"
        aria-labelledby="main_navigation_heading"
      >
        <h2 id="main_navigation_heading" className="sr-only">
          nawigacja główna
        </h2>
        <ul className="mt-10">
          <li>
            <span aria-hidden="true">
              <Link href={'/'}>
                <Image
                  src="artck_logo.svg"
                  width={77}
                  height={24}
                  alt="ART CK logo"
                />
              </Link>
            </span>
            <span className="sr-only">Strona główna</span>
          </li>
        </ul>
        <div className="absolute right-0 bottom-[55px]">
          <ul className="flex gap-6">
            <li>
              <NavigationLink
                url={getLinkData('news')?.path!}
                hideAllSubmenus={hideAllSubmenus}
                isCurrentlyUsed={getLinkData('news')?.isCurrentlyUsed!}
                nameToBeDisplayed={getLinkData('news')?.nameToBeDisplayed!}
              />
            </li>

            <li>
              <NavigationLink
                url={getLinkData('events')?.path!}
                hideAllSubmenus={hideAllSubmenus}
                isCurrentlyUsed={getLinkData('events')?.isCurrentlyUsed!}
                nameToBeDisplayed={getLinkData('events')?.nameToBeDisplayed!}
              />
            </li>

            <li>
              <NavigationLink
                url={getLinkData('activities')?.path!}
                hideAllSubmenus={hideAllSubmenus}
                isCurrentlyUsed={getLinkData('activities')?.isCurrentlyUsed!}
                nameToBeDisplayed={
                  getLinkData('activities')?.nameToBeDisplayed!
                }
              />
            </li>

            {/* groups */}
            <li>
              <div className="relative z-20">
                <NavigationButton
                  buttonName="grupy artystyczne"
                  idForAriaControls="options_groups"
                  layoutState={layoutState.getLayoutMode()}
                  getIsSubmenuVisible={getIsGroupsSubmenuVisible}
                  toggleIsSubmenuVisible={toggleIsGroupsSubmenuVisible}
                />
                <ul
                  id="options_groups"
                  className={clsx(
                    'absolute left-0 px-4 submenu-container top-[26px]  flex-col gap-2 transition-all',
                    getIsGroupsSubmenuVisible() ? 'flex' : 'hidden'
                  )}
                >
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
                    />
                  </li>

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
                    />
                  </li>

                  <li>
                    <NavigationLink
                      url={getLinkData('groups_zajecia_utaneczniajace')?.path!}
                      hideAllSubmenus={hideAllSubmenus}
                      isCurrentlyUsed={
                        getLinkData('groups_zajecia_utaneczniajace')
                          ?.isCurrentlyUsed!
                      }
                      nameToBeDisplayed={
                        getLinkData('groups_zajecia_utaneczniajace')
                          ?.nameToBeDisplayed!
                      }
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
                    />
                  </li>
                </ul>
              </div>
            </li>

            {/* about */}
            <li>
              <div className="relative z-20">
                <NavigationButton
                  buttonName="o nas"
                  idForAriaControls="options_about"
                  layoutState={layoutState.getLayoutMode()}
                  getIsSubmenuVisible={getIsAboutSubmenuVisible}
                  toggleIsSubmenuVisible={toggleIsAboutSubmenuVisible}
                />
                <ul
                  id="options_about"
                  className={clsx(
                    'absolute left-0 px-4 submenu-container top-[26px]  flex-col gap-2 transition-all',
                    getIsAboutSubmenuVisible() ? 'flex' : 'hidden'
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
                    />
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <NavigationLink
                url={getLinkData('bistro')?.path!}
                hideAllSubmenus={hideAllSubmenus}
                isCurrentlyUsed={getLinkData('bistro')?.isCurrentlyUsed!}
                nameToBeDisplayed={getLinkData('bistro')?.nameToBeDisplayed!}
              />
            </li>

            <li>
              <NavigationLink
                url={getLinkData('contact')?.path!}
                hideAllSubmenus={hideAllSubmenus}
                isCurrentlyUsed={getLinkData('contact')?.isCurrentlyUsed!}
                nameToBeDisplayed={getLinkData('contact')?.nameToBeDisplayed!}
              />
            </li>
            <div className="separator-vertical"></div>
            <li className="-mt-1 ">
              <IconButton
                isCurrentlyActive={false}
                iconDefaultUrl="facebook-xsm_default.svg"
                iconHoverUrl="facebook-xsm_hover.svg"
                alt="Facebook"
                size="SMALL"
                actionFn={() => alert('go to facebook - not implemented')}
              />
            </li>
            <li className="-mt-1 -ml-1">
              <IconButton
                isCurrentlyActive={false}
                iconDefaultUrl="instagram-xsm_default.svg"
                iconHoverUrl="instagram-xsm_hover.svg"
                alt="Instagram"
                size="SMALL"
                actionFn={() => alert('go to instagram - not implemented')}
              />
            </li>
            <li className="-mt-1 -ml-1">
              <IconButton
                isCurrentlyActive={false}
                iconDefaultUrl="youtube-xsm_default.svg"
                iconHoverUrl="youtube-xsm_hover.svg"
                alt="Youtube"
                size="SMALL"
                actionFn={() => alert('go to youtube - not implemented')}
              />
            </li>
          </ul>
        </div>
      </nav>
      {/* overlay to groups button */}
      <div
        className={clsx(
          'absolute top-0 bottom-0 left-0 right-0 z-10 w-screen h-screen overlay-minimal',
          getIsGroupsSubmenuVisible() ? 'visible' : 'hidden'
        )}
        onClick={toggleIsGroupsSubmenuVisible}
      ></div>
      {/* overlay to about button */}
      <div
        className={clsx(
          'absolute top-0 bottom-0 left-0 right-0 z-10 w-screen h-screen overlay-minimal',
          getIsAboutSubmenuVisible() ? 'visible' : 'hidden'
        )}
        onClick={toggleIsAboutSubmenuVisible}
      ></div>

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
                    isCurrentlyActive={layoutState.getFontSize() === 'NORMAL'}
                    iconDefaultUrl="font-small-sm_default.svg"
                    iconHoverUrl="font-small-sm_hover.svg"
                    alt="Wielkość czcionki - normalna."
                    actionFn={layoutState.setFontSizeToNormal}
                  />
                </li>
                <li>
                  <IconButton
                    isCurrentlyActive={layoutState.getFontSize() === 'BIGGER'}
                    iconDefaultUrl="font-bigger-sm_default.svg"
                    iconHoverUrl="font-bigger-sm_hover.svg"
                    alt="Wielkość czcionki - powiększona."
                    actionFn={layoutState.setFontSizeToBigger}
                  />
                </li>
                <li>
                  <IconButton
                    isCurrentlyActive={layoutState.getFontSize() === 'BIGGEST'}
                    iconDefaultUrl="font-biggest-sm_default.svg"
                    iconHoverUrl="font-biggest-sm_hover.svg"
                    alt="Wielkość czcionki - największa."
                    actionFn={layoutState.setFontSizeToBiggest}
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
                    isCurrentlyActive={layoutState.getLayoutMode() === 'LIGHT'}
                    iconDefaultUrl="layout-light-sm_default.svg"
                    iconHoverUrl="layout-light-sm_hover.svg"
                    alt="Ustawienia kolorów - tryb jasny."
                    actionFn={layoutState.setLayoutModeToLight}
                  />
                </li>
                <li>
                  <IconButton
                    isCurrentlyActive={layoutState.getLayoutMode() === 'DARK'}
                    iconDefaultUrl="layout-dark-sm_default.svg"
                    iconHoverUrl="layout-dark-sm_hover.svg"
                    alt="Ustawienia kolorów - tryb ciemny."
                    actionFn={layoutState.setLayoutModeToDark}
                  />
                </li>
                <li>
                  <IconButton
                    isCurrentlyActive={
                      layoutState.getLayoutMode() === 'CONTRAST'
                    }
                    iconDefaultUrl="layout-contrast-sm_default.svg"
                    iconHoverUrl="layout-contrast-sm_hover.svg"
                    alt="Ustawienia kolorów - tryb kontrastowy."
                    actionFn={layoutState.setLayoutModeToContrast}
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
      <div id="main_content"></div>
    </Fragment>
  );
}
