'use client';

import FooterMain from '@/app/(site)/components/footer/FooterMain';
import SliderGroups from '@/app/(site)/components/slider_groups/SliderGroups';
import { useAdjustContainerWIdthsAndMargins } from '@/hooks/useAdjustContainerWIdthsAndMargins';
import {
  createBetweenHoursText,
  getPolishDayName,
  getPolishPlaceName,
} from '@/lib/textHelpers';
import { CyclicalActivityTemporary, TSliderGroupImage } from '@/types';
import clsx from 'clsx';
import { Fragment } from 'react';

type Props = {
  activity: CyclicalActivityTemporary;
};

export default function CyclicActivitiesDynamicInside(props: Props) {
  ////vars
  const containerProperClasses = useAdjustContainerWIdthsAndMargins();
  const { activity } = props;
  const sliderImages: TSliderGroupImage[] | undefined =
    activity.extendedInfo?.images || [];

  const isSliderEmpty = sliderImages && sliderImages.length === 0;

  return (
    <Fragment>
      {!isSliderEmpty ? <SliderGroups sliderImages={sliderImages} /> : null}

      <div className={containerProperClasses}>
        <div className="max-w-full prose">
          <h1 className={clsx(isSliderEmpty ? '-mt-[7px]' : 'mt-[57px]')}>
            {activity.name}
          </h1>
          {activity.extendedInfo?.description ? (
            <div
              dangerouslySetInnerHTML={{
                __html: activity.extendedInfo?.description as string,
              }}
            ></div>
          ) : null}

          {/* <p>
            <b>Warsztaty kreatywne „PRZESTRZEŃ SZTUKI” - malarstwo i rysunek</b>
          </p>
          <p>
            Prowadząca: <b>SYLWIA LIPINA</b>
          </p>
          <p>
            Artystka sztuk pięknych, projektantka graficzna, historyczka sztuki.
            Jest abslowentką BA (HONS) Fine Art - University of the Arts London,
            Chelsea College of Art and Design, HNC Diploma in Art and Design -
            Southampton City College oraz Studia Podyplomowe z Historii Sztuki -
            Uniwersytet Śląski w Katowicach.
          </p>
          <p>
            Spotkania oscylujące wokół malarstwa akwarelowego, akrylowego oraz
            rysunku. Zapoznanie z historią sztuki (interpretacja dzieła,
            estetyka dzieła, ikonografia, ikonologia), rozumienia koła kolorów,
            podstawowe zasady perspektywy i kompozycji.
          </p>
          <p>
            Celem warsztatów jest włączenie w kreatywne działania społeczność
            dorosłych i seniorów, oraz dzieci i młodzieży w wieku 13+.
            Działania zorientowane są wokół hasła „kreatywność przez całe
            życie” i prowokują do rozwoju umiejętności praktycznych,
            interpersonalnych, rozwój umiejętności analitycznych, krytycznego
            myślenia, dyskusji prowadzących do wzajemnego inspirowania i
            motywowania, terapia sztuką.
          </p>
          <p>Jakie kompetencje zdobędziesz podczas warsztatów:</p>
          <ul>
            <li>
              Zrozumienie wartości twórczego wyrażania i komunikowania idei
              ,znaczeń i emocji.
            </li>
            <li>
              Podnoszenie świadomości kulturowej i chęci uczestnictwa w
              doświadczeniach kulturalnych.
            </li>
            <li>
              Umiejętności praktyczne, praca z materiałem, metodyczna praca,
              proces twórczy.
            </li>
            <li>Umiejętność interpretacji dzieła sztuki.</li>
            <li>
              Wzrost umiejętności interpersonalnych, komunikacji werbalnej i
              niewerbalnej.
            </li>
            <li>Wykorzystanie sztuki jako terapii.</li>
          </ul> */}
          <div>
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
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <span>{` - ${getPolishPlaceName(activity.place)}`}</span>
                    </li>
                  );
                })}
              </ul>
            </p>
          </div>
        </div>
      </div>
      <FooterMain />
    </Fragment>
  );
}
