import MainSlider from './(site)/components/MainSlider';
import Test from './(site)/components/Test';
import TestClientSession from './(site)/components/TestClientSession';
import TestServerSession from './(site)/components/TestServerSession';

export default function Home() {
  return (
    <main>
      <MainSlider />
      <div className="bg-red-200">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Test />
        <TestServerSession />
        <TestClientSession />
      </div>
    </main>
  );
}
