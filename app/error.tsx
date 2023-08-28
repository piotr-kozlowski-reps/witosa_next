'use client';

const Error = ({ error, reset }: { error: Error; reset: () => {} }) => {
  window.location.replace(`${process.env.NEXT_PUBLIC_BASE_URL}`);

  return <div>loading...</div>;
};

export default Error;
