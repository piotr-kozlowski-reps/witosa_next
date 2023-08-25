import { CyclicalActivityTemporary } from '@/types';
import { allCyclicalActivitiesMockData } from './temporaryApiMockData';

export async function getCyclicalActivities() {
  //TODO: finally api call - open to everyone
  const cyclicalActivitiesData: CyclicalActivityTemporary[] =
    allCyclicalActivitiesMockData;

  return cyclicalActivitiesData;
}

export async function getSingleCyclicalActivity(id: string) {
  // console.log(
  //   'fetched: ',
  //   allCyclicalActivitiesMockData.find((activity) => activity.id === id)
  // );

  return allCyclicalActivitiesMockData.find((activity) => activity.id === id);
}
