'use client';

import { createDateInFormat_DateSeparatorFullDayNameSeparatorTime } from '@/lib/textHelpers';
import { Fragment } from 'react';

type Props = {
  isDateToBeHiddenInNewsSection: boolean | null;
  eventStartDate: Date;
};

export default function DateAsClientComponentToPreserveConsistency(
  props: Props
) {
  ////vars
  const { isDateToBeHiddenInNewsSection, eventStartDate } = props;

  ////tsx
  return (
    <Fragment>
      {isDateToBeHiddenInNewsSection ? null : (
        <div className="mb-4">
          <span className="font-base-regular">
            <b>Kiedy:&nbsp;&nbsp;&nbsp;</b>
            <span className="">
              {createDateInFormat_DateSeparatorFullDayNameSeparatorTime(
                eventStartDate
              )}
            </span>
          </span>
        </div>
      )}
    </Fragment>
  );
}
