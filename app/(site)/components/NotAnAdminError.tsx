import Link from 'next/link';

export default function NotAnAdminError() {
  //TODO: add showing what site it was
  //TODO: button to login
  //TODO: button to main

  return (
    <div>
      NotAnAdminErrorComponent - with later path showing where error occured Add
      -
      <div>
        <Link href={'/login'}>Login</Link>
      </div>
      <div>
        <Link href={'/'}>Strona główna</Link>
      </div>
    </div>
  );
}
