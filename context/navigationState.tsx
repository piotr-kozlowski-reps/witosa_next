// import { TLayoutState } from '@/types';
import { useChangeCurrentLinkActive } from '@/hooks/useChangeCurrentLinkActive';
import {
  TCurrentDevice,
  TLink,
  TLinkName,
  TSubMenu,
  TsocialLinkName,
  TsocialLinks,
} from '@/types';
import { hookstate, useHookstate } from '@hookstate/core';
import { devtools } from '@hookstate/devtools';

type TNavigationState = {
  links: TLink[];
  socialLinks: TsocialLinks[];
  isAboutSubmenuVisible: boolean;
  isGroupsSubmenuVisible: boolean;
  isAccessibilitySubmenuVisible: boolean;
  isMobileMenuFirstLevelVisible: boolean;
  isMobileGroupsSubMenuVisible: boolean;
  isMobileAboutSubMenuVisible: boolean;
  isMobileAccessibilitySubMenuVisible: boolean;
  isCyclicalActivitiesMenuVisible: boolean;
  currentDevice: TCurrentDevice;
};

const navigationStateData: TNavigationState = {
  links: [
    {
      name: 'NEWS',
      nameToBeDisplayed: 'aktualności',
      path: '/',
      isCurrentlyUsed: true,
    },
    {
      name: 'EVENTS',
      nameToBeDisplayed: 'wydarzenia',
      path: '/events',
      isCurrentlyUsed: false,
    },
    {
      name: 'CYCLICAL_ACTIVITIES',
      nameToBeDisplayed: 'zajęcia stałe',
      path: '/activities',
      isCurrentlyUsed: false,
    },
    {
      name: 'BISTRO',
      nameToBeDisplayed: 'art cafe',
      path: '/bistro',
      isCurrentlyUsed: false,
    },
    {
      name: 'CONTACT',
      nameToBeDisplayed: 'kontakt',
      path: '#contact',
      isCurrentlyUsed: false,
    },
    {
      name: 'ABOUT_ABOUT',
      nameToBeDisplayed: 'ART CK to ...',
      path: '/about/about',
      isCurrentlyUsed: false,
    },
    {
      name: 'ABOUT_RENT',
      nameToBeDisplayed: 'ART CK wynajem',
      path: '/about/rent',
      isCurrentlyUsed: false,
    },
    {
      name: 'ABOUT_REGULATIONS',
      nameToBeDisplayed: 'regulaminy',
      path: '/about/regulations',
      isCurrentlyUsed: false,
    },
    {
      name: 'ABOUT_AVAILABILITY_DECLARATIONS',
      nameToBeDisplayed: 'deklaracje dostępności',
      path: '/about/availability_declarations',
      isCurrentlyUsed: false,
    },
    {
      name: 'ABOUT_RODO',
      nameToBeDisplayed: 'polityka prywatności',
      path: '/about/privacy_policy',
      isCurrentlyUsed: false,
    },

    {
      name: 'GROUPS_MARZENIE_MINI_MINI',
      nameToBeDisplayed: 'Marzenie mini mini',
      path: '/groups/marzenieminimini',
      isCurrentlyUsed: false,
    },
    {
      name: 'GROUPS_MARZENIE_BIS',
      nameToBeDisplayed: 'Marzenie bis',
      path: '/groups/marzenie_bis',
      isCurrentlyUsed: false,
    },
    {
      name: 'GROUPS_MARZENIE',
      nameToBeDisplayed: 'Marzenie',
      path: '/groups/marzenie',
      isCurrentlyUsed: false,
    },
    {
      name: 'GROUPS_HIPNOTERIA_BIS',
      nameToBeDisplayed: 'Hipnoteria bis',
      path: '/groups/hipnoteriabis',
      isCurrentlyUsed: false,
    },
    {
      name: 'GROUPS_HIPNOTERIA',
      nameToBeDisplayed: 'Hipnoteria',
      path: '/groups/hipnoteria',
      isCurrentlyUsed: false,
    },
    {
      name: 'LOGIN',
      nameToBeDisplayed: 'panel administracyjny',
      path: '/dashboard',
      isCurrentlyUsed: false,
    },
  ],
  socialLinks: [
    { name: 'FACEBOOK', path: 'https://www.facebook.com/ArtCKwKnurowie/' },
    { name: 'INSTAGRAM', path: 'https://www.instagram.com/artckwknurowie/' },
    {
      name: 'YOUTUBE',
      path: 'https://www.youtube.com/@centrumkulturywknurowie5350',
    },
  ],
  isAboutSubmenuVisible: false,
  isGroupsSubmenuVisible: false,
  isAccessibilitySubmenuVisible: false,
  currentDevice: 'MOBILE',
  isMobileMenuFirstLevelVisible: false,
  isMobileAboutSubMenuVisible: false,
  isMobileGroupsSubMenuVisible: false,
  isMobileAccessibilitySubMenuVisible: false,
  isCyclicalActivitiesMenuVisible: false,
};

