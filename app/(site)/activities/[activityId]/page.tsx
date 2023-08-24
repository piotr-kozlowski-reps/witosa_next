import { getSingleCyclicalActivity } from '@/lib/api/cyclicalActivitiesUtils';
import { CyclicalActivityTemporary } from '@/types';
import CyclicActivitiesDynamicInside from './components/CyclicActivitiesDynamicInside';

type Props = {
  params: {
    activityId: string;
  };
};

export default async function CyclicActivitiesDynamicPage(props: Props) {
  ////vars
  const id = props.params.activityId;

  const cyclicalActivity: CyclicalActivityTemporary | undefined =
    await getSingleCyclicalActivity(id);

  return <CyclicActivitiesDynamicInside activity={cyclicalActivity!} />;
}
