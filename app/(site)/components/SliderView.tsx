'use client';

import { useNavigationState } from '@/context/navigationState';
import { getPolishTypeName } from '@/lib/textHelpers';
import { Slide } from '@prisma/client';
import clsx from 'clsx';

type Props = {
  slidersData: Slide[];
};

export default function SliderView(props: Props) {
  ////vars
  const { slidersData } = props;
  // const mobileMargin = global_MobileMargin;
  // const tabletMargin = global_TabletMargin;
  const { getCurrentDevice } = useNavigationState();

  ////tsx
  return (
    <section
      className={clsx(
        getCurrentDevice() === 'MOBILE' ? 'mx-mobile-margin' : '',
        getCurrentDevice() === 'TABLET' ? 'mx-tablet-margin' : '',
        getCurrentDevice() === 'DESKTOP' ? 'desktop-container' : ''
      )}
    >
      {/* image */}
      <div className="h-[352px] bg-skin-primary rounded-base"></div>
      {/* description */}
      <div className="mt-8">
        <div className="text-base-13">
          {slidersData[0].eventType.map((type, index) => (
            <div key={index} className="inline font-base-regular">
              <span>{index !== 0 ? '|' : ''}</span>
              <span className={clsx(index !== 0 ? 'mx-2' : 'mr-2')}>
                {getPolishTypeName(type)}
              </span>
            </div>
          ))}
        </div>
        <h1 className="mt-4">{slidersData[0].slideTitle}</h1>
        <div>{slidersData[0].eventDate.toISOString()}</div>
        <button>dowiedz się więcej</button>
        <p></p>
      </div>
    </section>
  );
}
