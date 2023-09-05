'use client';

import { useIsUserAuthenticated } from '@/hooks/useIsUserAuthenticated';
import { Fragment } from 'react';
import NotAuthenticatedError from '../../(site)/components/NotAuthenticatedError';
import DashboardContent from './components/DashboardContent';

export default function Dashboard() {
  ////vars
  const isAuthenticated = useIsUserAuthenticated();

  ////tsx
  return (
    <Fragment>
      {!isAuthenticated ? <NotAuthenticatedError /> : null}
      {isAuthenticated ? <DashboardContent /> : null}
    </Fragment>
  );
}
