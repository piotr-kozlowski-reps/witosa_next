// import { TLayoutState } from '@/types';
import { TLinkName } from '@/types';
import { hookstate, useHookstate } from '@hookstate/core';
import { devtools } from '@hookstate/devtools';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

type TLink = {
  name: TLinkName;
  nameToBeDisplayed: string;
  path: string;
  isCurrentlyUsed: boolean;
};

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
  const currentpathName = usePathname();

  useEffect(() => {
    const currentLinks: TLink[] = state.links
      .get({ noproxy: true })
      .map((link) => {
        return link;
      });
    const resetToFalse_IsCurrentlyUsedProperty_InLinks = currentLinks.map(
      (link) => ({ ...link, isCurrentlyUsed: false })
    );

    resetToFalse_IsCurrentlyUsedProperty_InLinks.map((link) => {
      if (link.path === currentpathName) {
        return { ...link, isCurrentlyUsed: true };
      }
    });

    // //set appropriate link isCurrentlyUsed
  }, [currentpathName]);

  return {
    /** link getter */
    getLinkData(linkName: TLinkName) {
      return state.links.get().find((link) => link.name === linkName);
    },

    /** mode toggler: NORMAL <-> HIGH_CONTRAST */
    // toggleLayoutState() {
    //   if (state.mode.get() === 'NORMAL') {
    //     state.mode.set('HIGH_CONTRAST');
    //   } else {
    //     state.mode.set('NORMAL');
    //   }
    // },

    /** fontSize getter */
    // getFontSize() {
    //   return state.fontSize.get();
    // },

    /** font-size toggler: 'NORMAL' -> 'BIGGER' -> 'BIGGEST' -> back */
    // toggleFontSize() {
    //   switch (state.fontSize.get()) {
    //     case 'NORMAL':
    //       state.fontSize.set('BIGGER');
    //       break;

    //     case 'BIGGER':
    //       state.fontSize.set('BIGGEST');
    //       break;

    //     case 'BIGGEST':
    //       state.fontSize.set('NORMAL');
    //       break;

    //     default:
    //       state.fontSize.set('NORMAL');
    //   }
    // },
  };
}
