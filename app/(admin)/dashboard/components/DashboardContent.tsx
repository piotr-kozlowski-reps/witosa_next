'use client';

import { useIsUserAuthenticated } from '@/hooks/useIsUserAuthenticated';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function DashboardContent() {
  ////vars
  const isAuthenticated = useIsUserAuthenticated();
  const session = useSession();

  ////tsx
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Hi, {session?.data?.user?.name}</p>
      <div className="p-4">
        <p className="p-4">nawigacja</p>
        <div className="px-8">
          <Link href={'/register'}>Utwórz uzytkownika</Link>
        </div>
        <div className="px-8">
          <Link href={'/logs'}>Logi</Link>
        </div>
      </div>
      <button onClick={() => signOut()}>SignOut</button>
    </div>
  );
}
