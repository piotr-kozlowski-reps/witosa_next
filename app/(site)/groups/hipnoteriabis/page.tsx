'use client';

import { useNavigationState } from '@/context/navigationState';
import clsx from 'clsx';
import SliderGroups from '../../components/slider_main/SliderGroups';

export default function HipnoteriaBisPage() {
  const { getCurrentDevice } = useNavigationState();
  return (
    <main
      className={clsx(
        getCurrentDevice() === 'MOBILE' ? 'mx-mobile-margin' : '',
        getCurrentDevice() === 'TABLET' ? 'mx-tablet-margin' : '',
        getCurrentDevice() === 'DESKTOP' ? 'desktop-container' : ''
      )}
    >
      <SliderGroups />
    </main>
  );
}
