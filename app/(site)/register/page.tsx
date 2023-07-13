import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { Fragment } from 'react';
import RegisterForm from './components/RegisterForm';

export default async function Register() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== 'ADMIN') {
    throw new Error('You need to be an admin');
  }

  return (
    <Fragment>
      <h1 className="py-4">Admin only page</h1>
      <RegisterForm />
    </Fragment>
  );
}
