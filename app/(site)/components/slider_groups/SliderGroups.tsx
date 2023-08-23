'use client';

import { TSliderGroupImage } from '@/types';
import clsx from 'clsx';
import {
  HashNavigation,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import { useAdjustContainerWIdthsAndMargins } from '@/hooks/useAdjustContainerWIdthsAndMargins';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Props = {
  sliderImages: TSliderGroupImage[];
};

export default function SliderGroups(props: Props) {
  ////vars
  const { sliderImages } = props;
  // const { getCurrentDevice } = useNavigationState();
  const containerProperClasses = useAdjustContainerWIdthsAndMargins();

  ////tsx
  return (
    <Swiper
      navigation={true}
      pagination={{
        clickable: true,
      }}
      mousewheel={true}
      keyboard={true}
      loop={true}
      hashNavigation={{
        watchState: true,
      }}
      modules={[Navigation, Pagination, Mousewheel, Keyboard, HashNavigation]}
      className={containerProperClasses}
    >
      {sliderImages.map((sliderImage, index) => {
        return (
          <SwiperSlide key={index}>
            <div
              className={clsx(
                'h-[352px] bg-skin-primary rounded-base relative bg-no-repeat bg-cover bg-center -z-10',
                containerProperClasses
              )}
              style={{
                backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL}${sliderImage.url})`,
              }}
              aria-label={`${sliderImage.alt}`}
            ></div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
