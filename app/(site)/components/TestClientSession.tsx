'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function TestClientSession() {
  const session = useSession();

  const signOutHandler = () => {
    // console.log('signOut');
    signOut();
  };

  return (
    <div>
      <h1>TestClientSession</h1>
      <pre>{JSON.stringify(session.data)}</pre>
      <pre>{session?.status || 'no info'}</pre>
      <div className="flex gap-4">
        <button className="p-4 bg-red-400" onClick={signOutHandler}>
          logOut
        </button>
        <Link className="p-4 bg-red-400" href={'/login'}>
          logIn
        </Link>
        <Link className="p-4 bg-red-400" href={'/register'}>
          Rejestracja uzytkownika nowego - ADMIN ONLY
        </Link>
      </div>
    </div>
  );
}
