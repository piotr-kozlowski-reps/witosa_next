import FooterMain from '@/app/(site)/components/footer/FooterMain';
import SliderGroups from '@/app/(site)/components/slider_groups/SliderGroups';
import {
  createDateInFormat_DateSeparatorFullDayNameSeparatorTime,
  getPolishPlaceName,
} from '@/lib/textHelpers';
import { TEventTemporary, TSliderGroupImage } from '@/types';
import clsx from 'clsx';
import { Fragment } from 'react';

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
      {!isSliderEmpty ? <SliderGroups sliderImages={sliderImages!} /> : null}

      <div className="proper-container-classes">
        <div className="max-w-full prose">
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

          {/* <div>
            <p>
              Zapraszamy wszystkich chętnych młodych tancerzy do naszych grup
              tanecznych: Marzenie Mini Mini, Marzenie Bis, Marzenie, Hipnoteria
              Bis, Hipnoteria. Przed rozpoczęciem zajęć organizujemy spotkania
              organizacyjne do każdej z grup, podczas których opowiemy jak,
              gdzie i kiedy prowadzimy nasze zajęcia, będziecie również mieli
              okazję poznać instruktorów, prowadzących poszczególne grupy.
            </p>
            <p>
              Poniżej harmonogram spotkań organizacyjnych dla poszczególnych
              grup:
            </p>
            <ul>
              <li>
                <b>04.09.2023 r. , godz. 18:00</b> - Spotkanie organizacyjne dla
                grupy pokazowej Marzenie
              </li>
              <li>
                <b>06.09.2023 r., godz. 17:00</b> - Spotkanie organizacyjne dla
                zespołów Hipnoteria i Hipnoteria Bis
              </li>
              <li>
                <b>08.09.2023 r. godz. 16.00</b> - Spotkanie organizacyjne dla
                dzieci początkujących w wieku 6-7 lat
              </li>
              <li>
                <b>08.09.2023 r., godz. 17.30</b> - Spotkanie organizacyjne dla
                grupy utaneczniającej z roku 2022/2023 oraz zespołu Marzenie
                Mini Mini
              </li>
            </ul>
          </div> */}

          <div className="not-prose">
            <br />
            {/* data */}
            {event.isDateToBeHiddenInNewsSection ? null : (
              <div className="mb-4">
                <span className="font-base-regular">
                  <b>Kiedy:&nbsp;&nbsp;&nbsp;</b>
                  <span className="">
                    {createDateInFormat_DateSeparatorFullDayNameSeparatorTime(
                      event.eventStartDate
                    )}
                  </span>
                </span>
              </div>
            )}

            <div className="-mt-[18px]">
              <span className="font-base-regular">
                <b>Gdzie:&nbsp;&nbsp;&nbsp;</b>
                {/* <span>{getPolishPlaceName(event.place)}</span> */}
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
            <div className="-mt-[2px]">
              <span className="font-base-regular">
                <b>Wstęp:&nbsp;&nbsp;&nbsp;</b>{' '}
                <span>{event.kindOfEnterInfo}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <FooterMain />
    </Fragment>
  );
}
