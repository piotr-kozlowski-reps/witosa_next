'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { notLoggedIn } from '@/lib/api/apiTextResponses';
import logger from '@/lib/logger';
import { getServerSession } from 'next-auth';

export async function checkIfLoggedIn() {
  const session = await getServerSession(authOptions);
  if (!session) {
    logger.warn(notLoggedIn);
    throw new Error('not logged in');
  }
  return session;
}
