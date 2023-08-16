'use client';

import { useNavigationState } from '@/context/navigationState';
import { TSliderGroupsImages } from '@/types';
import clsx from 'clsx';

type Props = {
  sliderImages: TSliderGroupsImages[];
};

export default function SliderGroups(props: Props) {
  ////vars
  const { sliderImages } = props;
  const { getCurrentDevice } = useNavigationState();
  ////tsx
  return (
    <div
      className={clsx(
        'h-[352px] bg-skin-primary rounded-base relative bg-no-repeat bg-cover bg-center',
        getCurrentDevice() === 'MOBILE' ? 'mx-mobile-margin' : '',
        getCurrentDevice() === 'TABLET' ? 'mx-tablet-margin' : '',
        getCurrentDevice() === 'DESKTOP' ? 'desktop-container ' : ''
      )}
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL}${sliderImages[0].url})`,
      }}
    ></div>
  );
}
