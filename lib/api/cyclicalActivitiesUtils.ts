import { CyclicalActivityTemporary } from '@/types';
import { Day } from '@prisma/client';

export const getCyclicalActivitiesByDayOfTheWeekSortedByDate = (
  chosenCyclicalActivities: CyclicalActivityTemporary[],
  day: Day
) => {
  if (!chosenCyclicalActivities) {
    return [];
  }

  const cyclicalActivitiesWithDesiredDay = chosenCyclicalActivities.filter(
    (activity) => activity.occurrence.find((item) => item.day === day)
  );

  const cyclicalActivitiesCopiedAsManyTimesAsNeededToHaveOnlyOneDayOccurrence: CyclicalActivityTemporary[] =
    [];

  cyclicalActivitiesWithDesiredDay.forEach((activity) => {
    activity.occurrence.forEach((currentOccurrence) => {
      if (currentOccurrence.day === day) {
        cyclicalActivitiesCopiedAsManyTimesAsNeededToHaveOnlyOneDayOccurrence.push(
          { ...activity, occurrence: [currentOccurrence] }
        );
      }
    });
  });

  const resultCyclicalActivitiesByDay =
    cyclicalActivitiesCopiedAsManyTimesAsNeededToHaveOnlyOneDayOccurrence.sort(
      (a, b) => {
        const aStartHour = a.occurrence[0].activityStart.getHours();
        const bStartHour = b.occurrence[0].activityStart.getHours();
        const aStartMinutes = a.occurrence[0].activityStart.getMinutes();
        const bStartMinutes = b.occurrence[0].activityStart.getMinutes();

        if (aStartHour !== bStartHour) {
          return aStartHour - bStartHour;
        }

        return aStartMinutes - bStartMinutes;
      }
    );

  return resultCyclicalActivitiesByDay;
};
