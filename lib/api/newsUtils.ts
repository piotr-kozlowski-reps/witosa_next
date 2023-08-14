// import { TEventsMappedForNews } from '@/types';
// import { Event } from '@prisma/client';
// import { allEventsMockData } from './temporaryApiMockData';

import { TEventInNewsSection } from '@/types';
import { Event } from '@prisma/client';
import { allEventsMockData } from './temporaryApiMockData';

// export async function getNewsData() {
//   //TODO: finally api call - open to everyone
//   const eventsData: Event[] = allEventsMockData;
//   const eventsMappedForNewsSection: TEventsMappedForNews[] = eventsData.map(
//     (event) => {
//       return {
//         id: event.id,
//         eventTypes: event.eventTypes,
//         eventStartDate: event.eventStartDate,
//         newsSectionImageUrl: event.newsSectionImageUrl,
//         title: event.title,
//         shortDescription: event.shortDescription,
//       };
//     }
//   );

//   return eventsMappedForNewsSection;
// }

// export async function getNewsData() {
//   return [];
// }

export async function getNewsData() {
  //TODO: finally api call - open to everyone
  const eventsData: Event[] = allEventsMockData;
  const eventsMappedForNewsSection: TEventInNewsSection[] = eventsData.map(
    (event) => {
      return {
        id: event.id,
        eventTypes: event.eventTypes,
        eventStartDate: event.eventStartDate,
        newsSectionImageUrl: event.newsSectionImageUrl || '',
        title: event.title,
        shortDescription: event.shortDescription,
      };
    }
  );

  return eventsMappedForNewsSection;
}
