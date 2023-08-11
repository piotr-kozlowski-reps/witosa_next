import { Slide } from '@prisma/client';
import { mainSliderMockData } from './temporaryApiMockData';

export async function getSliderData() {
  //TODO: finally api call - open to everyone
  const sliderData: Slide[] = mainSliderMockData;
  return sliderData;
}
