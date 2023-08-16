import { TSliderGroupsImages } from '@/types';
import { Slide } from '@prisma/client';
import {
  mainSliderMockData,
  sliderGroupsHipnoteriaBisImages,
} from './temporaryApiMockData';

export async function getMainSliderData() {
  //TODO: finally api call - open to everyone
  const sliderData: Slide[] = mainSliderMockData;
  return sliderData;
}

export async function getGroupsSliderData() {
  //TODO: finally api call - open to everyone
  const sliderData: TSliderGroupsImages[] = sliderGroupsHipnoteriaBisImages;
  return sliderData;
}
