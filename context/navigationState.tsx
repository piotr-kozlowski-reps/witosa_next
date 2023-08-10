// import { TLayoutState } from '@/types';
import { useChangeCurrentLinkActive } from '@/hooks/useChangeCurrentLinkActive';
import { TCurrentDevice, TLink, TLinkName, TSubMenu } from '@/types';
import { hookstate, useHookstate } from '@hookstate/core';
import { devtools } from '@hookstate/devtools';

type TNavigationState = {
  links: TLink[];
  isAboutSubmenuVisible: boolean;
  isGroupsSubmenuVisible: boolean;
  isAccessibilitySubmenuVisible: boolean;
  isMobileMenuFirstLevelVisible: boolean;
  isMobileGroupsSubMenuVisible: boolean;
  isMobileAboutSubMenuVisible: boolean;
  isMobileAccessibilitySubMenuVisible: boolean;
  currentDevice: TCurrentDevice;
};

const navigationStateData: TNavigationState = {
  links: [
    {
      name: 'news',
      nameToBeDisplayed: 'aktualności',
      path: '/',
      isCurrentlyUsed: true,
    },
    {
      name: 'events',
      nameToBeDisplayed: 'wydarzenia',
      path: '/events',
      isCurrentlyUsed: false,
    },
    {
      name: 'activities',
      nameToBeDisplayed: 'zajęcia / warsztaty',
      path: '/activities',
      isCurrentlyUsed: false,
    },
    {
      name: 'bistro',
      nameToBeDisplayed: 'strefa bistro',
      path: '/bistro',
      isCurrentlyUsed: false,
    },
    {
      name: 'contact',
      nameToBeDisplayed: 'kontakt',
      path: '/contact',
      isCurrentlyUsed: false,
    },
    {
      name: 'about_about',
      nameToBeDisplayed: 'ART CK to ...',
      path: '/about/about',
      isCurrentlyUsed: false,
    },
    {
      name: 'about_rent',
      nameToBeDisplayed: 'ART CK wynajem',
      path: '/about/rent',
      isCurrentlyUsed: false,
    },
    {
      name: 'about_regulations',
      nameToBeDisplayed: 'regulaminy',
      path: '/about/regulations',
      isCurrentlyUsed: false,
    },
    {
      name: 'about_availability_declarations',
      nameToBeDisplayed: 'deklaracje dostępności',
      path: '/about/availability_declarations',
      isCurrentlyUsed: false,
    },
    {
      name: 'about_rodo',
      nameToBeDisplayed: 'polityka prywatności / RODO',
      path: '/about/rodo',
      isCurrentlyUsed: false,
    },

    {
      name: 'groups_marzenie',
      nameToBeDisplayed: 'Marzenie',
      path: '/groups/marzenie',
      isCurrentlyUsed: false,
    },
    {
      name: 'groups_marzenie_bis',
      nameToBeDisplayed: 'Marzenie bis',
      path: '/groups/marzenie_bis',
      isCurrentlyUsed: false,
    },
    {
      name: 'groups_marzenie_mini_mini',
      nameToBeDisplayed: 'Marzenie mini mini',
      path: '/groups/marzenieminimini',
      isCurrentlyUsed: false,
    },
    {
      name: 'groups_hipnoteria',
      nameToBeDisplayed: 'Hipnoteria',
      path: '/groups/hipnoteria',
      isCurrentlyUsed: false,
    },
    {
      name: 'groups_hipnoteria_bis',
      nameToBeDisplayed: 'Hipnoteria bis',
      path: '/groups/hipnoteriabis',
      isCurrentlyUsed: false,
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
  const setVisibilityOfAlmostAllSubmenusToFalseExcludingMobileFirstLevelToMaintainVisibilityOnMobiles =
    () => {
      allSubmenusExcludingMobileFirstLevelToMaintainVisibilityOnMobiles.forEach(
        (submenu) => {
          submenu.set(false);
        }
      );
    };
  const setProvidedSubmenuVisibilityToTrue_OtherToFalse = (
    submenuProvided: TSubMenu
  ) => {
    switch (submenuProvided) {
      case 'ABOUT':
        if (state.isAboutSubmenuVisible.get() === true) {
          setVisibilityOfAlmostAllSubmenusToFalseExcludingMobileFirstLevelToMaintainVisibilityOnMobiles();
          return;
        }
        setVisibilityOfAlmostAllSubmenusToFalseExcludingMobileFirstLevelToMaintainVisibilityOnMobiles();
        state.isAboutSubmenuVisible.set(true);
        state.isMobileAboutSubMenuVisible.set(true);
        break;

      case 'GROUPS':
        if (state.isGroupsSubmenuVisible.get() === true) {
          setVisibilityOfAlmostAllSubmenusToFalseExcludingMobileFirstLevelToMaintainVisibilityOnMobiles();
          return;
        }
        setVisibilityOfAlmostAllSubmenusToFalseExcludingMobileFirstLevelToMaintainVisibilityOnMobiles();
        state.isGroupsSubmenuVisible.set(true);
        state.isMobileGroupsSubMenuVisible.set(true);
        break;

      case 'ACCESSIBILITY':
        if (state.isAccessibilitySubmenuVisible.get() === true) {
          setVisibilityOfAlmostAllSubmenusToFalseExcludingMobileFirstLevelToMaintainVisibilityOnMobiles();
          return;
        }
        setVisibilityOfAlmostAllSubmenusToFalseExcludingMobileFirstLevelToMaintainVisibilityOnMobiles();
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
    /** link getter */
    getLinkData(linkName: TLinkName) {
      return state.links.get().find((link) => link.name === linkName);
    },
    /** about submenu */
    getIsAboutSubmenuVisible() {
      return state.isAboutSubmenuVisible.get();
    },
    toggleIsAboutSubmenuVisible() {
      setProvidedSubmenuVisibilityToTrue_OtherToFalse('ABOUT');
    },
    /** groups submenu */
    getIsGroupsSubmenuVisible() {
      return state.isGroupsSubmenuVisible.get();
    },
    toggleIsGroupsSubmenuVisible() {
      setProvidedSubmenuVisibilityToTrue_OtherToFalse('GROUPS');
    },

    /** accessibility navigation getter */
    getIsAccessibilitySubmenuVisible() {
      return state.isAccessibilitySubmenuVisible.get();
    },
    getIsMobileAccessibilitySubmenuVisible() {
      return state.isMobileAccessibilitySubMenuVisible.get();
    },
    setIsAccessibilitySubmenuVisible_ToTrue() {
      setProvidedSubmenuVisibilityToTrue_OtherToFalse('ACCESSIBILITY');
    },
    setIsAccessibilitySubmenuVisible_ToFalse() {
      state.isAccessibilitySubmenuVisible.set(false);
    },

    /** hide all submenus */
    hideAllSubmenus() {
      setVisibilityOfAllSubmenusToFalse();
    },

    /** current device */
    getCurrentDevice() {
      return state.currentDevice.get();
    },
    setCurrentDevice(currentDevice: TCurrentDevice) {
      return state.currentDevice.set(currentDevice);
    },

    /** mobile menu - first level */
    getIsAnyOfSecondLevelSubmenusVisible() {
      return getIsAnyOfSecondLevelSubmenusVisibleHelper();
    },

    /** mobile menu - first level */
    getIsMobileMenuFirstLevelVisible() {
      return state.isMobileMenuFirstLevelVisible.get();
    },
    setIsMobileMenuFirstLevelVisible_ToBeVisible() {
      state.isMobileMenuFirstLevelVisible.set(true);
    },
    setIsMobileMenuFirstLevelVisible_Not_ToBeVisible() {
      state.isMobileMenuFirstLevelVisible.set(false);
    },

    /** mobile groups submenu */
    getIsMobileGroupsSubMenuVisible() {
      return state.isMobileGroupsSubMenuVisible.get();
    },
    // setIsMobileGroupsSubMenu_ToBeVisible() {
    //   state.isMobileGroupsSubMenuVisible.set(true);
    // },
    // setIsMobileGroupsSubMenu_Not_ToBeVisible() {
    //   state.isMobileGroupsSubMenuVisible.set(false);
    // },

    /** mobile groups submenu */
    getIsMobileAboutSubMenuVisible() {
      return state.isMobileAboutSubMenuVisible.get();
    },
  };
}
