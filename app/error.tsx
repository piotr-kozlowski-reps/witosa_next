'use client';

const Error = ({ error, reset }: { error: Error; reset: () => {} }) => {
  window.location.replace('http://localhost:3000/');

  return <div>loading...</div>;
};

export default Error;
