'use client';

import { useAdjustContainerWIdthsAndMargins } from '@/hooks/useAdjustContainerWIdthsAndMargins';
import { Slide } from '@prisma/client';
import { useCallback, useState } from 'react';
import SliderContent from './SliderContent';

type Props = {
  sliderData: Slide[];
};

export default function SliderView(props: Props) {
  ////vars
  const { sliderData } = props;
  const containerProperClasses = useAdjustContainerWIdthsAndMargins();

  ////utils
  //left-right
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const prevButtonHandler = () => {
    setDirection(-1);
    if (slideIndex === 0) {
      setSlideIndex(sliderData.length - 1);
      return;
    }
    setSlideIndex((prevValue) => prevValue - 1);
  };

  const nextButtonHandler = useCallback(() => {
    console.log({ index: slideIndex });
    console.log('sliderData.length: ', sliderData.length);
    console.log('sliderData.length - 1: ', sliderData.length - 1);

    setDirection(1);
    if (slideIndex === sliderData.length - 1) {
      setSlideIndex(0);
      return;
    }
    setSlideIndex((prevValue) => prevValue + 1);
  }, [slideIndex, sliderData.length]);

  //pausing slider
  const [isPaused, setIsPaused] = useState(false);
  // if (!isPaused) {
  //   const sliderChangeInterval = setInterval(() => {
  //     nextButtonHandler();
  //   }, 2000);
  // }

  // useEffect(() => {
  //   if (!isPaused) {
  //     const sliderChangeInterval = setInterval(() => {
  //       nextButtonHandler();
  //     }, 2000);
  //   }

  //   // return () => {
  //   //   clearInterval(sliderChangeInterval);
  //   // };
  // }, [isPaused, setSlideIndex, slideIndex, nextButtonHandler]);

  // console.log(slideIndex);
  // console.log(sliderData[slideIndex]);
  // console.log(sliderData[slideIndex].id);

  ////tsx
  return (
    <section className={containerProperClasses}>
      <SliderContent
        slide={sliderData[slideIndex]}
        eventId={sliderData[slideIndex].id}
        direction={direction}
        prevButtonHandler={prevButtonHandler}
        nextButtonHandler={nextButtonHandler}
      />
    </section>
  );
}
