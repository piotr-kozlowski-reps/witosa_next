'use client';

import NotAuthenticatedError from '@/app/(site)/components/NotAuthenticatedError';
import { TGetAllUsersResponse, TNewsletterDataCombo } from '@/types';
import { useSession } from 'next-auth/react';
import { Fragment } from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardInsidePages from './DashboardInsidePages';
import DashboardNavigation from './DashboardNavigation';

type Props = {
  newsletterDataCombo: TNewsletterDataCombo;
  usersData: TGetAllUsersResponse;
};

export default function DashboardContent(props: Props) {
  ////vars
  const session = useSession();
  const isAdmin = session?.data?.user?.userRole === 'ADMIN';
  const { newsletterDataCombo, usersData } = props;

  ////tsx
  return (
    <Fragment>
      {session?.status === 'unauthenticated' ? <NotAuthenticatedError /> : null}
      {session && session?.data?.user ? (
        <div className="proper-container-classes">
          <DashboardHeader userName={session?.data?.user?.name} />

          <div className="mt-[37px] relative">
            <DashboardNavigation isAdmin={isAdmin} />
            <DashboardInsidePages
              newsletterDataCombo={newsletterDataCombo}
              usersData={usersData}
            />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
}
