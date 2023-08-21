import {
  overlaySubMenuVariant,
  subMenuVariant,
} from '@/lib/animations/variants';
import {
  TLink,
  TLinkName,
  TMode,
  TsocialLinkName,
  TsocialLinks,
} from '@/types';
import { ImmutableObject } from '@hookstate/core';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import FacebookIcon from '../icons/FacebookIcon';
import InstagramIcon from '../icons/InstagramIcon';
import YoutubeIcon from '../icons/YoutubeIcon';
import NavigationButton from './NavigationButton';
import NavigationLink from './NavigationLink';

interface Props {
  getSocialLinkData: (
    _socialLinkName: TsocialLinkName
  ) => ImmutableObject<ImmutableObject<TsocialLinks>> | undefined;
  getLinkData: (
    _linkName: TLinkName
  ) => ImmutableObject<ImmutableObject<TLink>> | undefined;
  hideAllSubmenus: () => void;
  getLayoutMode: () => TMode;
  getIsGroupsSubmenuVisible: () => boolean;
  toggleIsGroupsSubmenuVisible: () => void;
  getIsAboutSubmenuVisible: () => boolean;
  toggleIsAboutSubmenuVisible: () => void;
}

export default function NavigationMainDesktop(props: Props) {
  ////vars
  const {
    getLinkData,
    hideAllSubmenus,
    getLayoutMode,
    getIsGroupsSubmenuVisible,
    toggleIsGroupsSubmenuVisible,
    getIsAboutSubmenuVisible,
    toggleIsAboutSubmenuVisible,
    getSocialLinkData,
  } = props;

  ////tsx
  return (
    <Fragment>
      <nav
        className="relative flex items-start justify-between h-32 desktop-container"
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
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}artck_logo.svg`}
                  width={77}
                  height={24}
                  alt="ART CK logo"
                />
              </Link>
            </span>
            <span className="sr-only">Strona główna</span>
          </li>
        </ul>
        <div className="absolute right-0 bottom-[52px]">
          <ul className="flex gap-6">
            <li>
              <NavigationLink
                url={getLinkData('NEWS')?.path!}
                hideAllSubmenus={hideAllSubmenus}
                isCurrentlyUsed={getLinkData('NEWS')?.isCurrentlyUsed!}
                nameToBeDisplayed={getLinkData('NEWS')?.nameToBeDisplayed!}
              />
            </li>

            <li>
              <NavigationLink
                url={getLinkData('EVENTS')?.path!}
                hideAllSubmenus={hideAllSubmenus}
                isCurrentlyUsed={getLinkData('EVENTS')?.isCurrentlyUsed!}
                nameToBeDisplayed={getLinkData('EVENTS')?.nameToBeDisplayed!}
              />
            </li>

            <li>
              <NavigationLink
                url={getLinkData('CYCLICAL_ACTIVITIES')?.path!}
                hideAllSubmenus={hideAllSubmenus}
                isCurrentlyUsed={
                  getLinkData('CYCLICAL_ACTIVITIES')?.isCurrentlyUsed!
                }
                nameToBeDisplayed={
                  getLinkData('CYCLICAL_ACTIVITIES')?.nameToBeDisplayed!
                }
              />
            </li>

            {/* groups */}
            <li>
              <div className="relative z-30">
                <NavigationButton
                  buttonName="grupy artystyczne"
                  idForAriaControls="options_groups"
                  layoutState={getLayoutMode()}
                  getIsSubmenuVisible={getIsGroupsSubmenuVisible}
                  toggleIsSubmenuVisible={toggleIsGroupsSubmenuVisible}
                />
                <AnimatePresence mode="wait">
                  {getIsGroupsSubmenuVisible() ? (
                    <motion.ul
                      variants={subMenuVariant}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      id="options_groups"
                      className={clsx(
                        'absolute left-0 px-4 submenu-container top-[24px] flex-col gap-2 flex'
                      )}
                    >
                      <li>
                        <NavigationLink
                          url={getLinkData('GROUPS_MARZENIE_MINI_MINI')?.path!}
                          hideAllSubmenus={hideAllSubmenus}
                          isCurrentlyUsed={
                            getLinkData('GROUPS_MARZENIE_MINI_MINI')
                              ?.isCurrentlyUsed!
                          }
                          nameToBeDisplayed={
                            getLinkData('GROUPS_MARZENIE_MINI_MINI')
                              ?.nameToBeDisplayed!
                          }
                        />
                      </li>

                      <li>
                        <NavigationLink
                          url={getLinkData('GROUPS_MARZENIE_BIS')?.path!}
                          hideAllSubmenus={hideAllSubmenus}
                          isCurrentlyUsed={
                            getLinkData('GROUPS_MARZENIE_BIS')?.isCurrentlyUsed!
                          }
                          nameToBeDisplayed={
                            getLinkData('GROUPS_MARZENIE_BIS')
                              ?.nameToBeDisplayed!
                          }
                        />
                      </li>

                      <li>
                        <NavigationLink
                          url={getLinkData('GROUPS_MARZENIE')?.path!}
                          hideAllSubmenus={hideAllSubmenus}
                          isCurrentlyUsed={
                            getLinkData('GROUPS_MARZENIE')?.isCurrentlyUsed!
                          }
                          nameToBeDisplayed={
                            getLinkData('GROUPS_MARZENIE')?.nameToBeDisplayed!
                          }
                        />
                      </li>

                      <li>
                        <NavigationLink
                          url={getLinkData('GROUPS_HIPNOTERIA_BIS')?.path!}
                          hideAllSubmenus={hideAllSubmenus}
                          isCurrentlyUsed={
                            getLinkData('GROUPS_HIPNOTERIA_BIS')
                              ?.isCurrentlyUsed!
                          }
                          nameToBeDisplayed={
                            getLinkData('GROUPS_HIPNOTERIA_BIS')
                              ?.nameToBeDisplayed!
                          }
                        />
                      </li>

                      <li>
                        <NavigationLink
                          url={getLinkData('GROUPS_HIPNOTERIA')?.path!}
                          hideAllSubmenus={hideAllSubmenus}
                          isCurrentlyUsed={
                            getLinkData('GROUPS_HIPNOTERIA')?.isCurrentlyUsed!
                          }
                          nameToBeDisplayed={
                            getLinkData('GROUPS_HIPNOTERIA')?.nameToBeDisplayed!
                          }
                        />
                      </li>
                    </motion.ul>
                  ) : null}
                </AnimatePresence>
              </div>
            </li>

            {/* about */}
            <li>
              <div className="relative z-30">
                <NavigationButton
                  buttonName="o nas"
                  idForAriaControls="options_about"
                  layoutState={getLayoutMode()}
                  getIsSubmenuVisible={getIsAboutSubmenuVisible}
                  toggleIsSubmenuVisible={toggleIsAboutSubmenuVisible}
                />
                <AnimatePresence mode="wait">
                  {getIsAboutSubmenuVisible() ? (
                    <motion.ul
                      variants={subMenuVariant}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      id="options_about"
                      className={clsx(
                        'absolute left-0 px-4 submenu-container top-[24px] flex-col gap-2 flex'
                        // getIsAboutSubmenuVisible() ? 'flex' : 'hidden'
                      )}
                    >
                      <li>
                        <NavigationLink
                          url={getLinkData('ABOUT_ABOUT')?.path!}
                          hideAllSubmenus={hideAllSubmenus}
                          isCurrentlyUsed={
                            getLinkData('ABOUT_ABOUT')?.isCurrentlyUsed!
                          }
                          nameToBeDisplayed={
                            getLinkData('ABOUT_ABOUT')?.nameToBeDisplayed!
                          }
                        />
                      </li>

                      {/* <li>
                        <NavigationLink
                          url={getLinkData('ABOUT_RENT')?.path!}
                          hideAllSubmenus={hideAllSubmenus}
                          isCurrentlyUsed={
                            getLinkData('ABOUT_RENT')?.isCurrentlyUsed!
                          }
                          nameToBeDisplayed={
                            getLinkData('ABOUT_RENT')?.nameToBeDisplayed!
                          }
                        />
                      </li> */}

                      <li>
                        <NavigationLink
                          url={getLinkData('ABOUT_REGULATIONS')?.path!}
                          hideAllSubmenus={hideAllSubmenus}
                          isCurrentlyUsed={
                            getLinkData('ABOUT_REGULATIONS')?.isCurrentlyUsed!
                          }
                          nameToBeDisplayed={
                            getLinkData('ABOUT_REGULATIONS')?.nameToBeDisplayed!
                          }
                        />
                      </li>

                      <li>
                        <NavigationLink
                          url={
                            getLinkData('ABOUT_AVAILABILITY_DECLARATIONS')
                              ?.path!
                          }
                          hideAllSubmenus={hideAllSubmenus}
                          isCurrentlyUsed={
                            getLinkData('ABOUT_AVAILABILITY_DECLARATIONS')
                              ?.isCurrentlyUsed!
                          }
                          nameToBeDisplayed={
                            getLinkData('ABOUT_AVAILABILITY_DECLARATIONS')
                              ?.nameToBeDisplayed!
                          }
                        />
                      </li>

                      <li>
                        <NavigationLink
                          url={getLinkData('ABOUT_RODO')?.path!}
                          hideAllSubmenus={hideAllSubmenus}
                          isCurrentlyUsed={
                            getLinkData('ABOUT_RODO')?.isCurrentlyUsed!
                          }
                          nameToBeDisplayed={
                            getLinkData('ABOUT_RODO')?.nameToBeDisplayed!
                          }
                        />
                      </li>
                    </motion.ul>
                  ) : null}
                </AnimatePresence>
              </div>
            </li>

            <li>
              <NavigationLink
                url={getLinkData('BISTRO')?.path!}
                hideAllSubmenus={hideAllSubmenus}
                isCurrentlyUsed={getLinkData('BISTRO')?.isCurrentlyUsed!}
                nameToBeDisplayed={getLinkData('BISTRO')?.nameToBeDisplayed!}
              />
            </li>

            <li>
              <NavigationLink
                url={getLinkData('CONTACT')?.path!}
                hideAllSubmenus={hideAllSubmenus}
                isCurrentlyUsed={getLinkData('CONTACT')?.isCurrentlyUsed!}
                nameToBeDisplayed={getLinkData('CONTACT')?.nameToBeDisplayed!}
              />
            </li>
            <div className="w-[1px] h-4 mt-[4px] mb-[9px] ml-4 mr-2 bg-skin-primary"></div>
            <li>
              <FacebookIcon
                size="SMALL"
                alt="Facebook"
                url={getSocialLinkData('FACEBOOK')!.path}
              />
            </li>
            <li className="-ml-[14px]">
              <InstagramIcon
                size="SMALL"
                alt="Instagram"
                url={getSocialLinkData('INSTAGRAM')!.path}
              />
            </li>
            <li className="-ml-[14px]">
              <YoutubeIcon
                size="SMALL"
                alt="Youtube"
                url={getSocialLinkData('YOUTUBE')!.path}
              />
            </li>
          </ul>
        </div>
      </nav>

      {/* overlay to groups button */}
      <AnimatePresence mode="wait">
        {getIsGroupsSubmenuVisible() ? (
          <div
            className={clsx(
              'absolute top-0 bottom-0 left-0 right-0 z-20 w-screen h-screen overlay-minimal',
              getIsGroupsSubmenuVisible() ? 'visible' : 'hidden'
            )}
            onClick={toggleIsGroupsSubmenuVisible}
          ></div>
        ) : null}
      </AnimatePresence>

      {/* overlay to about button */}
      <AnimatePresence mode="wait">
        {getIsAboutSubmenuVisible() ? (
          <motion.div
            variants={overlaySubMenuVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={clsx(
              'absolute top-0 bottom-0 left-0 right-0 z-20 w-screen h-screen overlay-minimal'
              // getIsAboutSubmenuVisible() ? 'visible' : 'hidden'
            )}
            onClick={toggleIsAboutSubmenuVisible}
          ></motion.div>
        ) : null}
      </AnimatePresence>
    </Fragment>
  );
}
