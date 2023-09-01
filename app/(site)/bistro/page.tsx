import { Metadata } from 'next';
import { Fragment } from 'react';
import FooterMain from '../components/footer/FooterMain';
import BistroContent from './components/BistroContent';

export const metadata: Metadata = {
  title: 'Art Cafe | Art CK',
};

export default async function BistroPage() {
  // throw new Error('fgbdfgb');
  ////tsx
  return (
    <Fragment>
      <BistroContent />
      <FooterMain />
    </Fragment>
  );
}
