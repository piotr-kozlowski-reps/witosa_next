import { TAdminLink, TLinkAdminName } from '@/types';
import { hookstate, useHookstate } from '@hookstate/core';
import { devtools } from '@hookstate/devtools';

type TNavigationStateAdmin = {
  mainAdminLinks: TAdminLink[];
  // links: TLink[];
  // socialLinks: TsocialLinks[];
  // isAboutSubmenuVisible: boolean;
  // isGroupsSubmenuVisible: boolean;
  // isAccessibilitySubmenuVisible: boolean;
  // isMobileMenuFirstLevelVisible: boolean;
  // isMobileGroupsSubMenuVisible: boolean;
  // isMobileAboutSubMenuVisible: boolean;
  // isMobileAccessibilitySubMenuVisible: boolean;
  // isCyclicalActivitiesMenuVisible: boolean;
  // currentDevice: TCurrentDevice;
};

const navigationStateAdminData: TNavigationStateAdmin = {
  mainAdminLinks: [
    { name: 'EVENTS', nameToBeDisplayed: 'wydarzenia', isCurrentlyUsed: true },
    {
      name: 'CYCLICAL_ACTIVITY',
      nameToBeDisplayed: 'zajęcia stałe',
      isCurrentlyUsed: false,
    },
    {
      name: 'NEWSLETTER',
      nameToBeDisplayed: 'newsletter',
      isCurrentlyUsed: false,
    },
    {
      name: 'USERS',
      nameToBeDisplayed: 'użytkownicy',
      isCurrentlyUsed: false,
    },
    {
      name: 'LOGS',
      nameToBeDisplayed: 'logi',
      isCurrentlyUsed: false,
    },
  ],
};

const navigationStateAdmin = hookstate(
  navigationStateAdminData,
  devtools({ key: 'navigationStateAdmin' })
);

export function useNavigationStateAdmin() {
  const state = useHookstate(navigationStateAdmin);

  ////utils
  function makeMutableCopyOfMainAdminLinksArray() {
    const currentStateOfMainAdminLinks: TAdminLink[] = [];
    state.mainAdminLinks
      .get({
        noproxy: true,
      })
      .forEach((link) => currentStateOfMainAdminLinks.push(link));

    return currentStateOfMainAdminLinks;
  }
  function clearActivenessOfAllLinks() {
    const currentStateOfMainAdminLinks: TAdminLink[] =
      makeMutableCopyOfMainAdminLinksArray();

    const finalResultArray = currentStateOfMainAdminLinks.map((link) => ({
      ...link,
      isCurrentlyUsed: false,
    }));

    state.mainAdminLinks.set(finalResultArray);
  }
  function setProperAdminLinkToBeActive(adminLinkName: TLinkAdminName) {
    const currentStateOfMainAdminLinks: TAdminLink[] =
      makeMutableCopyOfMainAdminLinksArray();

    const finalResultArray = currentStateOfMainAdminLinks.map((link) => {
      return link.name === adminLinkName
        ? { ...link, isCurrentlyUsed: true }
        : { ...link };
    });

    state.mainAdminLinks.set(finalResultArray);
  }

  return {
    getAllAdminLinks() {
      return state.mainAdminLinks.get();
    },

    getAdminLink(adminLinkName: TLinkAdminName) {
      return state.mainAdminLinks
        .get()
        .find((link) => link.name === adminLinkName);
    },

    setAdminLinkToBeActive(adminLinkName: TLinkAdminName) {
      clearActivenessOfAllLinks();
      setProperAdminLinkToBeActive(adminLinkName);
    },
  };
}
