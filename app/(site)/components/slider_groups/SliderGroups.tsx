'use client';

import { TSliderGroupImage } from '@/types';
import clsx from 'clsx';
import { Fragment } from 'react';
import {
  HashNavigation,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import { useNavigationState } from '@/context/navigationState';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Props = {
  sliderImages: TSliderGroupImage[];
};

export default function SliderGroups(props: Props) {
  ////vars
  const { sliderImages } = props;
  const { getCurrentDevice } = useNavigationState();

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
      className="proper-container-classes"
    >
      {sliderImages.map((sliderImage, index) => {
        return (
          <Fragment key={index}>
            <div className="relative">
              <SwiperSlide>
                <div
                  className="h-[352px] bg-skin-primary rounded-base relative bg-no-repeat bg-cover bg-center -z-10 proper-container-classes"
                  style={{
                    backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL}${sliderImage.url})`,
                  }}
                  aria-label={`${sliderImage.alt}`}
                ></div>
                {sliderImage.additionInfoThatMustBeDisplayed ? (
                  <div
                    className={clsx(
                      'absolute bottom-2 right-4 font-sm-normal text-background',
                      getCurrentDevice() === 'TABLET' ? 'mx-tablet-margin' : '',
                      getCurrentDevice() === 'MOBILE' ? 'mx-mobile-margin' : ''
                    )}
                  >
                    {sliderImage.additionInfoThatMustBeDisplayed}
                  </div>
                ) : null}
              </SwiperSlide>
            </div>
          </Fragment>
        );
      })}
    </Swiper>
  );
}
