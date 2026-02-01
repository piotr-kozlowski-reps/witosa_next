import { getAllCyclicalActivities } from '@/actions/cyclicalActivityActions';
import { getAllNewsletterAddresses } from '@/actions/newsletterActions';
import { getAllUsers } from '@/actions/userActions';
import { TNewsletterDataCombo } from '@/types';

import { getAllEvents } from '@/actions/eventsActions';
import { Fragment } from 'react';
import DashboardContent from './components/DashboardContent';
import { getAllArtisticGroups } from '@/actions/artisticGroupsActions';

export default async function Dashboard() {
  ////vars
  const newsletterData = await getAllNewsletterAddresses();
  const usersData = await getAllUsers();
  const cyclicalActivitiesData = await getAllCyclicalActivities();
  const eventsData = await getAllEvents();
  const artisticGroupsData = await getAllArtisticGroups();

  const newsletterDataCombo: TNewsletterDataCombo = {
    allNewsletterAddresses: newsletterData,
  };

  ////tsx
  return (
    <Fragment>
      <div className="flex-col items-start justify-start">
        <DashboardContent
          newsletterDataCombo={newsletterDataCombo}
          usersData={usersData}
          cyclicalActivitiesData={cyclicalActivitiesData}
          eventsData={eventsData}
          artisticGroupsData={artisticGroupsData}
        />
      </div>
    </Fragment>
  );
}
