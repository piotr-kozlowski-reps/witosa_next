import FooterMain from '@/app/(site)/components/footer/FooterMain';
import SliderGroups from '@/app/(site)/components/slider_groups/SliderGroups';
import {
  createDateInFormat_DateSeparatorFullDayNameSeparatorTime,
  getPolishPlaceName,
} from '@/lib/textHelpers';
import { TEventTemporary, TSliderGroupImage } from '@/types';
import clsx from 'clsx';
import { Fragment } from 'react';

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
              <b>Anna Mendak</b> - czołowa tancerka flamenco poprowadzi
              warsztaty tańca dla dzieci w wieku 7-14 lat.
            </p>
            <p>
              Podczas warsztatów uczestnicy wykonają wachlarz flamenco,
              zapoznają z się z podstawowymi technikami i krokami tańca
              flamenco. Muzyczny klimat podczas warsztatów stworzy Michał
              Czachowski wirtuoz gitary. Wszyscy uczestnicy niesamowitego
              spotkania będą mogli zrobić sobie pamiątkowe zdjęcie z artystami
              na scenie Art CK.
            </p>
            <p>
              Rezerwacja telefoniczna pod nr telefonu 32/332 63 81 w godz. 15.00
              -20.00.
            </p>

            <p>
              <b>Zapraszamy!</b>
            </p>
          </div> */}

          <div className="not-prose">
            <br />
            {/* data */}
            {event.isDateToBeHiddenInNewsSection ? null : (
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
            )}

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
