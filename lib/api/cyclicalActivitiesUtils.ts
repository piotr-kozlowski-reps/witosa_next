import { CyclicalActivityTemporary } from '@/types';
import { allCyclicalActivitiesMockData } from './temporaryApiMockData';

export async function getCyclicalActivities() {
  //TODO: finally api call - open to everyone
  const cyclicalActivitiesData: CyclicalActivityTemporary[] =
    allCyclicalActivitiesMockData;

  return cyclicalActivitiesData;
}
