'use client';

import { useNavigationState } from '@/context/navigationState';
import { useAdjustContainerWIdthsAndMargins } from '@/hooks/useAdjustContainerWIdthsAndMargins';
import { getPolishTypeName } from '@/lib/textHelpers';
import { Slide } from '@prisma/client';
import clsx from 'clsx';
import { Fragment } from 'react';
import CustomLink from '../CustomLink';

type Props = {
  sliderData: Slide;
};

export default function SliderView(props: Props) {
  ////vars
  const { sliderData } = props;
  const { getCurrentDevice } = useNavigationState();
  const containerProperClasses = useAdjustContainerWIdthsAndMargins();

  ////utils
  function createDateText(dataObject: Date) {
    const month = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ];

    const day = [
      'niedziela',
      'poniedziałek',
      'wtorek',
      'środa',
      'czwartek',
      'piątek',
      'sobota',
    ];
    return (
      <Fragment>
        <span>{`${dataObject.getDate()}.${month[dataObject.getMonth()]}`}</span>
        <span className="text-skin-gray">{`.${dataObject.getFullYear()}`}</span>
        <span className="px-4 pb-4 text-skin-gray">|</span>
        <span className="text-skin-gray">{`${day[dataObject.getDay()]}`}</span>
        {getCurrentDevice() !== 'MOBILE' ? (
          <Fragment>
            <span className="px-4 pb-4 text-skin-gray">|</span>
            <span>{`g. ${dataObject.getHours()}:${dataObject.getMinutes()}`}</span>
          </Fragment>
        ) : (
          <Fragment>
            <div>
              <span>{`g. ${dataObject.getHours()}:${dataObject.getMinutes()}`}</span>
            </div>
            {/* <span className="px-4 pb-4 text-skin-gray">|</span> */}
          </Fragment>
        )}
      </Fragment>
    );
  }

  ////tsx
  return (
    <section className={containerProperClasses}>
      {/* image */}
      <div className="h-[352px] bg-skin-primary rounded-base"></div>
      {/* description */}
      <div className="mt-8 prose">
        <div className="text-size-normal">
          {sliderData.eventType.map((type, index) => (
            <div key={index} className="inline font-base-regular">
              <span>{index !== 0 ? '|' : ''}</span>
              <span className={clsx(index !== 0 ? 'mx-2' : 'mr-2')}>
                {getPolishTypeName(type)}
              </span>
            </div>
          ))}
        </div>
        <h1 className="mt-[18px]">{sliderData.slideTitle}</h1>
        <h2 className="-mt-[15px]">{createDateText(sliderData.eventDate)}</h2>
        <div className="mt-[41px]">
          <CustomLink
            visibleText="dowiedz się więcej ..."
            url={sliderData.eventUrl}
            descriptionText={sliderData.slideTitle}
          />
        </div>

        <p></p>
      </div>
    </section>
  );
}
