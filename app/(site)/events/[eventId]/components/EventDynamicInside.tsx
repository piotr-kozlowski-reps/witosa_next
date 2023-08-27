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
              Akcja Narodowego Czytania została zainicjowana w 2012 roku wspólną
              lekturą Pana Tadeusza Adama Mickiewicza. W 2013 roku w całej
              Polsce odbyło się czytanie dzieł Aleksandra Fredry, a w rok
              później przeczytano Trylogię Henryka Sienkiewicza.
            </p>
            <p>
              Nad Niemnem to najbardziej znana powieść Elizy Orzeszkowej.
              Powstawała w latach 1886-1887, a w formie książka ukazała się w
              1888 roku. Ze względu na barwne opisy, wyrazistych bohaterów i
              odwołania historyczne dzieło porównywano do Mickiewiczowskiego
              &quot;Pana Tadeusza&quot;. Powieścią zainteresowała się również X
              Muza, pierwszą ekranizację książki ukończono w 1939 roku, ale
              obraz zaginął w czasie II wojny światowej. Kolejny film nakręcono
              w połowie lat 80. XX wieku. Nad Niemnem to jeden najważniejszych
              utworów literatury polskiej podejmujący tematykę Powstania
              Styczniowego, którego 160-lecie obchodzone jest właśnie w 2023
              roku.
            </p>
            <p>
              Centrum Kultury w Knurowie połączyło siły z Zespołem Szkół
              Zawodowych nr 2 w Knurowie i wspólnie zapraszają do udziału w tym
              literackim wydarzeniu.
            </p>
            <p>
              W programie poza oczywistym czytaniem fragmentów powieści
              &quot;Nad Niemnem&quot; Elizy Orzeszkowej odbędą się warsztaty
              artystyczne dla dzieci, akcja „Wymień Książkę z Biblioteką”,
              możliwość ostemplowania własnego egzemplarza „Nad Niemnem”
              dedykowaną pieczątką Narodowego Czytania i oczywiście wśród nas
              będzie również Moluś Książkow.
            </p>
            <p>
              Każdy otrzyma tematyczny upominek w postaci pamiątkowej widokówki
              z cytatem.
            </p>
            <p>
              Ponadto uczestnikom spotkania będzie towarzyszył zapach kawy i
              słodkości pochodzący z naszej Art Cafe!
            </p>
            <p>
              <b>Zapraszamy serdecznie!</b>
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
