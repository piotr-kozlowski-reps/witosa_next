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
  const sliderImages: TSliderGroupImage[] | undefined = activity.images || [];

  const isSliderEmpty = sliderImages && sliderImages.length === 0;

  return (
    <Fragment>
      {!isSliderEmpty ? <SliderGroups sliderImages={sliderImages} /> : null}

      <div className="proper-container-classes">
        <div className="max-w-full prose">
          <h1 className={clsx(isSliderEmpty ? '-mt-[7px]' : 'mt-[57px]')}>
            {activity.name}
          </h1>
          {activity.longDescription ? (
            <div
              dangerouslySetInnerHTML={{
                __html: activity.longDescription as string,
              }}
            ></div>
          ) : null}

          {/* <div>
            <p>
              Zapraszamy na absolutną nowość w ofercie naszej instytucji, jaką
              są treningi akrobatyczne.
            </p>
            <p>
              Zajęcia poprowadzi doświadczona instruktorka akrobatyki:
              <b> Kimi Łagowska</b>.
            </p>
            <p>
              Treningi akrobatyczne pomagają pokonywać własne lęki i słabości,
              kształtują charakter i są wspaniałą nauką dyscypliny oraz
              skupienia. Kolejne udane elementy (przewroty, gwiazdy, stanie na
              głowie czy rękach, mostki, przejścia, fliki) budują samoocenę i
              dodają pewności siebie. Dziecko staje się bardziej zwinne,
              silniejsze, nabiera większej świadomości ciała i szybciej opanuje
              różne zadania koordynacyjne w sporcie, w tańcu i życiu codziennym.
            </p>
            <p>
              Zajęcia rozpoczynają się <b>30.09</b> i odbywać się będą w każdą
              sobotę w czterech odrębnych grupach.
            </p>
            <p>
              Dla bezpieczeństwa i komfortu dzieci, grupy nie będą przekraczały
              14 osób.
            </p>
            <p>
              Koszt: 70 pln za miesiąc. Pierwsze zajęcia <b>30.09</b> są
              zajęciami <b>bezpłatnymi</b>.
            </p>
          </div> */}

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
                      {item.duration.length === 1 ? (
                        <Fragment>
                          <span>
                            {createBetweenHoursText(
                              item.duration[0].activityStart,
                              item.duration[0].activityEnd
                            )}
                          </span>
                          <span>&nbsp;&nbsp;&nbsp;</span>
                          <span>-&nbsp;&nbsp;&nbsp;</span>
                          <span>
                            {createListingOfAllPlacesSeparatedWithCommas(
                              activity.places
                            )}
                          </span>
                        </Fragment>
                      ) : null}
                      {item.duration.length > 1 ? (
                        <ul>
                          {item.duration.map((durationItem, index) => (
                            <li key={index}>
                              {createBetweenHoursText(
                                durationItem.activityStart,
                                durationItem.activityEnd
                              )}
                              <span>&nbsp;&nbsp;&nbsp;</span>
                              <span>-&nbsp;&nbsp;&nbsp;</span>
                              <span>
                                {createListingOfAllPlacesSeparatedWithCommas(
                                  activity.places
                                )}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
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
