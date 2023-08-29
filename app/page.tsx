import { Metadata } from 'next';
import MainPage from './(site)/components/MainPage';

export const metadata: Metadata = {
  title: {
    default: 'Art CK',
    template: '%s | Art CK',
  },
  description:
    'Art CK to miejsce, które zostało stworzone z myślą nie tylko o pasjonatach szeroko pojętej kultury i sztuki, ale o wszystkich, którzy marzą o swobodnym spędzaniu czasu w przyjaznej, pełnej ciepła atmosferze.',
};

export default function Home() {
  ////tsx
  return (
    <main>
      <MainPage />
    </main>
  );
}
