import { useNotificationState } from '@/context/notificationState';
import {
  CyclicalActivityTemporary,
  TGetAllCyclicalActivitiesResponse,
} from '@/types';

export function useCyclicalActivityResponseHandler(
  cyclicalActivitiesResponse: TGetAllCyclicalActivitiesResponse
) {
  ////vars
  const { setShowNotification } = useNotificationState();

  let cyclicalActivities: CyclicalActivityTemporary[] = [];

  if (cyclicalActivitiesResponse.status === 'ERROR') {
    setShowNotification(
      'ERROR',
      'Nastąpił problem z pobraniem danych o zajęciach stałych, spróbuj ponownie.'
    );
  }

  cyclicalActivities =
    cyclicalActivitiesResponse.response as CyclicalActivityTemporary[];

  return cyclicalActivities;
}
