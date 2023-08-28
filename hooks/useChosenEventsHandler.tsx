import { TEventTemporary } from '@/types';
import { EventType, ForWhom } from '@prisma/client';
import { useEffect, useState } from 'react';

export function useChosenEventsHandler(
  events: TEventTemporary[],
  categories: EventType[],
  forWhom: ForWhom[]
) {
  const [chosenEvents, setChosenEvents] = useState<TEventTemporary[]>(
    Object.values(events)
  );

  useEffect(() => {
    const resultChosenCyclicalActivities = events
      .filter((event) =>
        event.eventTypes.some((item) => categories.includes(item))
      )
      .filter((event) =>
        event.eventForWhom.some((item) => forWhom.includes(item))
      );

    setChosenEvents(resultChosenCyclicalActivities);
  }, [categories, forWhom, events]);

  return chosenEvents;
}
