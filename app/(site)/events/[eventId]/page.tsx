// import { getSingleCyclicalActivity } from '@/lib/api/cyclicalActivitiesUtils';
// import { CyclicalActivityTemporary } from '@/types';
// import CyclicActivitiesDynamicInside from './components/CyclicActivitiesDynamicInside';

import { getSingleEvent } from '@/lib/api/eventsUtils';
import { TEventTemporary } from '@/types';
import { Fragment } from 'react';
import EventDynamicInside from './components/EventDynamicInside';

type Props = {
  params: {
    eventId: string;
  };
};

export default async function EventsDynamicPage(props: Props) {
  ////vars
  const id = props.params.eventId;

  const event: TEventTemporary | undefined = await getSingleEvent(id);

  return (
    <Fragment>
      <EventDynamicInside event={event!} />
    </Fragment>
  );
}
