import { useNavigationState } from '@/context/navigationState';

export function useAdjustContainerWIdthsAndMargins() {
  const { getCurrentDevice } = useNavigationState();

  let correctClassesToEstablishProperContainer = '';

  switch (getCurrentDevice()) {
    case 'MOBILE':
      correctClassesToEstablishProperContainer = 'mx-mobile-margin';
      break;

    case 'TABLET':
      correctClassesToEstablishProperContainer = 'mx-tablet-margin';
      break;

    case 'DESKTOP':
      correctClassesToEstablishProperContainer = 'desktop-container';
      break;
  }

  return correctClassesToEstablishProperContainer;
}
