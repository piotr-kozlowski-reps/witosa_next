import { getAllCyclicalActivities } from '@/actions/cyclicalActivityActions';
import { getAllNewsletterAddresses } from '@/actions/newsletterActions';
import { getAllUsers } from '@/actions/userActions';
import { TNewsletterDataCombo } from '@/types';
import DashboardContent from './components/DashboardContent';

export default async function Dashboard() {
  ////vars
  const newsletterData = await getAllNewsletterAddresses();
  const usersData = await getAllUsers();
  const cyclicalActivitiesData = await getAllCyclicalActivities();

  const newsletterDataCombo: TNewsletterDataCombo = {
    allNewsletterAddresses: newsletterData,
  };

  ////tsx
  return (
    <DashboardContent
      newsletterDataCombo={newsletterDataCombo}
      usersData={usersData}
      cyclicalActivitiesData={cyclicalActivitiesData}
    />
  );
}
