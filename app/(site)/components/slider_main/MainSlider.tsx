import { getEventsMappedToMainSliderData } from '@/lib/api/sliderUtils';
import { TSlide } from '@/types';
import SliderView from './SliderView';

export default async function MainSlider() {
  ////vars
  const sliderData: TSlide[] = await getEventsMappedToMainSliderData();

  ////tsx
  return <SliderView sliderData={sliderData} />;
}
