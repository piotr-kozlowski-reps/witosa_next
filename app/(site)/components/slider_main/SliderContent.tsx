'use client';

import { getPolishTypeName } from '@/lib/textHelpers';
import { Slide } from '@prisma/client';
import clsx from 'clsx';
import Image from 'next/image';
import { Fragment } from 'react';
import CustomLink from '../CustomLink';
import TextButton from '../TextButton';
import PrevIcon from '../icons/PrevIcon';
import SliderDateText from './SliderDateText';

type Props = {
  slide: Slide;
  eventId: string;
  direction: number;
  prevButtonHandler: () => void;
  nextButtonHandler: () => void;
};

export default function SliderContent(props: Props) {
  ////vars
  const { slide, eventId, prevButtonHandler, nextButtonHandler, direction } =
    props;

  const slideSlidingVariants = {
    initial: (direction: number) => {
      return {
        x: direction > 0 ? 200 : -200,
        opacity: 0,
      };
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0.3,
      },
    },
    exit: (direction: number) => {
      return {
        x: direction > 0 ? -200 : 200,
        opacity: 0,
      };
    },
  };
  ////tsx
  return (
    <Fragment>
      <div className="relative">
        {/* image */}
        <div className="h-[352px] bg-skin-primary rounded-base overflow-hidden relative">
          <div className="object-cover object-center w-full h-full">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${slide.slideUrl}`}
              width={1140}
              height={900}
              alt={slide.slideAlt}
              className="object-cover object-center w-full h-full"
            />
          </div>

          <div className="absolute left-0 z-10 bottom-2 bg-skin-main-bg rounded-r-base">
            <div className="h-[44px]">
              <PrevIcon
                alt="Zamknij mobilne menu."
                actionFn={prevButtonHandler}
                isToBeRotatedToBeVertical={false}
              />
            </div>
          </div>
          <div className="absolute right-0 z-10 bottom-2 bg-skin-main-bg rounded-l-base">
            <div className="h-[44px]">
              <PrevIcon
                alt="Zamknij mobilne menu."
                actionFn={nextButtonHandler}
                isToBeRotatedToBeVertical={false}
                isToBeFlippedToBeNextButton={true}
              />
            </div>
          </div>
        </div>

        {/* pause slider */}
        <div className="absolute right-0 z-20 top-[350px]">
          <TextButton buttonName="zatrzymaj pokaz slajdów" />
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
      </div>
    </Fragment>
  );
}
