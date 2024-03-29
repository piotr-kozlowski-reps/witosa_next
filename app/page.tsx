import { getNewsDataSorted } from '@/lib/api/newsUtils';
import { getEventsMappedToMainSliderData_FilteredToBeSeenInNews } from '@/lib/api/sliderUtils';
import { TEventInNewsSection, TSlide } from '@/types';
import { Metadata } from 'next';
import MainPage from './(site)/components/MainPage';

export const metadata: Metadata = {
  title: {
    default: 'Art CK',
    template: '%s | Art CK',
  },
  description:
    'Art CK to miejsce, które zostało stworzone z myślą nie tylko o pasjonatach szeroko pojętej kultury i sztuki, ale o wszystkich, którzy marzą o swobodnym spędzaniu czasu w przyjaznej, pełnej ciepła atmosferze.',
};

export const revalidate = 60 * 60 * 12; //12h

export default async function Home() {
  ////vars
  const sliderData: TSlide[] =
    await getEventsMappedToMainSliderData_FilteredToBeSeenInNews();
  const newsData: TEventInNewsSection[] = await getNewsDataSorted();

  ////tsx
  return (
    <main>
      <MainPage sliderData={sliderData} newsData={newsData} />
    </main>
  );
}
