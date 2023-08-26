import { TEventTemporary } from '@/types';
import { allEventsMockData } from './temporaryApiMockData';

export async function getAllEvents() {
  const allEvents: TEventTemporary[] = allEventsMockData;
  return allEvents;
}

export async function getSingleEvent(id: string) {
  return allEventsMockData.find((event) => event.id === id);
}
