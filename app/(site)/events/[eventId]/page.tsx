// import { getSingleCyclicalActivity } from '@/lib/api/cyclicalActivitiesUtils';
// import { CyclicalActivityTemporary } from '@/types';
// import CyclicActivitiesDynamicInside from './components/CyclicActivitiesDynamicInside';

import { Fragment } from 'react';

type Props = {
  params: {
    eventId: string;
  };
};

export default async function EventsDynamicPage(props: Props) {
  ////vars
  const id = props.params.eventId;

  // const cyclicalActivity: CyclicalActivityTemporary | undefined =
  //   await getSingleCyclicalActivity(id);

  return (
    <Fragment>
      <div>Event Dynamic Page</div>
      <div>{id}</div>
    </Fragment>
  );
}
