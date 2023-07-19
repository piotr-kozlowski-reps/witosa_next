import { checkIfUserIsAnAdmin } from '@/lib/sessionHelpers';
import { Fragment } from 'react';
import NotAnAdminError from '../components/NotAnAdminError';
import LogsList from './components/LogsList';

export default async function Logs() {
  const isAdmin = await checkIfUserIsAnAdmin();

  return (
    <Fragment>
      {!isAdmin ? <NotAnAdminError /> : null}
      {isAdmin ? <LogsList /> : null}
    </Fragment>
  );
}
