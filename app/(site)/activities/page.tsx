import { getCyclicalActivities } from '@/lib/api/cyclicalActivitiesUtils';
import { CyclicalActivityTemporary } from '@/types';
import FooterMain from '../components/footer/FooterMain';
import CyclicalActivitiesContent from './components/CyclicalActivitiesContent';

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
