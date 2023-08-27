import { getEventsExcludingThoseNotToBeSeenInEventsSectionSorted } from '@/lib/api/eventsUtils';
import { TEventTemporary } from '@/types';
import FooterMain from '../components/footer/FooterMain';
import EventsContent from './components/EventsContent';

export default async function EventsPage() {
  ////vars
  const events: TEventTemporary[] =
    await getEventsExcludingThoseNotToBeSeenInEventsSectionSorted();

  return (
    <section>
      <EventsContent events={events} />
      <FooterMain />
    </section>
  );
}
