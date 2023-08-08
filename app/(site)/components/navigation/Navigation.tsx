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
              <div className="relative">
                <NavigationButton
                  buttonName="grupy artystyczne"
                  idForAriaControls="options_groups"
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
              <div className="relative">
                <NavigationButton
                  buttonName="o nas"
                  idForAriaControls="options_about"
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
          </ul>
        </div>
      </nav>

      <div className="absolute w-full">
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
            <li className="flex flex-col">
              <div className="font-base-regular">Dla niedowidzących</div>
              <ul className="flex gap-4">
                <li>
                  <IconButton
                    iconDefaultUrl="font-small-sm_default.svg"
                    iconHoverUrl="font-small-sm_hover.svg"
                    actionFn={layoutState.setFontSizeToNormal}
                  />
                </li>
                <li>
                  <IconButton
                    iconDefaultUrl="font-bigger-sm_default.svg"
                    iconHoverUrl="font-bigger-sm_hover.svg"
                    actionFn={layoutState.setFontSizeToBigger}
                  />
                </li>
                <li>
                  <IconButton
                    iconDefaultUrl="font-biggest-sm_default.svg"
                    iconHoverUrl="font-biggest-sm_hover.svg"
                    actionFn={layoutState.setFontSizeToBiggest}
                  />
                </li>
              </ul>
            </li>

            {/*  zmiana kolorów / kontrastu */}
            <li className="flex flex-col">
              {/* <div className="font-base-regular">Dla niedowidzących</div> */}
              <ul className="flex gap-4">
                <li>
                  <IconButton
                    iconDefaultUrl="layout-light-sm_default.svg"
                    iconHoverUrl="layout-light-sm_hover.svg"
                    actionFn={layoutState.setFontSizeToNormal}
                  />
                </li>
                <li>
                  <IconButton
                    iconDefaultUrl="font-bigger-sm_default.svg"
                    iconHoverUrl="font-bigger-sm_hover.svg"
                    actionFn={layoutState.setFontSizeToBigger}
                  />
                </li>
                <li>
                  <IconButton
                    iconDefaultUrl="font-biggest-sm_default.svg"
                    iconHoverUrl="font-biggest-sm_hover.svg"
                    actionFn={layoutState.setFontSizeToBiggest}
                  />
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      <div id="main_content"></div>
    </Fragment>
  );
}
