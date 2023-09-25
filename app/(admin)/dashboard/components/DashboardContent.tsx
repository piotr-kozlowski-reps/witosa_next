'use client';

import NotAuthenticatedError from '@/app/(site)/components/NotAuthenticatedError';
import {
  TGetAllCyclicalActivitiesResponse,
  TGetAllUsersResponse,
  TNewsletterDataCombo,
} from '@/types';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useSession } from 'next-auth/react';
import { Fragment } from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardInsidePages from './DashboardInsidePages';
import DashboardNavigation from './DashboardNavigation';

type Props = {
  newsletterDataCombo: TNewsletterDataCombo;
  usersData: TGetAllUsersResponse;
  cyclicalActivitiesData: TGetAllCyclicalActivitiesResponse;
};

export default function DashboardContent(props: Props) {
  ////vars
  const session = useSession();
  const isAdmin = session?.data?.user?.userRole === 'ADMIN';
  const { newsletterDataCombo, usersData, cyclicalActivitiesData } = props;

  ////tsx
  return (
    <Fragment>
      {session?.status === 'unauthenticated' ? <NotAuthenticatedError /> : null}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {session && session?.data?.user ? (
          <div className="proper-container-classes">
            <DashboardHeader userName={session?.data?.user?.name} />

            <div className="mt-[37px] relative">
              <DashboardNavigation isAdmin={isAdmin} />
              <DashboardInsidePages
                newsletterDataCombo={newsletterDataCombo}
                usersData={usersData}
                cyclicalActivitiesData={cyclicalActivitiesData}
              />
            </div>
          </div>
        ) : null}
      </LocalizationProvider>
    </Fragment>
  );
}
