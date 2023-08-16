'use client';

import { useNavigationState } from '@/context/navigationState';
import clsx from 'clsx';

export default function MarzenieMiniMiniContent() {
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
        <h1 className="mt-[57px]">Marzenie mini mini</h1>
        <p className="w-full ">
          Celem zajęć jest kształtowanie prawidłowej postawy i nauka koordynacji
          ruchowej w różnych kierunkach w rytm muzyki. Pracujemy nad poprawą
          mięśni. Ćwicząc i bawiąc się z dziećmi wspomagamy ich rozwój
          psychoruchowy. Kształtujemy poczucie równowagi, stabilizując ciało.
          Dzięki naszym zajęciom najmłodsze dzieci podnoszą wszechstronną
          sprawność fizyczną, rozwijają wszystkie cechy motoryki (siła,
          szybkość, zręczność, wytrzymałość ) oraz umiejętności taneczne ,
          mające zastosowanie w naszych artystycznych zespołach 😊
        </p>
      </div>
    </div>
  );
}
