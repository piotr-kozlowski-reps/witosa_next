'use client';

import { getPolishTypeName } from '@/lib/textHelpers';
import { Slide } from '@prisma/client';
import clsx from 'clsx';
import Image from 'next/image';
import { Fragment } from 'react';
import CustomLink from '../CustomLink';
import SliderDateText from './SliderDateText';

type Props = {
  slide: Slide;
  eventId: string;
};

export default function SliderContent(props: Props) {
  ////vars
  const { slide, eventId } = props;

  ////tsx
  return (
    <Fragment>
      {/* image */}
      <div className="h-[352px] bg-skin-primary rounded-base overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_URL}${slide.slideUrl}`}
          width={1140}
          height={900}
          alt={slide.slideAlt}
          className="object-cover object-center w-full h-full"
        />
      </div>

      {/* description */}
      <div className="mt-8 prose">
        <div className="text-size-normal">
          {slide.eventType.map((type, index) => (
            <div key={index} className="inline font-base-regular">
              <span>{index !== 0 ? '|' : ''}</span>
              <span className={clsx(index !== 0 ? 'mx-2' : 'mr-2')}>
                {getPolishTypeName(type)}
              </span>
            </div>
          ))}
        </div>
        <h1 className="mt-[18px]">{slide.slideTitle}</h1>
        <h2 className="-mt-[15px]">
          <SliderDateText date={slide.eventDate} />
        </h2>
        <div className="mt-[41px]">
          <CustomLink
            visibleText="dowiedz się więcej..."
            url={`events/${eventId}`}
            descriptionText={slide.slideTitle}
          />
        </div>
      </div>
    </Fragment>
  );
}
