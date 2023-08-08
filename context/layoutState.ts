import { TLayoutState } from '@/types';
import { hookstate, useHookstate } from '@hookstate/core';
import { devtools } from '@hookstate/devtools';

const layoutStateData: TLayoutState = {
  mode: 'LIGHT',
  fontSize: 'NORMAL',
};

const layoutState = hookstate(
  layoutStateData,
  devtools({ key: 'layoutState' })
);

export function useLayoutState() {
  const state = useHookstate(layoutState);

  return {
    /** layoutModeGetter */
    getLayoutMode() {
      return state.mode.get();
    },
    /** layoutModeSetters */
    setLayoutModeToLight() {
      state.mode.set('LIGHT');
    },
    setLayoutModeToDark() {
      state.mode.set('DARK');
    },
    setLayoutModeToContrast() {
      state.mode.set('CONTRAST');
    },

    /** fontSizeGetter */
    getFontSize() {
      return state.fontSize.get();
    },
    /** fontSizeSetters */
    setFontSizeToNormal() {
      state.fontSize.set('NORMAL');
    },
    setFontSizeToBigger() {
      state.fontSize.set('BIGGER');
    },
    setFontSizeToBiggest() {
      state.fontSize.set('BIGGEST');
    },
  };
}
