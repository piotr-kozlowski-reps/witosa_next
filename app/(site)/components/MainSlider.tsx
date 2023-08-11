// import { mainSliderMockData } from '@/lib/api/temporaryApiMockData';
import { getSliderData } from '@/lib/api/sliderUtils';
import { Slide } from '@prisma/client';
import SliderView from './SliderView';

export default async function MainSlider() {
  const sliderData: Slide[] = await getSliderData();

  return <SliderView slidersData={sliderData} />;
}
