'use client';

import SliderGroups from '@/app/(site)/components/slider_groups/SliderGroups';
import { useAdjustContainerWIdthsAndMargins } from '@/hooks/useAdjustContainerWIdthsAndMargins';
import { TEventTemporary } from '@/types';
import { Image } from '@prisma/client';
import clsx from 'clsx';
import { Fragment } from 'react';

type Props = {
  event: TEventTemporary;
};

export default function EventDynamicInside(props: Props) {
  ////vars
  const containerProperClasses = useAdjustContainerWIdthsAndMargins();
  const { event } = props;
  const sliderImages: Pick<Image, 'url' | 'alt'>[] | undefined =
    event.images || [];

  const isSliderEmpty = sliderImages && sliderImages.length === 0;

  return (
    <Fragment>
      {!isSliderEmpty ? <SliderGroups sliderImages={sliderImages!} /> : null}

      <div className={containerProperClasses}>
        <div className="max-w-full prose">
          <h1 className={clsx(isSliderEmpty ? '-mt-[7px]' : 'mt-[57px]')}>
            {event.title}
          </h1>
          {/* {activity.extendedInfo?.description ? (
            <div
              dangerouslySetInnerHTML={{
                __html: activity.extendedInfo?.description as string,
              }}
            ></div>
          ) : null} */}

          {/* <div>
            <br />
            <p>
              <b>Zajęcia odbywają się w:</b>
              <ul>
                {activity.occurrence.map((item) => {
                  return (
                    <li key={item.id}>
                      <span>{getPolishDayName(item.day)}</span>
                      <span>: </span>
                      <span>
                        {createBetweenHoursText(
                          item.activityStart,
                          item.activityEnd
                        )}
                      </span>
                      <span>&nbsp;&nbsp;&nbsp;</span>
                      <span>-&nbsp;&nbsp;&nbsp;</span>
                      <span>{`${getPolishPlaceName(activity.place)}`}</span>
                    </li>
                  );
                })}
              </ul>
            </p>
          </div> */}
        </div>
      </div>
    </Fragment>
  );
}
