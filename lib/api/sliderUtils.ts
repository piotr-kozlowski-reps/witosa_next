import { TGroups, TSlide, TSliderGroupImage } from '@/types';
import {
  allEventsMockData,
  sliderGroupsHipnoteriaBisImages,
} from './temporaryApiMockData';

// export async function getMainSliderData() {
//   //TODO: finally api call - open to everyone
//   const sliderData: Slide[] = mainSliderMockData;
//   return sliderData;
// }

export async function getEventsMappedToMainSliderData() {
  const eventsToBeSeenInSlider = allEventsMockData.filter(
    (event) => event.isToBeInSlider
  );

  const mappedEventsForSlider: TSlide[] = eventsToBeSeenInSlider.map(
    (event) => {
      return {
        id: event.id,
        eventTypes: event.eventTypes,
        eventStartDate: event.eventStartDate,
        title: event.title,
        sliderImageUrl: event.sliderImageUrl,
        sliderImageAlt: event.sliderImageAlt,
      };
    }
  );

  return mappedEventsForSlider;
}

export async function getGroupsSliderData(group: TGroups) {
  //TODO: finally api call - open to everyone

  let sliderData: TSliderGroupImage[] = [];
  switch (group) {
    case 'MARZENIE_MINI_MINI':
      sliderData = sliderGroupsHipnoteriaBisImages.marzenieMiniMini;
      break;

    case 'MARZENIE_BIS':
      sliderData = sliderGroupsHipnoteriaBisImages.marzenieBis;
      break;

    case 'MARZENIE':
      sliderData = sliderGroupsHipnoteriaBisImages.marzenie;
      break;

    case 'HIPNOTERIA_BIS':
      sliderData = sliderGroupsHipnoteriaBisImages.hipnoteriaBis;
      break;

    case 'HIPNOTERIA':
      sliderData = sliderGroupsHipnoteriaBisImages.hipnoteria;
      break;

    default:
      throw new Error('Group name is wrong.');
  }
  return sliderData;
}
