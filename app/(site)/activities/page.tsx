import { getCyclicalActivities } from '@/lib/api/cyclicalActivitiesUtils';
import { CyclicalActivityTemporary } from '@/types';
import { Metadata } from 'next';
import FooterMain from '../components/footer/FooterMain';
import CyclicalActivitiesContent from './components/CyclicalActivitiesContent';

export const metadata: Metadata = {
  title: 'Zajęcia stałe | Art CK',
};

export default async function ActivitiesPage() {
  ////vars
  const cyclicalActivities: CyclicalActivityTemporary[] =
    await getCyclicalActivities();

  ////tsx
  return (
    <section>
      <CyclicalActivitiesContent cyclicalActivities={cyclicalActivities} />
      <FooterMain />
    </section>
  );
}
