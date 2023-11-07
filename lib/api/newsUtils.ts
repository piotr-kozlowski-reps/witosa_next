import { getAllEvents } from '@/actions/eventsActions';
import { TEventInNewsSection, TEventTemporary } from '@/types';
import {
  isFirstDateAfterSecond,
  isFirstDateBeforeSecond,
} from '../dateHelpers';
import logger from '../logger';

export async function getNewsDataSorted() {
  const allEventsResponse = await getAllEvents();
  if (!allEventsResponse || allEventsResponse.status === 'ERROR') {
    logger.warn(
      "Couldn't fetch events in getEventsMappedToMainSliderData_FilteredToBeSeenInNews()"
    );
    return [];
  }

  const eventsData: TEventTemporary[] =
    allEventsResponse.response as TEventTemporary[];

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
        isToBeOnlyInNewsSection_NotSeenInEvents:
          event.isToBeOnlyInNewsSection_NotSeenInEvents,
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
