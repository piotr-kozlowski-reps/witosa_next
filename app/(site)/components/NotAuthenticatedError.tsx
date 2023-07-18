import Link from 'next/link';

export default function NotAuthenticaterError() {
  return (
    <div>
      NotAuthenticaterErrorComponent - with later path showing where error
      occured
      <div>
        <Link href={'/login'}>Login</Link>
      </div>
      <div>
        <Link href={'/'}>Strona główna</Link>
      </div>
    </div>
  );
}
