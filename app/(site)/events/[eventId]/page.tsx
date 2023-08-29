import { getSingleEvent } from '@/lib/api/eventsUtils';
import { TEventTemporary } from '@/types';
import { Metadata } from 'next';
import { Fragment } from 'react';
import EventDynamicInside from './components/EventDynamicInside';

type Props = {
  params: {
    eventId: string;
  };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const id = props.params.eventId;
  const event: TEventTemporary | undefined = await getSingleEvent(id);

  const metadata: Metadata = event
    ? { title: `${event.title} | Wydarzenia | Art CK` }
    : {
        title: 'Wydarzenia | Art CK',
      };

  return metadata;
}

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
