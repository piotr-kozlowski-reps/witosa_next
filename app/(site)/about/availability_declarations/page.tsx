import { Metadata } from 'next';
import { Fragment } from 'react';
import FooterMain from '../../components/footer/FooterMain';
import AvailabilityDeclarationsContent from './components/AvailabilityDeclarationsContent';

export const metadata: Metadata = {
  title: 'Deklaracje dostępności | Art CK',
};

export default function AvailabilityDeclarationsPage() {
  ////tsx
  return (
    <Fragment>
      <AvailabilityDeclarationsContent />
      <FooterMain />
    </Fragment>
  );
}
