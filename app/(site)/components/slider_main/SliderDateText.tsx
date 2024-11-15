import { useNavigationState } from '@/context/navigationState';
import {
  getCorrectTwoDigitsMonthNumber,
  getHoursAndMinutesWithGInFrontFromDateObject,
  getPolishDayFromDateObject,
} from '@/lib/textHelpers';
import { Fragment } from 'react';
type Props = {
  date: Date;
  forceToBeInOneLine?: boolean;
  twoLines?: boolean;
};

export default function SliderDateText(props: Props) {
  ////vars
  const { date, forceToBeInOneLine = false, twoLines = false } = props;
  const { getCurrentDevice } = useNavigationState();

  ////tsx
  return (
    <Fragment>
      <span>{`${date.getDate()}.${getCorrectTwoDigitsMonthNumber(date)}`}</span>
      <span className="text-skin-gray">{`.${date.getFullYear()}`}</span>
      {getCurrentDevice() !== 'MOBILE' || forceToBeInOneLine ? (
        <Fragment>
          {!twoLines ? (
            <div className="inline-block px-4 mb-[20px] scale-y-[0.6] scale-x-75 text-skin-gray">
              |
            </div>
          ) : null}

          {!twoLines ? (
            <>
              <span className="text-skin-gray">{`${getPolishDayFromDateObject(date)}`}</span>
              <div className="inline-block px-4 mb-[20px] scale-y-[0.6] scale-x-75 text-skin-gray">
                |
              </div>
              <span>{getHoursAndMinutesWithGInFrontFromDateObject(date)}</span>)
            </>
          ) : (
            <div>
              <span className="text-skin-gray">{`${getPolishDayFromDateObject(date)}`}</span>
              <div className="inline-block px-4 mb-[20px] scale-y-[0.6] scale-x-75 text-skin-gray">
                |
              </div>
              <span>{getHoursAndMinutesWithGInFrontFromDateObject(date)}</span>
            </div>
          )}
        </Fragment>
      ) : null}
      {getCurrentDevice() === 'MOBILE' && !forceToBeInOneLine ? (
        <Fragment>
          <div>
            <span>{getHoursAndMinutesWithGInFrontFromDateObject(date)}</span>
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  );
}
