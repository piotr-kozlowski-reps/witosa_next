import { Metadata } from 'next';
import { Fragment } from 'react';
import FooterMain from '../../components/footer/FooterMain';
import RegulationsContent from './components/RegulationsContent';

export const metadata: Metadata = {
  title: 'Regulaminy | Art CK',
};

export default function RegulationsPage() {
  ////tsx
  return (
    <Fragment>
      <RegulationsContent />
      <FooterMain />
    </Fragment>
  );
}
