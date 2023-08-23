import { CyclicalActivityTemporary } from '@/types';
import { ActivityForWhom, ActivityType } from '@prisma/client';
import { useEffect, useState } from 'react';

export function useChosenCyclicalActivitiesHandler(
  cyclicalActivities: CyclicalActivityTemporary[],
  categories: ActivityType[],
  forWhom: ActivityForWhom[]
) {
  const [chosenCyclicalActivities, setChosenCyclicalActivities] = useState<
    CyclicalActivityTemporary[]
  >(Object.values(cyclicalActivities));

  useEffect(() => {
    const resultChosenCyclicalActivities = cyclicalActivities
      .filter((activity) =>
        activity.activityTypes.some((item) => categories.includes(item))
      )
      .filter((activity) =>
        activity.activitiesForWhom.some((item) => forWhom.includes(item))
      );

    setChosenCyclicalActivities(resultChosenCyclicalActivities);
  }, [categories, forWhom, cyclicalActivities]);

  return chosenCyclicalActivities;
}
