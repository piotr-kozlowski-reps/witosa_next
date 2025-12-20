import { getCyclicalActivity } from '@/actions/cyclicalActivityActions';
import {
  TCyclicalActivityWithImageAndOccurrence,
  TGetOneCyclicalActivityResponse,
} from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CyclicActivitiesDynamicInside from './components/CyclicActivitiesDynamicInside';

type Props = {
  params: Promise<{
    activityId: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { activityId: id } = await props.params;
  // const id = props.params.activityId;
  const cyclicalActivityResponse: TGetOneCyclicalActivityResponse =
    await getCyclicalActivity(id);
  const cyclicalActivity = await getCyclicalActivityFromResponse(
    cyclicalActivityResponse
  );

  if (!cyclicalActivity) {
    notFound();
  }

  // log

  const metadata: Metadata = cyclicalActivity
    ? { title: `${cyclicalActivity.name} | Zajęcia stałe | Art CK` }
    : {
        title: 'Zajęcia stałe | Art CK',
      };

  return metadata;
}

export default async function CyclicActivitiesDynamicPage(props: Props) {
  ////vars
  const { activityId: id } = await props.params;

  const cyclicalActivityResponse: TGetOneCyclicalActivityResponse =
    await getCyclicalActivity(id);

  const cyclicalActivity = await getCyclicalActivityFromResponse(
    cyclicalActivityResponse
  );

  if (!cyclicalActivity) {
    notFound();
  }

  return <CyclicActivitiesDynamicInside activity={cyclicalActivity} />;
}

async function getCyclicalActivityFromResponse(
  cyclicalActivityResponse: TGetOneCyclicalActivityResponse
) {
  if (
    !cyclicalActivityResponse ||
    cyclicalActivityResponse.status === 'ERROR'
  ) {
    return undefined;
  }

  return cyclicalActivityResponse.response as TCyclicalActivityWithImageAndOccurrence;
}
