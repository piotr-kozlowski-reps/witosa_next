import { useLayoutState } from '@/context/layoutState';
import { useNavigationState } from '@/context/navigationState';
import { TCurrentDevice } from '@/types';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import IconButton from '../IconButton';
import NavigationButton from './NavigationButton';
import NavigationLink from './NavigationLink';

type Props = {
  getCurrentDevice: () => TCurrentDevice;
};

export default function NavigationMobileAndTablet(props: Props) {
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
  const mobileMargin = 'mx-3';
  const tabletMargin = 'mx-8';

  ////tsx
  return (
    <Fragment>
      <nav
        className={
          (clsx('w-full bg-skin-fill'),
          getCurrentDevice() === 'MOBILE' ? mobileMargin : tabletMargin)
        }
        aria-labelledby="main_navigation_heading"
      >
        <h2 id="main_navigation_heading" className="sr-only">
          nawigacja główna
        </h2>
        <div className="flex items-start justify-between h-32">
          <div className="mt-10">
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
          </div>
          <div className="mt-[30px]">
            <IconButton
              isCurrentlyActive={false}
              iconDefaultUrl="hamburger-l_default.svg"
              iconHoverUrl="hamburger-l_hover.svg"
              alt="Hamburger menu"
              size="BIG"
              actionFn={() => alert('hamburger open - not implemented')}
            />
          </div>
        </div>

        {/* navigation - first level */}
        <div className="absolute top-0 bottom-0 left-0 right-0 w-screen h-screen">
          <div className="w-full h-full bg-skin-fill">
            <ul className="flex flex-col items-end justify-center h-screen my-auto mr-8">
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
                  nameToBeDisplayed={getLinkData('events')?.nameToBeDisplayed!}
                  isMobileLink={true}
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
                  />
                  {/* <ul
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
                        url={
                          getLinkData('groups_zajecia_utaneczniajace')?.path!
                        }
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
                          getLinkData('groups_hipnoteria_bis')
                            ?.nameToBeDisplayed!
                        }
                      />
                    </li>
                  </ul> */}
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
                  />
                  {/* <ul
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
                </ul> */}
                </div>
              </li>

              <li>
                <NavigationLink
                  url={getLinkData('bistro')?.path!}
                  hideAllSubmenus={hideAllSubmenus}
                  isCurrentlyUsed={getLinkData('bistro')?.isCurrentlyUsed!}
                  nameToBeDisplayed={getLinkData('bistro')?.nameToBeDisplayed!}
                  isMobileLink={true}
                />
              </li>

              <li>
                <NavigationLink
                  url={getLinkData('contact')?.path!}
                  hideAllSubmenus={hideAllSubmenus}
                  isCurrentlyUsed={getLinkData('contact')?.isCurrentlyUsed!}
                  nameToBeDisplayed={getLinkData('contact')?.nameToBeDisplayed!}
                  isMobileLink={true}
                />
              </li>

              <div className="separator-horizontal"></div>

              {/* internal socials ul  */}
              <ul className="flex items-center justify-end gap-4">
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
                    actionFn={() => alert('go to instagram - not implemented')} //TODO: link instagram
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
                    actionFn={() =>
                      alert('show accessibility menu - not implemented')
                    } //TODO: show accessibility menu
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
                    actionFn={() => alert('hamburger close - not implemented')}
                  />
                </li>
              </ul>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}