const navigationState = hookstate(
  navigationStateData,
  devtools({ key: 'navigationState' })
);

export function useNavigationState() {
  const state = useHookstate(navigationState);

  /** handler to change isCurrentlyUsed:boolean state property according to current site path */
  const currentLinksState = state.links.get({ noproxy: true });
  const pointerToMethodSettingLinksValue = state.links.set;
  useChangeCurrentLinkActive(
    currentLinksState,
    pointerToMethodSettingLinksValue
  );

  /** handler to change visibility of other submenus despite one currently clicked */
  const allSubmenusExcludingMobileFirstLevelToMaintainVisibilityOnMobiles = [
    state.isAboutSubmenuVisible,
    state.isGroupsSubmenuVisible,
    state.isMobileAboutSubMenuVisible,
    state.isMobileGroupsSubMenuVisible,
    state.isMobileAccessibilitySubMenuVisible,
  ];
  const allSubmenus = [
    ...allSubmenusExcludingMobileFirstLevelToMaintainVisibilityOnMobiles,
    state.isMobileMenuFirstLevelVisible,
  ];

  const setVisibilityOfAllSubmenusToFalse = () => {
    allSubmenus.forEach((submenu) => {
      submenu.set(false);
    });
  };

  const setVisibilityOfFirstLevelSubmenuToTrue = () => {
    state.isMobileMenuFirstLevelVisible.set(true);
  };

  const setProvidedSubmenuVisibilityToTrue_OtherToFalse = (
    submenuProvided: TSubMenu
  ) => {
    switch (submenuProvided) {
      case 'ABOUT':
        if (state.isAboutSubmenuVisible.get() === true) {
          setVisibilityOfAllSubmenusToFalse();
          setVisibilityOfFirstLevelSubmenuToTrue();
          return;
        }
        setVisibilityOfAllSubmenusToFalse();
        state.isAboutSubmenuVisible.set(true);
        state.isMobileAboutSubMenuVisible.set(true);
        break;

      case 'GROUPS':
        if (state.isGroupsSubmenuVisible.get() === true) {
          setVisibilityOfAllSubmenusToFalse();
          setVisibilityOfFirstLevelSubmenuToTrue();
          return;
        }
        setVisibilityOfAllSubmenusToFalse();
        state.isGroupsSubmenuVisible.set(true);
        state.isMobileGroupsSubMenuVisible.set(true);
        break;

      case 'ACCESSIBILITY':
        if (state.isAccessibilitySubmenuVisible.get() === true) {
          setVisibilityOfAllSubmenusToFalse();
          setVisibilityOfFirstLevelSubmenuToTrue();
          return;
        }
        // setVisibilityOfAlmostAllSubmenusToFalseExcludingMobileFirstLevelToMaintainVisibilityOnMobiles();
        setVisibilityOfAllSubmenusToFalse();
        state.isAccessibilitySubmenuVisible.set(true);
        state.isMobileAccessibilitySubMenuVisible.set(true);
        break;
    }
  };

  /** helper to get info if any mobile second level submenus is visible */
  const allMobileSecondLevelSubmenus = [
    state.isMobileAboutSubMenuVisible,
    state.isMobileGroupsSubMenuVisible,
    state.isMobileAccessibilitySubMenuVisible,
  ];
  const getIsAnyOfSecondLevelSubmenusVisibleHelper = () => {
    let result = false;
    allMobileSecondLevelSubmenus.forEach((submenu) => {
      if (submenu.get()) result = true;
    });

    return result;
  };

  return {
    // link getter
    getLinkData(linkName: TLinkName) {
      return state.links.get().find((link) => link.name === linkName);
    },
    getSocialLinkData(socialLinkName: TsocialLinkName) {
      return state.socialLinks
        .get()
        .find((socialLink) => socialLink.name === socialLinkName);
    },
    // about submenu
    getIsAboutSubmenuVisible() {
      return state.isAboutSubmenuVisible.get();
    },
    toggleIsAboutSubmenuVisible() {
      setProvidedSubmenuVisibilityToTrue_OtherToFalse('ABOUT');
    },
    // groups submenu
    getIsGroupsSubmenuVisible() {
      return state.isGroupsSubmenuVisible.get();
    },
    toggleIsGroupsSubmenuVisible() {
      setProvidedSubmenuVisibilityToTrue_OtherToFalse('GROUPS');
    },

    // accessibility navigation getter
    getIsAccessibilitySubmenuVisible() {
      return state.isAccessibilitySubmenuVisible.get();
    },
    getIsMobileAccessibilitySubmenuVisible() {
      return state.isMobileAccessibilitySubMenuVisible.get();
    },
    setIsAccessibilitySubmenuVisible_ToTrue() {
      state.isMobileMenuFirstLevelVisible.set(true);
      setProvidedSubmenuVisibilityToTrue_OtherToFalse('ACCESSIBILITY');
    },
    setIsAccessibilitySubmenuVisible_ToFalse() {
      state.isAccessibilitySubmenuVisible.set(false);
    },
    setIsAccessibilitySubmenuVisibleForMobile_ToFalse() {
      state.isAccessibilitySubmenuVisible.set(false);
      state.isMobileAccessibilitySubMenuVisible.set(false);
      setVisibilityOfFirstLevelSubmenuToTrue();
    },

    // hide all submenus
    hideAllSubmenus() {
      setVisibilityOfAllSubmenusToFalse();
    },

    // current device
    getCurrentDevice() {
      return state.currentDevice.get();
    },
    setCurrentDevice(currentDevice: TCurrentDevice) {
      return state.currentDevice.set(currentDevice);
    },

    // mobile menu - first level
    getIsAnyOfSecondLevelSubmenusVisible() {
      return getIsAnyOfSecondLevelSubmenusVisibleHelper();
    },

    // mobile menu - first level
    getIsMobileMenuFirstLevelVisible() {
      return state.isMobileMenuFirstLevelVisible.get();
    },
    setIsMobileMenuFirstLevelVisible_ToBeVisible() {
      state.isMobileMenuFirstLevelVisible.set(true);
    },
    setIsMobileMenuFirstLevelVisible_Not_ToBeVisible() {
      state.isMobileMenuFirstLevelVisible.set(false);
    },

    // mobile groups submenu
    getIsMobileGroupsSubMenuVisible() {
      return state.isMobileGroupsSubMenuVisible.get();
    },

    // mobile about submenu
    getIsMobileAboutSubMenuVisible() {
      return state.isMobileAboutSubMenuVisible.get();
    },

    // mobile accessibility submenu
    getIsMobileAccessibilitySubMenuVisible() {
      return state.isMobileAccessibilitySubMenuVisible.get();
    },

    // cyclical activities menu
    getIsCyclicalActivitiesMenuVisible() {
      return state.isCyclicalActivitiesMenuVisible.get();
    },
    toggleIsCyclicalActivitiesMenuVisible() {
      state.isCyclicalActivitiesMenuVisible.set(
        !state.isCyclicalActivitiesMenuVisible.get()
      );
    },
    setIsCyclicalActivitiesMenuToBeVisible() {
      state.isCyclicalActivitiesMenuVisible.set(true);
    },
  };
}
