import { TLink, TLinkName } from '@/types';
import { ImmutableObject } from '@hookstate/core';
import NavigationLink from '../navigation/NavigationLink';

interface Props {
  getLinkData: (
    linkName: TLinkName
  ) => ImmutableObject<ImmutableObject<TLink>> | undefined;
}

export default function Sitemap(props: Props) {
  ////vars
  const { getLinkData } = props;

  ////tsx
  return (
    <div className="w-full prose">
      <h4>Mapa strony</h4>
      <ul className="flex flex-col items-start justify-center list-none not-prose mt-[17px]">
        <li className="-ml-[26px]">
          <NavigationLink
            url={getLinkData('news')?.path!}
            hideAllSubmenus={() => {}}
            isCurrentlyUsed={getLinkData('news')?.isCurrentlyUsed!}
            nameToBeDisplayed={getLinkData('news')?.nameToBeDisplayed!}
            isSiteMapLink={true}
          />
        </li>
        <li className="-ml-[26px] mt-[6px]">
          <NavigationLink
            url={getLinkData('events')?.path!}
            hideAllSubmenus={() => {}}
            isCurrentlyUsed={getLinkData('events')?.isCurrentlyUsed!}
            nameToBeDisplayed={getLinkData('events')?.nameToBeDisplayed!}
            isSiteMapLink={true}
          />
        </li>
        <li className="-ml-[26px] mt-[6px]">
          <NavigationLink
            url={getLinkData('activities')?.path!}
            hideAllSubmenus={() => {}}
            isCurrentlyUsed={getLinkData('activities')?.isCurrentlyUsed!}
            nameToBeDisplayed={getLinkData('activities')?.nameToBeDisplayed!}
            isSiteMapLink={true}
          />
        </li>
        <div className="-ml-[26px] submenu-name-sitemap mt-[12px]">
          grupy artystyczne
        </div>
        <ul className="flex flex-col items-start justify-center list-none not-prose">
          <li className="mt-[9px] -ml-[3px]">
            <NavigationLink
              url={getLinkData('groups_marzenie_mini_mini')?.path!}
              hideAllSubmenus={() => {}}
              isCurrentlyUsed={
                getLinkData('groups_marzenie_mini_mini')?.isCurrentlyUsed!
              }
              nameToBeDisplayed={
                getLinkData('groups_marzenie_mini_mini')?.nameToBeDisplayed!
              }
              isSiteMapLink={true}
            />
          </li>
          <li className="-ml-[3px] mt-[6px]">
            <NavigationLink
              url={getLinkData('groups_marzenie_bis')?.path!}
              hideAllSubmenus={() => {}}
              isCurrentlyUsed={
                getLinkData('groups_marzenie_bis')?.isCurrentlyUsed!
              }
              nameToBeDisplayed={
                getLinkData('groups_marzenie_bis')?.nameToBeDisplayed!
              }
              isSiteMapLink={true}
            />
          </li>
          <li className="-ml-[3px] mt-[6px]">
            <NavigationLink
              url={getLinkData('groups_marzenie')?.path!}
              hideAllSubmenus={() => {}}
              isCurrentlyUsed={getLinkData('groups_marzenie')?.isCurrentlyUsed!}
              nameToBeDisplayed={
                getLinkData('groups_marzenie')?.nameToBeDisplayed!
              }
              isSiteMapLink={true}
            />
          </li>
          <li className="-ml-[3px] mt-[6px]">
            <NavigationLink
              url={getLinkData('groups_hipnoteria_bis')?.path!}
              hideAllSubmenus={() => {}}
              isCurrentlyUsed={
                getLinkData('groups_hipnoteria_bis')?.isCurrentlyUsed!
              }
              nameToBeDisplayed={
                getLinkData('groups_hipnoteria_bis')?.nameToBeDisplayed!
              }
              isSiteMapLink={true}
            />
          </li>
          <li className="-ml-[3px] mt-[6px]">
            <NavigationLink
              url={getLinkData('groups_hipnoteria')?.path!}
              hideAllSubmenus={() => {}}
              isCurrentlyUsed={
                getLinkData('groups_hipnoteria')?.isCurrentlyUsed!
              }
              nameToBeDisplayed={
                getLinkData('groups_hipnoteria')?.nameToBeDisplayed!
              }
              isSiteMapLink={true}
            />
          </li>
        </ul>
        <div className="-ml-[26px] submenu-name-sitemap mt-[12px]">o nas</div>
        <ul className="flex flex-col items-start justify-center list-none not-prose">
          <li className="mt-[9px] -ml-[3px]">
            <NavigationLink
              url={getLinkData('about_about')?.path!}
              hideAllSubmenus={() => {}}
              isCurrentlyUsed={getLinkData('about_about')?.isCurrentlyUsed!}
              nameToBeDisplayed={getLinkData('about_about')?.nameToBeDisplayed!}
              isSiteMapLink={true}
            />
          </li>
          <li className="-ml-[3px] mt-[6px]">
            <NavigationLink
              url={getLinkData('about_rent')?.path!}
              hideAllSubmenus={() => {}}
              isCurrentlyUsed={getLinkData('about_rent')?.isCurrentlyUsed!}
              nameToBeDisplayed={getLinkData('about_rent')?.nameToBeDisplayed!}
              isSiteMapLink={true}
            />
          </li>
          <li className="-ml-[3px] mt-[6px]">
            <NavigationLink
              url={getLinkData('about_regulations')?.path!}
              hideAllSubmenus={() => {}}
              isCurrentlyUsed={
                getLinkData('about_regulations')?.isCurrentlyUsed!
              }
              nameToBeDisplayed={
                getLinkData('about_regulations')?.nameToBeDisplayed!
              }
              isSiteMapLink={true}
            />
          </li>
          <li className="-ml-[3px] mt-[6px]">
            <NavigationLink
              url={getLinkData('about_availability_declarations')?.path!}
              hideAllSubmenus={() => {}}
              isCurrentlyUsed={
                getLinkData('about_availability_declarations')?.isCurrentlyUsed!
              }
              nameToBeDisplayed={
                getLinkData('about_availability_declarations')
                  ?.nameToBeDisplayed!
              }
              isSiteMapLink={true}
            />
          </li>
          <li className="-ml-[3px] mt-[6px]">
            <NavigationLink
              url={getLinkData('about_rodo')?.path!}
              hideAllSubmenus={() => {}}
              isCurrentlyUsed={getLinkData('about_rodo')?.isCurrentlyUsed!}
              nameToBeDisplayed={getLinkData('about_rodo')?.nameToBeDisplayed!}
              isSiteMapLink={true}
            />
          </li>
          <li className="-ml-[3px] mt-[6px]">
            <NavigationLink
              url={getLinkData('contact')?.path!}
              hideAllSubmenus={() => {}}
              isCurrentlyUsed={getLinkData('contact')?.isCurrentlyUsed!}
              nameToBeDisplayed={getLinkData('contact')?.nameToBeDisplayed!}
              isSiteMapLink={true}
            />
          </li>
        </ul>
        <li className="-ml-[26px] mt-[6px]">
          <NavigationLink
            url={getLinkData('bistro')?.path!}
            hideAllSubmenus={() => {}}
            isCurrentlyUsed={getLinkData('bistro')?.isCurrentlyUsed!}
            nameToBeDisplayed={getLinkData('bistro')?.nameToBeDisplayed!}
            isSiteMapLink={true}
          />
        </li>
        <li className="-ml-[26px] mt-[6px]">
          <NavigationLink
            url={getLinkData('contact')?.path!}
            hideAllSubmenus={() => {}}
            isCurrentlyUsed={getLinkData('contact')?.isCurrentlyUsed!}
            nameToBeDisplayed={getLinkData('contact')?.nameToBeDisplayed!}
            isSiteMapLink={true}
          />
        </li>
        <div className="-ml-[26px] separator-horizontal mt-[24px] mb-[22px]"></div>
        <li className="-ml-[26px] ">
          <NavigationLink
            url={getLinkData('login')?.path!}
            hideAllSubmenus={() => {}}
            isCurrentlyUsed={getLinkData('login')?.isCurrentlyUsed!}
            nameToBeDisplayed={getLinkData('login')?.nameToBeDisplayed!}
            isSiteMapLink={true}
          />
        </li>
      </ul>
    </div>
  );
}
