import { TEventInNewsSection } from '@/types';
import { Event } from '@prisma/client';
import { allEventsMockData } from './temporaryApiMockData';

export async function getNewsDataSorted() {
  //TODO: finally api call - open to everyone
  const eventsData: Event[] = allEventsMockData;
  const eventsMappedForNewsSection: TEventInNewsSection[] = eventsData
    .map((event) => {
      return {
        id: event.id,
        eventTypes: event.eventTypes,
        eventStartDate: event.eventStartDate,
        newsSectionImageUrl: event.newsSectionImageUrl || '',
        title: event.title,
        shortDescription: event.shortDescription,
      };
    })
    .sort(function (a, b) {
      return a.eventStartDate.getTime() - b.eventStartDate.getTime();
    });

  return eventsMappedForNewsSection;
}
