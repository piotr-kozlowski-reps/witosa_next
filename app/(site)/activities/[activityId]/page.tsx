import { getSingleCyclicalActivity } from '@/lib/api/cyclicalActivitiesUtils';
import { CyclicalActivityTemporary } from '@/types';
import { Metadata } from 'next';
import CyclicActivitiesDynamicInside from './components/CyclicActivitiesDynamicInside';

type Props = {
  params: {
    activityId: string;
  };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const id = props.params.activityId;
  const cyclicalActivity: CyclicalActivityTemporary | undefined =
    await getSingleCyclicalActivity(id);

  const metadata: Metadata = cyclicalActivity
    ? { title: `${cyclicalActivity.name} | Zajęcia stałe | Art CK` }
    : {
        title: 'Zajęcia stałe | Art CK',
      };

  return metadata;
}

export default async function CyclicActivitiesDynamicPage(props: Props) {
  ////vars
  const id = props.params.activityId;

  const cyclicalActivity: CyclicalActivityTemporary | undefined =
    await getSingleCyclicalActivity(id);

  return <CyclicActivitiesDynamicInside activity={cyclicalActivity!} />;
}
