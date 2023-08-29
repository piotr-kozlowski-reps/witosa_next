import FooterMain from '@/app/(site)/components/footer/FooterMain';
import SliderGroups from '@/app/(site)/components/slider_groups/SliderGroups';
import {
  createBetweenHoursText,
  createListingOfAllPlacesSeparatedWithCommas,
  getPolishDayName,
} from '@/lib/textHelpers';
import { CyclicalActivityTemporary, TSliderGroupImage } from '@/types';
import clsx from 'clsx';
import { Fragment } from 'react';

type Props = {
  activity: CyclicalActivityTemporary;
};

export default function CyclicActivitiesDynamicInside(props: Props) {
  ////vars
  const { activity } = props;
  const sliderImages: TSliderGroupImage[] | undefined =
    activity.extendedInfo?.images || [];

  const isSliderEmpty = sliderImages && sliderImages.length === 0;

  return (
    <Fragment>
      {!isSliderEmpty ? <SliderGroups sliderImages={sliderImages} /> : null}

      <div className="proper-container-classes">
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
                      <span>
                        {createListingOfAllPlacesSeparatedWithCommas(
                          activity.places
                        )}
                      </span>
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
