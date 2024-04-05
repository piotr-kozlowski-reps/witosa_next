import FooterMain from '@/app/(site)/components/footer/FooterMain';
import SliderGroups from '@/app/(site)/components/slider_groups/SliderGroups';
import { getPolishPlaceName } from '@/lib/textHelpers';
import { TEventTemporary, TSliderGroupImage } from '@/types';
import clsx from 'clsx';
import { Fragment } from 'react';
import DateAsClientComponentToPreserveConsistency from './DateAsClientComponentToPreserveConsistency';
import CustomLink from '@/app/(site)/components/CustomLink';

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
              Spektakl pełen walizek, a walizki pełne lalek, bajek, historii i
              opowieści - z różnych krajów, czasów i miejsc (nawet takich, które
              w ogóle nie istnieją!) Pojawiają się bardzo różne lalki a historie
              są raz śmieszne innym razem trochę straszne! Spektakl nie ma
              końca, gdyż nowe historie w nowych walizkach pojawiają się cały
              czas! Aktualnie można spotkać się z: Najsmaczniejszą walizką - a w
              niej aromatyczna historia z Krainy Sera, Walizką pełną
              krasnoludków - historia o krasnoludku, który nauczył się latać.
              Tajemnicza walizka, w której mieści się chyba z tysiąc historii,
              ale lubi ona płatać figle… Walizka z czasów jaskiniowców - z
              jedynym na świecie… a niech to będzie niespodzianką!
            </p>

            <p>
              Teatr Lalek Marka Żyły powstał w 2016 r. z pasji i miłości do
              lalek i rozśmieszania. Każdy temat starają się okrasić sporą dawką
              dobrego humoru. Ideą tego teatru jest teatr wędrowny, jarmarczny,
              który gra wszędzie tam, gdzie tylko można ustawić niewielką scenę,
              pełną lalek!
            </p>
          </div> */}

          <div className="not-prose">
            <br />
            {/* data */}
            <DateAsClientComponentToPreserveConsistency
              isDateToBeHiddenInNewsSection={
                event.isDateToBeHiddenInNewsSection
              }
              eventStartDate={event.eventStartDate}
            />
            {/* {event.isDateToBeHiddenInNewsSection ? null : (
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
            )} */}

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
            <div className="-mt-[3px]">
              <span className="font-base-regular">
                <b>Wstęp:&nbsp;&nbsp;&nbsp;</b>
              </span>
              <span className="font-base-regular">{event.kindOfEnterInfo}</span>
            </div>
            <div className="mt-[19px]">
              {event.isPayed && event.ticketBuyingId ? (
                // <CustomLink
                //   visibleText="kup bilet online"
                //   url={`sdcsd`}
                //   descriptionText="kup bilet online"
                //   additionalCssClasses="py-[19px] px-[3rem]"
                // />
                <a
                  aria-label="kup bilet online"
                  href={`${process.env.NEXT_PUBLIC_VISUAL_TICKET_URL}${event.ticketBuyingId}`}
                  // target="_blank"
                  // rel="noopener noreferrer"
                  title="Otwiera się w nowej zakładce."
                  className={clsx('standard-button py-[19px] px-[3rem]')}
                >
                  <span className="sr-only">kup bilet online</span>
                  kup bilet online
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <FooterMain />
    </Fragment>
  );
}
