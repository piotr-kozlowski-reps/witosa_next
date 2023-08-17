import { TLayoutState, TMode } from '@/types';
import { hookstate, useHookstate } from '@hookstate/core';
import { devtools } from '@hookstate/devtools';

const layoutStateData: TLayoutState = {
  mode: 'LIGHT',
  fontSize: 'NORMAL',
  foregroundColor: '#222221',
};

const layoutState = hookstate(
  layoutStateData,
  devtools({ key: 'layoutState' })
);

export function useLayoutState() {
  const state = useHookstate(layoutState);

  const setCurrentForegroundColor = (mode: TMode) => {
    switch (mode) {
      case 'LIGHT':
        state.foregroundColor.set('#222221');
        break;

      case 'DARK':
        state.foregroundColor.set('#fdfdfd');
        break;

      case 'CONTRAST':
        state.foregroundColor.set('#fffe54');
        break;

      default:
        state.foregroundColor.set('#222221');
    }
  };

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

    /** get current foreground color */
    getCurrentForegroundColor() {
      setCurrentForegroundColor(state.mode.get());
      return state.foregroundColor.get();
    },
  };
}
