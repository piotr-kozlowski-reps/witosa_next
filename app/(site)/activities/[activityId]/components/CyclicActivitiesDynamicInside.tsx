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
          {/* {activity.extendedInfo?.description ? (
            <div
              dangerouslySetInnerHTML={{
                __html: activity.extendedInfo?.description as string,
              }}
            ></div>
          ) : null} */}
          <p>
            Prowadząca: <b>AGNIESZKA BALA</b>
          </p>
          <p>
            Młody projektant wnętrz - rozwijaj swoją kreatywność, wyobraźnię,
            poznaj modelowanie 3D i stwórz swój pierwszy projekt wnętrza!
          </p>
          <p>Nasze zajęcia obejmują:</p>
          <ul>
            <li>
              wstęp - czym jest projektowanie, czym jest design, krótka historia
              sztuki
            </li>
            <li>proces projektowania</li>
            <li>style w aranżacji wnętrz</li>
            <li>wpływ światła na wnętrze</li>
            <li>nauka obsługi programu do projektowania wnętrz</li>
            <li>wizualizacje</li>
          </ul>
          <p>
            Zajęcia w formie prezentacji, pracy w grupie, pracy indywidualnej.
          </p>
          <p>
            Praca na makiecie, praca z &quot;kartką i ołówkiem&quot; szkice,
            praca z mood boardem (tablica inspiracji) praca w programach (trzeba
            mieć swój laptop).
          </p>

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
