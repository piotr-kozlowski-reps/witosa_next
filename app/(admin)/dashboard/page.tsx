'use client';

import NotAuthenticatedError from '@/app/(site)/components/NotAuthenticatedError';
import { useSession } from 'next-auth/react';
import { Fragment } from 'react';
import DashboardContent from './components/DashboardContent';

export default function Dashboard() {
  ////vars
  const session = useSession();
  // const isAdmin = session?.data?.user?.role === 'ADMIN';
  // const session = await getServerSession(authOptions);

  console.log({ session });

  ////tsx
  return (
    <Fragment>
      {session?.status === 'unauthenticated' ? <NotAuthenticatedError /> : null}
      {session && session?.data?.user ? <DashboardContent /> : null}
    </Fragment>
  );
}
