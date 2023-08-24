import { getMainSliderData } from '@/lib/api/sliderUtils';
import { Slide } from '@prisma/client';
import SliderView from './SliderView';

export default async function MainSlider() {
  ////vars
  const sliderData: Slide[] = await getMainSliderData();

  ////tsx
  return <SliderView sliderData={sliderData} />;
}
