'use client';

import { useNavigationState } from '@/context/navigationState';
import clsx from 'clsx';

export default function HipnoteriaContent() {
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
        <h1 className="mt-[57px]">Hipnoteria</h1>
        <p className="w-full ">
          To szereg stylów tańca ulicznego ewolujący jako część kultury
          hip-hopowej. Zaliczany jest do Street Dance, co czyni go wyjątkowo
          różnorodnym. <br />
          Każdy miłośnik tańca znajdzie w nim coś dla siebie np. oldschool,
          newstyle, freestyle… <br />
          Styl ten to ekspresja odpowiadająca konkretnym emocjom. Hip - hop był
          pierwszym tańcem ulicznym i asymiluje wszystkie pozostałe style
          uliczne :)
        </p>
        <p>
          <i>„Taniec jest ukrytym językiem duszy”</i>
          &nbsp;&nbsp;&nbsp;&nbsp;Martha Graham
        </p>
      </div>
    </div>
  );
}
