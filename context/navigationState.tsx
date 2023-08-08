// import { TLayoutState } from '@/types';
import { useChangeCurrentLinkActive } from '@/hooks/useChangeCurrentLinkActive';
import { TLink, TLinkName, TSubMenu } from '@/types';
import { hookstate, useHookstate } from '@hookstate/core';
import { devtools } from '@hookstate/devtools';

type TNavigationState = {
  links: TLink[];
  isAboutSubmenuVisible: boolean;
  isGroupsSubmenuVisible: boolean;
  isAccessibilityNavigationVisible: boolean;
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
      name: 'groups_marzenie_mini_mini',
      nameToBeDisplayed: 'Marzenie mini mini',
      path: '/groups/marzenieminimini',
      isCurrentlyUsed: false,
    },
    {
      name: 'groups_zajecia_utaneczniajace',
      nameToBeDisplayed: 'Zajęcia utaneczniające',
      path: '/groups/zajeciautaneczniajace',
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
  isAccessibilityNavigationVisible: true,
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
  const allSubmenus = [
    state.isAboutSubmenuVisible,
    state.isGroupsSubmenuVisible,
  ];
  const setVisibilityOfAllSubmenusToFalse = () => {
    allSubmenus.forEach((submenu) => {
      submenu.set(false);
    });
  };
  const setProvidedSubmenuVisibilityToTrue_OtherToFalse = (
    submenuProvided: TSubMenu
  ) => {
    switch (submenuProvided) {
      case 'about':
        if (state.isAboutSubmenuVisible.get() === true) {
          setVisibilityOfAllSubmenusToFalse();
          return;
        }
        setVisibilityOfAllSubmenusToFalse();
        state.isAboutSubmenuVisible.set(true);
        break;

      case 'groups':
        if (state.isGroupsSubmenuVisible.get() === true) {
          setVisibilityOfAllSubmenusToFalse();
          return;
        }
        setVisibilityOfAllSubmenusToFalse();
        state.isGroupsSubmenuVisible.set(true);
        return;
    }
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
      setProvidedSubmenuVisibilityToTrue_OtherToFalse('about');
    },
    /** groups submenu */
    getIsGroupsSubmenuVisible() {
      return state.isGroupsSubmenuVisible.get();
    },
    toggleIsGroupsSubmenuVisible() {
      setProvidedSubmenuVisibilityToTrue_OtherToFalse('groups');
    },

    /** accessibility navigation getter */
    getIsAccessibilityNavigationVisible() {
      return state.isAccessibilityNavigationVisible.get();
    },
    setIsAccessibilityNavigationVisible_ToTrue() {
      state.isAccessibilityNavigationVisible.set(true);
    },
    setIsAccessibilityNavigationVisible_ToFalse() {
      state.isAccessibilityNavigationVisible.set(false);
    },

    /** hide all submenus */
    hideAllSubmenus() {
      state.isAboutSubmenuVisible.set(false);
      state.isGroupsSubmenuVisible.set(false);
    },
  };
}
