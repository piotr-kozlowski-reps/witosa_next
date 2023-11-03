import { getAllEvents } from '@/actions/eventsActions';
import { TEventTemporary } from '@/types';
import {
  isFirstDateAfterSecond,
  isFirstDateBeforeSecond,
} from '../dateHelpers';
import { allEventsMockData } from './temporaryApiMockData';

export async function getAllEventsSorted() {
  const allEvents: TEventTemporary[] = allEventsMockData.sort(function (a, b) {
    return a.eventStartDate.getTime() - b.eventStartDate.getTime();
  });
  return allEvents;
}

export async function getEvents_ExcludingThoseNotToBeSeenInEventsSection_NotCurrent_AndThoseNotToBePublished_Sorted() {
  const allEventsResponse = await getAllEvents();

  const allEvents: TEventTemporary[] = (
    allEventsResponse.response as TEventTemporary[]
  )
    .filter((event) => event.isToBePublished)
    .filter((event) => event.isToBeOnlyInNewsSection_NotSeenInEvents !== true)
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
    .sort(function (a, b) {
      return a.eventStartDate.getTime() - b.eventStartDate.getTime();
    });

  return allEvents;
}

export async function getSingleEvent(id: string) {
  return allEventsMockData.find((event) => event.id === id);
}
