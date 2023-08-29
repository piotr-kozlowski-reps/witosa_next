import { TSlide } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import SliderContent from './SliderContent';

type Props = {
  sliderData: TSlide[];
};

export default function SliderView(props: Props) {
  ////vars
  const { sliderData } = props;

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
    setDirection(1);
    if (slideIndex === sliderData.length - 1) {
      setSlideIndex(0);
      return;
    }
    setSlideIndex((prevValue) => prevValue + 1);
  }, [slideIndex, sliderData.length]);

  //pausing slider
  const [isPaused, setIsPaused] = useState(false);

  let timer: ReturnType<typeof setInterval>;
  const runSliderChanges = () => {
    timer = setInterval(() => {
      setDirection(1);
      setSlideIndex((prevValue) => {
        return prevValue === sliderData.length - 1 ? 0 : prevValue + 1;
      });
    }, 6000);
  };

  useEffect(() => {
    if (!isPaused) runSliderChanges();
    return () => clearInterval(timer);
  }, [slideIndex, direction, isPaused]);

  const toggleSliderPausing = () => {
    setIsPaused((prevValue) => !prevValue);
  };

  ////tsx
  return (
    <section className="proper-container-classes">
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
