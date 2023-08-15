'use client';

import { useNavigationState } from '@/context/navigationState';
import { TEventInNewsSection } from '@/types';
import clsx from 'clsx';
import SingleNews from './SingleNews';

interface Props {
  newsData: TEventInNewsSection[];
}

export default function NewsInside(props: Props) {
  ////vars
  const { getCurrentDevice } = useNavigationState();
  const { newsData } = props;

  ////tsx
  return (
    <section
      className={clsx(
        'mt-[192px]',
        getCurrentDevice() === 'MOBILE' ? 'mx-mobile-margin' : '',
        getCurrentDevice() === 'TABLET' ? 'mx-tablet-margin' : '',
        getCurrentDevice() === 'DESKTOP' ? 'desktop-container' : ''
      )}
    >
      <div
        className={clsx(
          'bg-skin-gray w-[753px] h-[1px] mb-24',
          getCurrentDevice() !== 'DESKTOP' ? 'w-full' : ''
        )}
      ></div>
      <div className={clsx('w-full prose')}>
        <h4>Aktualności</h4>
      </div>
      <div
        className={clsx(
          'grid mt-[27px] gap-y-32',
          getCurrentDevice() === 'MOBILE'
            ? 'grid-cols-1 gap-x-mobile-margin'
            : '',
          getCurrentDevice() === 'TABLET'
            ? 'grid-cols-2 gap-x-tablet-margin'
            : '',
          getCurrentDevice() === 'DESKTOP' ? 'grid-cols-3 gap-x-4' : ''
        )}
      >
        {newsData.map((newsEvent, index) => {
          console.log('index passed: ', index);

          return (
            <div key={newsEvent.id} className="w-full">
              <SingleNews
                id={newsEvent.id}
                eventTypes={newsEvent.eventTypes}
                eventStartDate={newsEvent.eventStartDate}
                newsSectionImageUrl={newsEvent.newsSectionImageUrl}
                title={newsEvent.title}
                shortDescription={newsEvent.shortDescription}
                index={index}
                currentDevice={getCurrentDevice()}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
