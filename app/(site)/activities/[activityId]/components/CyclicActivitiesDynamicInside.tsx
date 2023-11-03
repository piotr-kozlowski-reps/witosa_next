import FooterMain from '@/app/(site)/components/footer/FooterMain';
import SliderGroups from '@/app/(site)/components/slider_groups/SliderGroups';
import { createBetweenHoursText, getPolishDayName } from '@/lib/textHelpers';
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
                      <span>
                        {createBetweenHoursText(
                          item.activityStart,
                          item.activityEnd
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
