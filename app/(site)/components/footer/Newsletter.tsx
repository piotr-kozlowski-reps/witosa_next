'use client';

import { TCurrentDevice } from '@/types';
import clsx from 'clsx';
import NewsletterForm from './NewsletterForm';

interface Props {
  getCurrentDevice: () => TCurrentDevice;
}

export default function NewsLetter(props: Props) {
  ////vars
  const { getCurrentDevice } = props;

  ////tsx
  return (
    <div
      className={clsx(
        'w-full prose',
        getCurrentDevice() === 'TABLET' ? 'order-1' : '',
        getCurrentDevice() === 'MOBILE' ? '-order-1' : ''
      )}
    >
      <h4>Neswsletter ART CK</h4>
      <div className="mt-[23px]">
        <p className="mt-1">
          Aby otrzymywać aktualną ofertę programową, informacje o promocjach i
          darmowych wejściówkach - zapisz się do newslettera ART CK!
        </p>
      </div>
      <div className="mt-[15px]">
        <NewsletterForm />
      </div>
    </div>
  );
}
