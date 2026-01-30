import FooterMain from '@/app/(site)/components/footer/FooterMain';
import SliderGroups from '@/app/(site)/components/slider_groups/SliderGroups';
import { getPolishPlaceName } from '@/lib/textHelpers';
import { TEventTemporary, TSliderGroupImage } from '@/types';
import clsx from 'clsx';
import { Fragment } from 'react';
import DateAsClientComponentToPreserveConsistency from './DateAsClientComponentToPreserveConsistency';
import CustomLink from '@/app/(site)/components/CustomLink';
import SliderGroupsInfo from '@/app/(site)/components/slider_groups/SliderGroupsInfo';

type Props = {
  event: TEventTemporary;
};

export default function EventDynamicInside(props: Props) {
  ////vars
  const { event } = props;
  const sliderImages: TSliderGroupImage[] = event.images || [];

  const isSliderEmpty = sliderImages && sliderImages.length === 0;

  return (
    <Fragment>
      {/* {!isSliderEmpty ? <SliderGroups sliderImages={sliderImages!} /> : null} */}

      <div className="proper-container-classes bg-skin-main-bg drop-shadow-none slider-break-point:drop-shadow-big rounded-base">
        <div className="flex flex-col items-start justify-start gap-6 slider-break-point:flex-row">
          <div className="slider-break-point:h-[638px] slider-break-point:w-[453px] w-full">
            {!isSliderEmpty ? (
              <SliderGroupsInfo sliderImages={sliderImages!} />
            ) : null}
          </div>

          <div className="flex-1 prose">
            <h1 className={clsx(isSliderEmpty ? '-mt-[7px]' : 'mt-[57px]')}>
              {event.title}
            </h1>
            {event.detailedDescription ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: event.detailedDescription as string,
                }}
              ></div>
            ) : null}

            <div className="not-prose">
              <br />
              {/* data */}
              <DateAsClientComponentToPreserveConsistency
                isDateToBeHiddenInNewsSection={
                  event.isDateToBeHiddenInNewsSection
                }
                eventStartDate={event.eventStartDate}
              />

              <div className="-mt-[18px]">
                <span className="font-base-regular">
                  <b>Gdzie:&nbsp;&nbsp;&nbsp;</b>

                  <span>
                    {event.places.map((place, index) => (
                      <span key={index}>
                        {index !== event.places.length - 1 ? (
                          <span>{`${getPolishPlaceName(place)}, `}</span>
                        ) : (
                          <span>{getPolishPlaceName(place)}</span>
                        )}
                      </span>
                    ))}
                  </span>
                  <span></span>
                </span>
              </div>
              <div className="-mt-[3px]">
                <span className="font-base-regular">
                  <b>Wstęp:&nbsp;&nbsp;&nbsp;</b>
                </span>
                <span className="font-base-regular">
                  {event.kindOfEnterInfo}
                </span>
              </div>
              <div className="mt-[19px]">
                {event.isPayed && event.ticketBuyingId ? (
                  <a
                    aria-label="kup bilet online"
                    href={`${process.env.NEXT_PUBLIC_VISUAL_TICKET_URL}${event.ticketBuyingId}`}
                    // target="_blank"
                    // rel="noopener noreferrer"
                    title="Otwiera się w nowej zakładce."
                    className={clsx('standard-button py-[19px] px-[3rem]')}
                  >
                    <span className="sr-only">kup bilet online</span>
                    kup bilet online
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterMain />
    </Fragment>
  );
}
