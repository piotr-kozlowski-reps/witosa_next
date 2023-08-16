'use client';

import { useNavigationState } from '@/context/navigationState';
import clsx from 'clsx';

export default function MarzenieContent() {
  ////vars
  const { getCurrentDevice } = useNavigationState();

  ////tsx
  return (
    <div
      className={clsx(
        getCurrentDevice() === 'MOBILE' ? 'mx-mobile-margin' : '',
        getCurrentDevice() === 'TABLET' ? 'mx-tablet-margin' : '',
        getCurrentDevice() === 'DESKTOP' ? 'desktop-container ' : ''
      )}
    >
      <div className="max-w-full prose">
        <h1 className="mt-[57px]">Marzenie</h1>
        <p className="w-full ">
          To stylizowany taniec, zaadaptowany do potrzeb scenicznych. To
          stylizacja taneczna charakterystycznych cech np. taniec marynarski,
          cygański, chiński czy arabski… Tworzymy miniatury, w których muzyka,
          choreografia i kostium tworzą spójność. Opowiadamy poprzez taniec
          historię, zdarza się, że przechodzimy w Teatr Tańca ! Dzięki temu
          stylowi każdego sezonu tańczymy coś nowego, rozwijamy swoją
          wyobraźnię, wyrażamy myśli i uczucia. Uczymy się wiele technik co
          pozwala nam poczuć satysfakcję i radość z ruchu.
        </p>
      </div>
    </div>
  );
}
