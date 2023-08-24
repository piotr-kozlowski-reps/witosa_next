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
          {/* 
          <p>
            Prowadząca: <b>AGATA NIŹNIKIEWICZ</b>
          </p>
          <p>
            Zapraszamy na warsztaty z tradycyjnych technik drukarskich w
            nowoczesnym wydaniu.
          </p>
          <p>
            Podczas zajęć uczestnicy poznają linoryt, technikę suchej igły czy
            mezzotintę, a następnie nauczą się wykorzystywać ich potencjał
            wizualny do tworzenia wyjątkowych grafik.
          </p>
          <p>
            Uczestnicy własnoręcznie wykonują matrycę, pokrywają ją farbą, a za
            pomocą prasy drukarskiej przenoszą wizerunek z matrycy na papier.
            Gotowe prace planujemy systematycznie prezentować w formie wystaw
            stacjonarnych i instalacji multimedialnych. Zajęcia obejmują także
            podstawy rysunku i kompozycji, aby umożliwić uczestnikom tworzenie
            własnych świadomych i przemyślanych projektów.
          </p>

          <p>
            <b>Agata Niźnikiewicz</b> - artystka, graficzka, fotografka i
            pedagog.
          </p>
          <p>
            Absolwentka Akademii Sztuk Pięknych w Katowicach (kier. grafika
            warsztatowa), Akademii Sztuk Pięknych we Wrocławiu (kier. fotografia
            i multimedia), Instytutu Studiów Podyplomowych Wyższej Szkoły Nauk
            Pedagogicznych (studia podyplomowe z przygotowania pedagogicznego).
          </p>

          <p>
            Jest autorką wielu projektów artystycznych, prezentowanych na
            licznych wystawach:
          </p>
          <ul>
            <li>
              WYSTAWY INDYWIDUALNE: ● Connect, Teoria w Katowicach. ● Subtelne
              Formy, Galeria Sztukateria w Knurowie ● Subtelne Formy, Galeria
              Tłustym Drukiem w Łodzi
            </li>
            <li>
              WYSTAWY ZBIOROWE ● Cyberfoto, Regionalny Ośrodek Kultury w
              Częstochowie ● Relations/Young Wave, Galeria Foto-Gen we Wrocławiu
              ● Human / Człowiek, Sztukateria w Knurowie ● Wystaw się w CSW
              2018, Centrum Sztuki Współczesnej w Toruniu ● Grafika Roku, Rondo
              Sztuki w Katowicach ● Młoda Sztuka w Starym Mieście, New Era Art w
              Krakowie ● Prace dyplomowe, Galerii Sztuki Współczesnej BWA w
              Katowicach ● Wystaw się w CSW 2017, Centrum Sztuki Współczesnej w
              Toruniu
            </li>
            <li>
              WYSTAWY MIĘDZYNARODOWE ● Unobvious, Suwon Photo Korea Południowa.
              ● 16. Międzynarodowe Triennale Grafiki Małe Formy, Miejska Galeria
              Sztuki w Łodzi ● Platform Project, Fronteer Athens School of Fine
              Arts{' '}
            </li>
            <li>
              NAGRODY ● Honorowy Medal 16. Międzynarodowych Triennale Małe Formy
              Grafiki, Polska-Łódź
            </li>
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
                      <span>&nbsp;&nbsp;&nbsp;</span>
                      <span>-&nbsp;&nbsp;&nbsp;</span>
                      <span>{`${getPolishPlaceName(activity.place)}`}</span>
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
