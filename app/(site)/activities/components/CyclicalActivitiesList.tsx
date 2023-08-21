import { useAdjustContainerWIdthsAndMargins } from '@/hooks/useAdjustContainerWIdthsAndMargins';
import { CyclicalActivityTemporary } from '@/types';
import clsx from 'clsx';

interface Props {
  cyclicalActivities: CyclicalActivityTemporary[];
}

export default function CyclicalActivitiesList(props: Props) {
  ////vars
  const { cyclicalActivities } = props;
  const containerProperClasses = useAdjustContainerWIdthsAndMargins();

  ////tsx
  return (
    <div className={clsx('mt-16', containerProperClasses)}>
      {cyclicalActivities.length === 0 ? (
        <div className="text-red-500">Ni ma</div>
      ) : null}
      {cyclicalActivities.map((activity) => {
        return (
          <div key={activity.id} className="my-8">
            <div>
              <b>{activity.name}</b>
            </div>
            <div className="text-red-300">
              {activity.activityTypes.join(' ')}
            </div>
            <div className="text-red-400">
              {activity.activitiesForWhom.join(' ')}
            </div>
            <div className="text-red-700">
              {activity.occurrence.map((occurrence) => (
                <span key={occurrence.id}>{`${occurrence.day} , `}</span>
              ))}
            </div>
            <div className="font-sm-normal">{activity.shortDescription}</div>
          </div>
        );
      })}
    </div>
  );
}
