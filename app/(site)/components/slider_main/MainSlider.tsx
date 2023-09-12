import { TSlide } from '@/types';
import SliderView from './SliderView';
import { Fragment } from 'react';

type Props = {
  sliderData: TSlide[];
};

export default function MainSlider(props: Props) {
  ////vars
  const { sliderData } = props;

  ////tsx
  return (
    <Fragment>
      {sliderData.length > 0 ? <SliderView sliderData={sliderData} /> : null}
    </Fragment>
  );
}
