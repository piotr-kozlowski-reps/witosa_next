'use client';

import { useNavigationState } from '@/context/navigationState';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
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

  // const signOutHandler = () => {
  //   console.log('signOut');
  //   signOut();
  // };

  ////tsx
  return (
    <Fragment>
      <nav className="relative flex items-start justify-between h-32 bg-skin-fill desktop-container">
        <div className="mt-10">
          <Link href={'/'}>
            <Image
              src="artck_logo.svg"
              width={77}
              height={24}
              alt="artck_logo"
            />
          </Link>
        </div>
        <div className="absolute right-0 bottom-[55px]">
          <div className="flex gap-6">
            <NavigationLink
              url={getLinkData('news')?.path!}
              hideAllSubmenus={hideAllSubmenus}
              isCurrentlyUsed={getLinkData('news')?.isCurrentlyUsed!}
              nameToBeDisplayed={getLinkData('news')?.nameToBeDisplayed!}
            />
            <NavigationLink
              url={getLinkData('events')?.path!}
              hideAllSubmenus={hideAllSubmenus}
              isCurrentlyUsed={getLinkData('events')?.isCurrentlyUsed!}
              nameToBeDisplayed={getLinkData('events')?.nameToBeDisplayed!}
            />
            <NavigationLink
              url={getLinkData('activities')?.path!}
              hideAllSubmenus={hideAllSubmenus}
              isCurrentlyUsed={getLinkData('activities')?.isCurrentlyUsed!}
              nameToBeDisplayed={getLinkData('activities')?.nameToBeDisplayed!}
            />

            {/* groups */}
            <div className="relative">
              <NavigationButton
                buttonName="grupy artystyczne"
                getIsSubmenuVisible={getIsGroupsSubmenuVisible}
                toggleIsSubmenuVisible={toggleIsGroupsSubmenuVisible}
              />
              <div
                className={clsx(
                  'absolute left-0 px-4 submenu-container top-[26px]  flex-col gap-2 transition-all',
                  getIsGroupsSubmenuVisible() ? 'flex' : 'hidden'
                )}
              >
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
                <NavigationLink
                  url={getLinkData('groups_marzenie_mini_mini')?.path!}
                  hideAllSubmenus={hideAllSubmenus}
                  isCurrentlyUsed={
                    getLinkData('groups_marzenie_mini_mini')?.isCurrentlyUsed!
                  }
                  nameToBeDisplayed={
                    getLinkData('groups_marzenie_mini_mini')?.nameToBeDisplayed!
                  }
                />
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
              </div>
            </div>

            {/* about */}
            <div className="relative">
              <NavigationButton
                buttonName="o nas"
                getIsSubmenuVisible={getIsAboutSubmenuVisible}
                toggleIsSubmenuVisible={toggleIsAboutSubmenuVisible}
              />
              <div
                className={clsx(
                  'absolute left-0 px-4 submenu-container top-[26px]  flex-col gap-2 transition-all',
                  getIsAboutSubmenuVisible() ? 'flex' : 'hidden'
                )}
              >
                <NavigationLink
                  url={getLinkData('about_about')?.path!}
                  hideAllSubmenus={hideAllSubmenus}
                  isCurrentlyUsed={getLinkData('about_about')?.isCurrentlyUsed!}
                  nameToBeDisplayed={
                    getLinkData('about_about')?.nameToBeDisplayed!
                  }
                />
                <NavigationLink
                  url={getLinkData('about_rent')?.path!}
                  hideAllSubmenus={hideAllSubmenus}
                  isCurrentlyUsed={getLinkData('about_rent')?.isCurrentlyUsed!}
                  nameToBeDisplayed={
                    getLinkData('about_rent')?.nameToBeDisplayed!
                  }
                />
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
                />
                <NavigationLink
                  url={getLinkData('contact')?.path!}
                  hideAllSubmenus={hideAllSubmenus}
                  isCurrentlyUsed={getLinkData('contact')?.isCurrentlyUsed!}
                  nameToBeDisplayed={getLinkData('contact')?.nameToBeDisplayed!}
                />
              </div>
            </div>

            <NavigationLink
              url={getLinkData('bistro')?.path!}
              hideAllSubmenus={hideAllSubmenus}
              isCurrentlyUsed={getLinkData('bistro')?.isCurrentlyUsed!}
              nameToBeDisplayed={getLinkData('bistro')?.nameToBeDisplayed!}
            />

            <NavigationLink
              url={getLinkData('contact')?.path!}
              hideAllSubmenus={hideAllSubmenus}
              isCurrentlyUsed={getLinkData('contact')?.isCurrentlyUsed!}
              nameToBeDisplayed={getLinkData('contact')?.nameToBeDisplayed!}
            />
          </div>
        </div>
      </nav>
      <div id="main_content"></div>
    </Fragment>
  );
}
