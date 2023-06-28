import Test from './(site)/components/Test';
import TestClientSession from './(site)/components/TestClientSession';
import TestServerSession from './(site)/components/TestServerSession';

export default function Home() {
  return (
    <main className="bg-skin-fill text-skin-base">
      <h1 className="text-base text-skin-base">hello!!!</h1>
      <Test />
      <TestServerSession />
      <TestClientSession />
    </main>
  );
}
