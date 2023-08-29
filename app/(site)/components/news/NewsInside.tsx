import { useNavigationState } from '@/context/navigationState';
import { TEventInNewsSection } from '@/types';
import clsx from 'clsx';
import HorizontalSeparatorLine from '../HorizontalSeparatorLine';
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
    <section className="mt-[192px] proper-container-classes">
      <HorizontalSeparatorLine
        additionalClasses={getCurrentDevice() !== 'DESKTOP' ? 'w-full' : ''}
      />

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
          // console.log({ newsEvent });

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
                isDateToBeHiddenInNewsSection={
                  newsEvent.isDateToBeHiddenInNewsSection
                }
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
