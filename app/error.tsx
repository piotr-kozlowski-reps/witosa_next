'use client';

import Link from 'next/link';
import { Fragment } from 'react';

const Error = ({ error, reset }: { error: Error; reset: () => {} }) => {
  // window.location.replace(`${process.env.NEXT_PUBLIC_BASE_URL}`);

  // return <div>loading...</div>;

  return (
    <Fragment>
      <div>
        <p>W aplikacji pojawił sie problem</p>
      </div>
      <div>
        <h1>{error.message || 'Coś poszło nie tak'}</h1>
      </div>
      <div>
        <button onClick={reset}>Spróbuj ponownie</button>
      </div>
      <div>
        <Link href="/">powrót do początku</Link>
      </div>
    </Fragment>
  );
};

export default Error;
