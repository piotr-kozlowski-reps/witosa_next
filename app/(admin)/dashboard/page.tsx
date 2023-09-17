import { getAllNewsletterAddresses } from '@/actions/newsletterActions';
import { TNewsletterDataCombo } from '@/types';
import DashboardContent from './components/DashboardContent';

export default async function Dashboard() {
  ////vars
  const newsletterData = await getAllNewsletterAddresses();

  const newsletterDataCombo: TNewsletterDataCombo = {
    allNewsletterAddresses: newsletterData,
  };

  ////tsx
  return <DashboardContent newsletterDataCombo={newsletterDataCombo} />;
}
