import { CyclicalActivityTemporary } from '@/types';

type Props = {
  activity: CyclicalActivityTemporary;
};

export default function CyclicalActivityItem(props: Props) {
  ////vars
  const { activity } = props;
  ////tsx
  return (
    <div className="my-8">
      <div>
        <b>{activity.name}</b>
      </div>
      <div className="text-red-300">{activity.activityTypes.join(' ')}</div>
      <div className="text-red-400">{activity.activitiesForWhom.join(' ')}</div>
      <div className="text-red-700">
        {activity.occurrence.map((occurrence) => (
          <span key={occurrence.id}>{`${occurrence.day} , `}</span>
        ))}
      </div>
      <div className="font-sm-normal">{activity.shortDescription}</div>
    </div>
  );
}
