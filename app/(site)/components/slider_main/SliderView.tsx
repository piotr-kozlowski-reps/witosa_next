'use client';

import { useAdjustContainerWIdthsAndMargins } from '@/hooks/useAdjustContainerWIdthsAndMargins';
import { Slide } from '@prisma/client';
import { useCallback, useEffect, useState } from 'react';
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
  const [direction, setDirection] = useState(1);

  const prevButtonHandler = () => {
    setDirection(-1);
    if (slideIndex === 0) {
      setSlideIndex(sliderData.length - 1);
      return;
    }
    setSlideIndex((prevValue) => prevValue - 1);
  };

  const nextButtonHandler = useCallback(() => {
    // console.log({ index: slideIndex });
    // console.log('sliderData.length: ', sliderData.length);
    // console.log('sliderData.length - 1: ', sliderData.length - 1);

    setDirection(1);
    if (slideIndex === sliderData.length - 1) {
      setSlideIndex(0);
      return;
    }
    setSlideIndex((prevValue) => prevValue + 1);
  }, [slideIndex, sliderData.length]);

  //pausing slider
  const [isPaused, setIsPaused] = useState(false);

  let timer: unknown;
  const runSliderChanges = () => {
    timer =
      !timer &&
      !isPaused &&
      setInterval(() => {
        setDirection(1);
        setSlideIndex((prevValue) => {
          return prevValue === sliderData.length - 1 ? 0 : prevValue + 1;
        });
      }, 6000);
  };

  useEffect(() => {
    runSliderChanges();
    return () => clearInterval(timer);
  }, [slideIndex, direction, isPaused]);

  const toggleSliderPausing = () => {
    setIsPaused((prevValue) => !prevValue);
  };

  ////tsx
  return (
    <section className={containerProperClasses}>
      <SliderContent
        slide={sliderData[slideIndex]}
        eventId={sliderData[slideIndex].id}
        direction={direction}
        prevButtonHandler={prevButtonHandler}
        nextButtonHandler={nextButtonHandler}
        toggleSliderButtonFn={toggleSliderPausing}
        isSliderPaused={isPaused}
      />
    </section>
  );
}
