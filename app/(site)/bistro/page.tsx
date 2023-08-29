import { Metadata } from 'next';
import { Fragment } from 'react';
import FooterMain from '../components/footer/FooterMain';
import BistroContent from './components/BistroContent';

export const metadata: Metadata = {
  title: 'Art Cafe | Art CK',
};

export default function BistroPage() {
  ////tsx
  return (
    <Fragment>
      <BistroContent />
      <FooterMain />
    </Fragment>
  );
}
