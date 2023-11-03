import { getEvent } from '@/actions/eventsActions';
import logger from '@/lib/logger';
import {
  TEventTemporary,
  TEventWithImages,
  TGetOneEventResponse,
} from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';
import EventDynamicInside from './components/EventDynamicInside';

type Props = {
  params: {
    eventId: string;
  };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const id = props.params.eventId;
  const eventResponse: TGetOneEventResponse = await getEvent(id);
  const event: TEventTemporary | undefined = await getEventFromResponse(
    eventResponse
  );

  if (!event) {
    notFound();
  }

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

  const eventResponse: TGetOneEventResponse = await getEvent(id);
  const event: TEventTemporary | undefined = await getEventFromResponse(
    eventResponse
  );

  if (!event) {
    notFound();
  }

  return (
    <Fragment>
      <EventDynamicInside event={event!} />
    </Fragment>
  );
}

async function getEventFromResponse(eventResponse: TGetOneEventResponse) {
  if (!eventResponse || eventResponse.status === 'ERROR') {
    logger.warn("Could't fetch event.");
    return undefined;
  }

  return eventResponse.response as TEventWithImages;
}
