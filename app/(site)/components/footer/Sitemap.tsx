import { TCurrentDevice, TLink, TLinkName } from '@/types';
import { ImmutableObject } from '@hookstate/core';
import clsx from 'clsx';
import NavigationLink from '../navigation/NavigationLink';

interface Props {
  getLinkData: (
    _linkName: TLinkName
  ) => ImmutableObject<ImmutableObject<TLink>> | undefined;
  getCurrentDevice: () => TCurrentDevice;
}

export default function Sitemap(props: Props) {
  ////vars
  const { getLinkData, getCurrentDevice } = props;

  ////tsx
  return (
    <div
      className={clsx(
        'w-full prose',
        getCurrentDevice() !== 'DESKTOP' ? 'order-3' : ''
      )}
    >
      <h4>Mapa strony</h4>
      <ul className="flex flex-col items-start justify-center list-none not-prose mt-[17px]">
        <li className="-ml-[23px] ">
          <NavigationLink
            url={getLinkData('NEWS')?.path!}
            hideAllSubmenus={() => {}}
            isCurrentlyUsed={getLinkData('NEWS')?.isCurrentlyUsed!}
            nameToBeDisplayed={getLinkData('NEWS')?.nameToBeDisplayed!}
            isSiteMapLink={true}
          />
        </li>
        <li className="-ml-[23px] mt-[6px]">
          <NavigationLink
            url={getLinkData('EVENTS')?.path!}
            hideAllSubmenus={() => {}}
            isCurrentlyUsed={getLinkData('EVENTS')?.isCurrentlyUsed!}
            nameToBeDisplayed={getLinkData('EVENTS')?.nameToBeDisplayed!}
            isSiteMapLink={true}
          />
        </li>
        <li className="-ml-[23px] mt-[6px]">
          <NavigationLink
            url={getLinkData('CYCLICAL_ACTIVITIES')?.path!}
            hideAllSubmenus={() => {}}
            isCurrentlyUsed={
              getLinkData('CYCLICAL_ACTIVITIES')?.isCurrentlyUsed!
            }
            nameToBeDisplayed={
              getLinkData('CYCLICAL_ACTIVITIES')?.nameToBeDisplayed!
            }
            isSiteMapLink={true}
          />
        </li>
        <div className="-ml-[23px] submenu-name-sitemap mt-[6px]">
          grupy artystyczne
        </div>
        <ul className="flex flex-col items-start justify-center list-none not-prose">
          <li className="mt-[5px]">
            <NavigationLink
              url={getLinkData('GROUPS_MARZENIE_MINI_MINI')?.path!}
              hideAllSubmenus={() => {}}
              isCurrentlyUsed={
                getLinkData('GROUPS_MARZENIE_MINI_MINI')?.isCurrentlyUsed!
              }
              nameToBeDisplayed={
                getLinkData('GROUPS_MARZENIE_MINI_MINI')?.nameToBeDisplayed!
              }
              isSiteMapLink={true}
            />
          </li>
          <li className="mt-[6px]">
            <NavigationLink
              url={getLinkData('GROUPS_MARZENIE_BIS')?.path!}
              hideAllSubmenus={() => {}}
              isCurrentlyUsed={
                getLinkData('GROUPS_MARZENIE_BIS')?.isCurrentlyUsed!
              }
              nameToBeDisplayed={
                getLinkData('GROUPS_MARZENIE_BIS')?.nameToBeDisplayed!
              }
              isSiteMapLink={true}
            />
          </li>
          <li className="mt-[6px]">
            <NavigationLink
              url={getLinkData('GROUPS_MARZENIE')?.path!}
              hideAllSubmenus={() => {}}
              isCurrentlyUsed={getLinkData('GROUPS_MARZENIE')?.isCurrentlyUsed!}
              nameToBeDisplayed={
                getLinkData('GROUPS_MARZENIE')?.nameToBeDisplayed!
              }
              isSiteMapLink={true}
            />
          </li>
          <li className="mt-[6px]">
            <NavigationLink
              url={getLinkData('GROUPS_HIPNOTERIA_BIS')?.path!}
              hideAllSubmenus={() => {}}
              isCurrentlyUsed={
                getLinkData('GROUPS_HIPNOTERIA_BIS')?.isCurrentlyUsed!
              }
              nameToBeDisplayed={
                getLinkData('GROUPS_HIPNOTERIA_BIS')?.nameToBeDisplayed!
              }
              isSiteMapLink={true}
            />
          </li>
          <li className="mt-[6px]">
            <NavigationLink
              url={getLinkData('GROUPS_HIPNOTERIA')?.path!}
              hideAllSubmenus={() => {}}
              isCurrentlyUsed={
                getLinkData('GROUPS_HIPNOTERIA')?.isCurrentlyUsed!
              }
              nameToBeDisplayed={
                getLinkData('GROUPS_HIPNOTERIA')?.nameToBeDisplayed!
              }
              isSiteMapLink={true}
            />
          </li>
        </ul>
        <div className="-ml-[23px] submenu-name-sitemap mt-[6px]">o nas</div>
        <ul className="flex flex-col items-start justify-center list-none not-prose">
          <li className="mt-[5px] ">
            <NavigationLink
              url={getLinkData('ABOUT_ABOUT')?.path!}
              hideAllSubmenus={() => {}}
              isCurrentlyUsed={getLinkData('ABOUT_ABOUT')?.isCurrentlyUsed!}
              nameToBeDisplayed={getLinkData('ABOUT_ABOUT')?.nameToBeDisplayed!}
              isSiteMapLink={true}
            />
          </li>

          <li className=" mt-[6px]">
            <NavigationLink
              url={getLinkData('ABOUT_REGULATIONS')?.path!}
              hideAllSubmenus={() => {}}
              isCurrentlyUsed={
                getLinkData('ABOUT_REGULATIONS')?.isCurrentlyUsed!
              }
              nameToBeDisplayed={
                getLinkData('ABOUT_REGULATIONS')?.nameToBeDisplayed!
              }
              isSiteMapLink={true}
            />
          </li>
          <li className=" mt-[6px]">
            <NavigationLink
              url={getLinkData('ABOUT_AVAILABILITY_DECLARATIONS')?.path!}
              hideAllSubmenus={() => {}}
              isCurrentlyUsed={
                getLinkData('ABOUT_AVAILABILITY_DECLARATIONS')?.isCurrentlyUsed!
              }
              nameToBeDisplayed={
                getLinkData('ABOUT_AVAILABILITY_DECLARATIONS')
                  ?.nameToBeDisplayed!
              }
              isSiteMapLink={true}
            />
          </li>
          <li className="mt-[6px]">
            <NavigationLink
              url={getLinkData('ABOUT_RODO')?.path!}
              hideAllSubmenus={() => {}}
              isCurrentlyUsed={getLinkData('ABOUT_RODO')?.isCurrentlyUsed!}
              nameToBeDisplayed={getLinkData('ABOUT_RODO')?.nameToBeDisplayed!}
              isSiteMapLink={true}
            />
          </li>
        </ul>
        <li className="-ml-[23px] mt-[6px]">
          <NavigationLink
            url={getLinkData('BISTRO')?.path!}
            hideAllSubmenus={() => {}}
            isCurrentlyUsed={getLinkData('BISTRO')?.isCurrentlyUsed!}
            nameToBeDisplayed={getLinkData('BISTRO')?.nameToBeDisplayed!}
            isSiteMapLink={true}
          />
        </li>
        <li className="-ml-[23px] mt-[6px]">
          <NavigationLink
            url={getLinkData('CONTACT')?.path!}
            hideAllSubmenus={() => {}}
            isCurrentlyUsed={getLinkData('CONTACT')?.isCurrentlyUsed!}
            nameToBeDisplayed={getLinkData('CONTACT')?.nameToBeDisplayed!}
            isSiteMapLink={true}
          />
        </li>
        {/* 
        <div className="-ml-[26px] separator-horizontal mt-[24px] mb-[22px]"></div>
        <li className="-ml-[26px] ">
          <NavigationLink
            url={getLinkData('LOGIN')?.path!}
            hideAllSubmenus={() => {}}
            isCurrentlyUsed={getLinkData('LOGIN')?.isCurrentlyUsed!}
            nameToBeDisplayed={getLinkData('LOGIN')?.nameToBeDisplayed!}
            isSiteMapLink={true}
          />
        </li> */}
      </ul>
    </div>
  );
}
