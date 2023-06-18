import { TLayoutState } from '@/types';
import { hookstate, useHookstate } from '@hookstate/core';
import { devtools } from '@hookstate/devtools';

const layoutStateData: TLayoutState = {
  mode: 'NORMAL',
  fontSize: 'NORMAL',
};

const layoutState = hookstate(
  layoutStateData,
  devtools({ key: 'layoutState' })
);

export function useLayoutState() {
  const state = useHookstate(layoutState);

  return {
    /** mode getter */
    getLayoutMode() {
      return state.mode.get();
    },

    /** mode toggler: NORMAL <-> HIGH_CONTRAST */
    toggleLayoutState() {
      if (state.mode.get() === 'NORMAL') {
        state.mode.set('HIGH_CONTRAST');
      } else {
        state.mode.set('NORMAL');
      }
    },

    /** fontSize getter */
    getFontSize() {
      return state.fontSize.get();
    },

    /** font-size toggler: 'NORMAL' -> 'BIGGER' -> 'BIGGEST' -> back */
    toggleFontSize() {
      switch (state.fontSize.get()) {
        case 'NORMAL':
          state.fontSize.set('BIGGER');
          break;

        case 'BIGGER':
          state.fontSize.set('BIGGEST');
          break;

        case 'BIGGEST':
          state.fontSize.set('NORMAL');
          break;

        default:
          state.fontSize.set('NORMAL');
      }
    },
  };
}
