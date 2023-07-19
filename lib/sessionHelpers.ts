import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export async function checkIfUserIsAnAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === 'ADMIN' ? true : false;
}

export async function checkIfUserIsAnAdminAndIfNot_RedirectToPath(
  path: string
) {
  const isAdmin = await checkIfUserIsAnAdmin();
  if (!isAdmin) {
    redirect(path);
  }
}

export async function checkIfUserIsAnAdminAndIfNot_ThrowAnError(
  errorMessage: string
) {
  const isAdmin = await checkIfUserIsAnAdmin();
  if (!isAdmin) {
    throw new Error(errorMessage);
  }
}
