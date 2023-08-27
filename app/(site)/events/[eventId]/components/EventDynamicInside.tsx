'use client';

import FooterMain from '@/app/(site)/components/footer/FooterMain';
import SliderGroups from '@/app/(site)/components/slider_groups/SliderGroups';
import SliderDateText from '@/app/(site)/components/slider_main/SliderDateText';
import { useAdjustContainerWIdthsAndMargins } from '@/hooks/useAdjustContainerWIdthsAndMargins';
import { getPolishPlaceName } from '@/lib/textHelpers';
import { TEventTemporary, TSliderGroupImage } from '@/types';
import clsx from 'clsx';
import { Fragment } from 'react';

type Props = {
  event: TEventTemporary;
};

export default function EventDynamicInside(props: Props) {
  ////vars
  const containerProperClasses = useAdjustContainerWIdthsAndMargins();
  const { event } = props;
  const sliderImages: TSliderGroupImage[] = event.images || [];

  const isSliderEmpty = sliderImages && sliderImages.length === 0;

  return (
    <Fragment>
      {!isSliderEmpty ? <SliderGroups sliderImages={sliderImages!} /> : null}

      <div className={containerProperClasses}>
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
              Zapraszamy naszych <b>MŁODYCH GOŚCI</b> na uroczyste otwarcie
              <b> Art CK!</b>
            </p>
            <p>
              Spotykamy się o <b>15.30</b> przy
              <b> Miejskiej Szkole Podstawowej nr 9</b> w Knurowie i cudownym
              korowodem prowadzonym przez fantastycznych artystów z
              <b> Teatru LUFCIK NA KORBKĘ</b> dotrzemy do nas, gdzie na
              powitanie będzie czekała na Was pierwsza niespodzianka!
            </p>
            <p>
              W dalszej kolejności na naszej scenie pojawi się artysta, który
              zaczaruje nas pokazem magicznych świateł <b>LED SHOW</b>.
            </p>
            <p>
              Po pokazie świateł będziecie mogli wziąć udział w grach
              prowadzonych przez Teatr LUFCIK NA KORBKĘ, zabawach tanecznych,
              które nasze cudowne instruktorki tańca przygotują je specjalnie
              dla Was w sali tanecznej oraz zabawach plastycznych,
              przygotowanych przez nasze instruktorki działań twórczych w
              pracowni plastycznej.
            </p>
            <p>
              Około godziny <b>19.00</b> zapraszamy na <b>dobranockę filmową</b>
              , którą się tego dnia pożegnamy i będziemy czekać na Was z
              niecierpliwością w kolejne dni na spotkaniach organizacyjnych do
              zajęć tanecznych i na realizowanych już od 4 września zajęć
              plastycznych!
            </p>
          </div> */}

          <div className="not-prose">
            <br />
            {/* data */}
            <div>
              <span className="font-base-regular">
                <b>Kiedy:&nbsp;&nbsp;&nbsp;</b>
                <span className="!pb-[-10px]">
                  <SliderDateText
                    date={event.eventStartDate}
                    forceToBeInOneLine={true}
                  />
                </span>
              </span>
            </div>
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
