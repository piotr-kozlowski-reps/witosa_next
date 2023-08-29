'use client';

import { useAdjustContainerWIdthsAndMargins } from '@/hooks/useAdjustContainerWIdthsAndMargins';

export default function AvailabilityDeclarationsContent() {
  ////vars
  const containerProperClasses = useAdjustContainerWIdthsAndMargins();

  ////tsx
  return (
    <section className={containerProperClasses}>
      <div className="max-w-full prose">
        <h1>Deklaracje dostępności</h1>
        <p>Strona w przygotowaniu</p>
      </div>
    </section>
  );
}
