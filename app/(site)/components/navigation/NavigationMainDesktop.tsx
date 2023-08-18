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
                          url={getLinkData('groups_marzenie_bis')?.path!}
                          hideAllSubmenus={hideAllSubmenus}
                          isCurrentlyUsed={
                            getLinkData('groups_marzenie_bis')?.isCurrentlyUsed!
                          }
                          nameToBeDisplayed={
                            getLinkData('groups_marzenie_bis')
                              ?.nameToBeDisplayed!
                          }
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
                        />
                      </li>

                      <li>
                        <NavigationLink
                          url={getLinkData('groups_hipnoteria_bis')?.path!}
                          hideAllSubmenus={hideAllSubmenus}
                          isCurrentlyUsed={
                            getLinkData('groups_hipnoteria_bis')
                              ?.isCurrentlyUsed!
                          }
                          nameToBeDisplayed={
                            getLinkData('groups_hipnoteria_bis')
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
                            getLinkData('about_availability_declarations')
                              ?.path!
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
                          url={getLinkData('about_rodo')?.path!}
                          hideAllSubmenus={hideAllSubmenus}
                          isCurrentlyUsed={
                            getLinkData('about_rodo')?.isCurrentlyUsed!
                          }
                          nameToBeDisplayed={
                            getLinkData('about_rodo')?.nameToBeDisplayed!
                          }
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
                        />
                      </li>
                    </motion.ul>
                  ) : null}
                </AnimatePresence>
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
