import { Metadata } from 'next';
import { Fragment } from 'react';
import FooterMain from '../../components/footer/FooterMain';
import AboutContent from './components/AboutContent';

export const metadata: Metadata = {
  title: 'Art CK to ... | Art CK',
};

export default function AboutPage() {
  ////tsx
  return (
    <Fragment>
      <AboutContent />
      <FooterMain />
    </Fragment>
  );
}
