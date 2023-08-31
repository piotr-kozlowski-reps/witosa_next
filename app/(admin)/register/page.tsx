import { checkIfUserIsAnAdminAndIfNot_RedirectToPath } from '@/lib/sessionHelpers';
import { Fragment } from 'react';
import RegisterForm from './components/RegisterForm';

export default async function Register() {
  await checkIfUserIsAnAdminAndIfNot_RedirectToPath('/login');

  return (
    <Fragment>
      <h1 className="py-4">Admin only page</h1>
      <RegisterForm />
    </Fragment>
  );
}
