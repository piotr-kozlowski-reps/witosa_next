'use client';

import { signOut, useSession } from 'next-auth/react';

export default function Dashboard() {
  const session = useSession();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Hi, {session?.data?.user?.name}</p>
      <button onClick={() => signOut()}>SignOut</button>
    </div>
  );
}
