import { TEventTemporary } from '@/types';
import { allEventsMockData } from './temporaryApiMockData';

export async function getAllEventsSorted() {
  const allEvents: TEventTemporary[] = allEventsMockData.sort(function (a, b) {
    return a.eventStartDate.getTime() - b.eventStartDate.getTime();
  });
  return allEvents;
}

export async function getEventsExcludingThoseNotToBeSeenInEventsSectionSorted() {
  const allEvents: TEventTemporary[] = allEventsMockData
    .filter((event) => event.isToBeOnlyInNewsSection_NotSeenInEvents !== true)
    .sort(function (a, b) {
      return a.eventStartDate.getTime() - b.eventStartDate.getTime();
    });
  return allEvents;
}

export async function getSingleEvent(id: string) {
  return allEventsMockData.find((event) => event.id === id);
}
