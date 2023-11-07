'use client';

import { createBetweenHoursText, getPolishDayName } from '@/lib/textHelpers';
import { CyclicalActivityTemporary } from '@/types';

type Props = {
  activity: CyclicalActivityTemporary;
};

export default function ActivityOccurence(props: Props) {
  ////vars
  const { activity } = props;

  ////tsx
  return (
    <ul>
      {activity.occurrence.map((item, index) => {
        return (
          <li key={`${index}-${item.id}`}>
            <span>{getPolishDayName(item.day)}</span>
            <span>: </span>
            <span>
              {createBetweenHoursText(item.activityStart, item.activityEnd)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
