'use client';

import { useAdjustContainerWIdthsAndMargins } from '@/hooks/useAdjustContainerWIdthsAndMargins';
import { Fragment } from 'react';
import FooterMain from '../../components/footer/FooterMain';

export default function AvailabilityDeclarationsPage() {
  ////vars
  const containerProperClasses = useAdjustContainerWIdthsAndMargins();

  ////tsx
  return (
    <Fragment>
      <section className={containerProperClasses}>
        <div className="max-w-full prose">
          <h1>Deklaracje dostępności</h1>
          <p>Strona w przygotowaniu</p>
        </div>
      </section>
      <FooterMain />
    </Fragment>
  );
}
