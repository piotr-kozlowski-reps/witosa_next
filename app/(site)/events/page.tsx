import { getEvents_ExcludingThoseNotToBeSeenInEventsSection_NotCurrent_AndThoseNotToBePublished_Sorted } from '@/lib/api/eventsUtils';
import { TEventTemporary } from '@/types';
import { Metadata } from 'next';
import FooterMain from '../components/footer/FooterMain';
import EventsContent from './components/EventsContent';

export const metadata: Metadata = {
  title: 'Wydarzenia | Art CK',
};

export const revalidate = 60 * 60 * 12; //12h

export default async function EventsPage() {
  ////vars
  const events: TEventTemporary[] =
    await getEvents_ExcludingThoseNotToBeSeenInEventsSection_NotCurrent_AndThoseNotToBePublished_Sorted();

  return (
    <section>
      <EventsContent events={events} />
      <FooterMain />
    </section>
  );
}
