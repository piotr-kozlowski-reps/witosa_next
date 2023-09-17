'use client';

import NotAuthenticatedError from '@/app/(site)/components/NotAuthenticatedError';
import { TNewsletterDataCombo } from '@/types';
import { useSession } from 'next-auth/react';
import { Fragment } from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardInsidePages from './DashboardInsidePages';
import DashboardNavigation from './DashboardNavigation';

type Props = {
  newsletterDataCombo: TNewsletterDataCombo;
};

export default function DashboardContent(props: Props) {
  ////vars
  const session = useSession();
  const isAdmin = session?.data?.user?.role === 'ADMIN';
  const { newsletterDataCombo } = props;

  ////tsx
  return (
    <Fragment>
      {session?.status === 'unauthenticated' ? <NotAuthenticatedError /> : null}
      {session && session?.data?.user ? (
        <div className="proper-container-classes">
          <DashboardHeader userName={session?.data?.user?.name} />

          <div className="mt-[37px] relative">
            <DashboardNavigation isAdmin={isAdmin} />
            <DashboardInsidePages newsletterDataCombo={newsletterDataCombo} />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
}
