import { useLayoutState } from '@/context/layoutState';
import { TIconSize } from '@/types';

// type Props = {
//   alt: string;
//   size?: TIconSize;
//   url: string;
// };

export function useIconsLogicHandler(size?: TIconSize) {
  ////vars
  const { getCurrentForegroundColor } = useLayoutState();

  let width = 32;
  let height = 32;
  switch (size) {
    case 'SMALL':
      width = 24;
      height = 24;
      break;

    case 'NORMAL':
      width = 32;
      height = 32;
      break;

    case 'BIG':
      width = 44;
      height = 44;
      break;

    default:
      width = 44;
      height = 44;
  }

  const currentForegroundColor = getCurrentForegroundColor();

  return { width, height, currentForegroundColor };
}
