'use client';
import { useSession } from 'next-auth/react';

export default function TestClientSession() {
  const session = useSession();
  return (
    <div>
      <h1>TestClientSession</h1>
      <pre>{JSON.stringify(session.data)}</pre>
      <pre>{session?.status || 'no info'}</pre>
    </div>
  );
}
