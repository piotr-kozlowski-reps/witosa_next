import { TSlide } from '@/types';
import SliderView from './SliderView';

type Props = {
  sliderData: TSlide[];
};

export default function MainSlider(props: Props) {
  ////vars
  const { sliderData } = props;

  ////tsx
  return <SliderView sliderData={sliderData} />;
}
