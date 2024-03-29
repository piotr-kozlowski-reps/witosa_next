import { getAllEvents } from '@/actions/eventsActions';
import { TEventTemporary, TGroups, TSliderGroupImage } from '@/types';
import {
  isFirstDateAfterSecond,
  isFirstDateBeforeSecond,
} from '../dateHelpers';
import logger from '../logger';
import {
  allEventsMockData,
  sliderGroupsHipnoteriaBisImages,
} from './temporaryApiMockData';

export async function getAllEventsMappedToMainSliderData() {
  const eventsToBeSeenInSlider = allEventsMockData.filter(
    (event) => event.isToBeInSlider
  );

  return mapEventsForSlider(eventsToBeSeenInSlider);
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

export async function getEventsMappedToMainSliderData_FilteredToBeSeenInNews() {
  const allEventsResponse = await getAllEvents();
  if (!allEventsResponse || allEventsResponse.status === 'ERROR') {
    logger.warn(
      "Couldn't fetch events in getEventsMappedToMainSliderData_FilteredToBeSeenInNews()"
    );
    return [];
  }

  const eventsToBeSeenInSlider: TEventTemporary[] = (
    allEventsResponse.response as TEventTemporary[]
  )

    /** check if event is to be published - if so, needs to be filtered out */
    .filter((event) => event.isToBePublished)

    /** check if event is to be visible in slider */
    .filter((event) => event.isToBeInSlider)

    /** check if event is to be visible only in news - if so, needs to be filtered out */
    .filter((event) => !event.isToBeOnlyInNewsSection_NotSeenInEvents)

    /** check if event's dates of visibility are between Date.now()  */
    .filter((event) => {
      if (!event.visibleInSliderFrom || !event.visibleInSliderTo) {
        throw new Error(
          'Wydarzenie powinno zawierać datę, od której ma się wyświetlać w sliderze oraz datę, z którą ma się zakończyć wyświetlanie wydarzenia w sliderze.'
        );
      }
      return (
        isFirstDateBeforeSecond(
          event.visibleInSliderFrom,
          new Date(Date.now())
        ) &&
        isFirstDateAfterSecond(event.visibleInSliderTo, new Date(Date.now()))
      );
    });

  return mapEventsForSlider(eventsToBeSeenInSlider);
}

const mapEventsForSlider = (events: TEventTemporary[]) => {
  return events.map((event) => {
    return {
      id: event.id,
      eventTypes: event.eventTypes,
      eventStartDate: event.eventStartDate,
      title: event.title,
      sliderImageUrl: event.sliderImageUrl,
      sliderImageAlt: event.sliderImageAlt,
      visibleInSliderFrom: event.visibleInSliderFrom,
      visibleInSLiderTo: event.visibleInSliderTo,
    };
  });
};
