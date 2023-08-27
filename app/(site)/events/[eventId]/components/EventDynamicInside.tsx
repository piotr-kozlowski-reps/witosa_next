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
              <b>Marcin Wyrostek</b> - wirtuoz akordeonu, kompozytor i aranżer,
              absolwent i obecnie wykładowca Akademii Muzycznej w Katowicach na
              Wydziale Instrumentalnym oraz Wydziale Jazzu i Muzyki Rozrywkowej.{' '}
            </p>
            <p>
              Zwycięzca polskiej edycji programu Mam Talent TVN. Zdobywca 7
              Platynowych Płyt, nagroda Prezydenta RP 2010, Nagroda Ministra
              Kultury 2004, Bestseller Empiku 2012, Statuetka Top Trendy 2011,
              Promotor Polski 2017 - to tylko nieliczne sukcesy i tytuły jakie
              Marcin Wyrostek zdobył na polskiej scenie muzycznej. Ponadto jest
              laureatem i zwycięzcą wielu Międzynarodowych Konkursów
              Akordeonowych: AAA Festival Detroit (USA), Coupe Mondiale
              (Słowacja, Węgry), Reinach AG (Szwajcaria), Rzym (Włochy).
            </p>
            <p>
              Podczas Festiwalu Otwarcia Art. CK, artysta wystąpi z recitalem
              solowym opartym na muzyce baroku, romantyzmu (transkrypcje utworów
              organowych, orkiestrowych, fortepianowych), muzyce współczesnej
              oraz własnych kompozycjach, w których wyraźnie słychać inspiracje
              muzyką ilustracyjną, popularną, filmową, argentyńską, hiszpańską,
              bałkańską, francuską, polskąi żydowską. Usłyszymy tu akordeon
              zarówno w wersji akustycznej jak i elektronicznej.
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
