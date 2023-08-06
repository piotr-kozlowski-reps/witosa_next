// import { TLayoutState } from '@/types';
import { useChangeCurrentLinkActive } from '@/hooks/useChangeCurrentLinkActive';
import { TLink, TLinkName } from '@/types';
import { hookstate, useHookstate } from '@hookstate/core';
import { devtools } from '@hookstate/devtools';

type TNavigationState = {
  links: TLink[];
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
      name: 'groups',
      nameToBeDisplayed: 'grupy artystyczne',
      path: '/groups',
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
  ],
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

  return {
    /** link getter */
    getLinkData(linkName: TLinkName) {
      return state.links.get().find((link) => link.name === linkName);
    },
  };
}
