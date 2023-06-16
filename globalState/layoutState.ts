import { TLayoutState } from '@/types';
import { hookstate, useHookstate } from '@hookstate/core';
import { devtools } from '@hookstate/devtools';

const layoutStateData: TLayoutState = {
  mode: 'NORMAL',
};

const layoutState = hookstate(
  layoutStateData,
  devtools({ key: 'layoutState' })
);

export function useLayoutState() {
  const state = useHookstate(layoutState);

  return {
    getLayoutMode() {
      return state.mode.get();
    },

    toggleLayoutState() {
      if (state.mode.get() === 'NORMAL') {
        state.mode.set('HIGH_CONTRAST');
      } else {
        state.mode.set('NORMAL');
      }
    },
  };
}
