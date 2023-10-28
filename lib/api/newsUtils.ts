import { TEventInNewsSection, TEventTemporary } from '@/types';
import {
  isFirstDateAfterSecond,
  isFirstDateBeforeSecond,
} from '../dateHelpers';
import { allEventsMockData } from './temporaryApiMockData';

export async function getNewsDataSorted() {
  //TODO: finally api call - open to everyone - with fetch and tag
  const eventsData: TEventTemporary[] = allEventsMockData;

  const eventsMappedForNewsSection: TEventInNewsSection[] = eventsData
    .filter((event) => checkIfEventIsToBePublished(event))
    .filter((event) => {
      if (event.visibleFrom) {
        return isFirstDateBeforeSecond(event.visibleFrom, new Date(Date.now()));
      }
    })
    .filter((event) => {
      if (event.visibleTo) {
        return isFirstDateAfterSecond(event.visibleTo, new Date(Date.now()));
      }
    })
    .map((event) => {
      return {
        id: event.id,
        eventTypes: event.eventTypes,
        eventStartDate: event.eventStartDate,
        newsSectionImageUrl: event.newsSectionImageUrl,
        newsSectionImageAlt: event.newsSectionImageAlt,
        title: event.title,
        shortDescription: event.shortDescription,
        isDateToBeHiddenInNewsSection: event.isDateToBeHiddenInNewsSection,
        customLinkToDetails: event.customLinkToDetails,
      };
    })
    .sort(function (a, b) {
      return a.eventStartDate.getTime() - b.eventStartDate.getTime();
    });

  return eventsMappedForNewsSection;
}

////utils
const checkIfEventIsToBePublished = (event: TEventTemporary) => {
  return event.isToBePublished;
};
