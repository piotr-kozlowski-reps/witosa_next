import { getAllCyclicalActivities } from '@/actions/cyclicalActivityActions';
import { TGetAllCyclicalActivitiesResponse } from '@/types';
import { Metadata } from 'next';
import FooterMain from '../components/footer/FooterMain';
import CyclicalActivitiesContent from './components/CyclicalActivitiesContent';

export const metadata: Metadata = {
  title: 'Zajęcia stałe | Art CK',
};

export const revalidate = 60 * 60 * 12; //12h

export default async function ActivitiesPage() {
  ////vars
  const cyclicalActivitiesResponse: TGetAllCyclicalActivitiesResponse =
    await getAllCyclicalActivities();

  ////tsx
  return (
    <section>
      <CyclicalActivitiesContent
        cyclicalActivitiesResponse={cyclicalActivitiesResponse}
      />
      <FooterMain />
    </section>
  );
}
