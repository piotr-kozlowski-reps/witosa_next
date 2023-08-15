import { getPolishTypeName } from '@/lib/textHelpers';
import { TCurrentDevice } from '@/types';
import { EventsType } from '@prisma/client';
import clsx from 'clsx';
import Image from 'next/image';
import { Fragment } from 'react';
import CustomLink from '../CustomLink';

interface Props {
  id: string;
  eventTypes: EventsType[];
  eventStartDate: Date;
  newsSectionImageUrl: string | null; //TODO: create some image dummy if there's no image
  title: string;
  shortDescription: string;
  index: number;
  currentDevice: TCurrentDevice;
}

export default function SingleNews(props: Props) {
  ////vars
  const {
    id,
    eventTypes,
    eventStartDate,
    newsSectionImageUrl,
    title,
    shortDescription,
    index,
    currentDevice,
  } = props;

  let isShowingBothSurroundingLines =
    checkIfShouldShowBothSurroundingLines_WhenThreeColumnSelected(
      index,
      currentDevice
    );

  let isShowingOnlyLeftSurroundingLine =
    checkIfShouldShowOnlyLeftSurroundingLine_WhenTwoColumnSelected(
      index,
      currentDevice
    );

  console.log({ currentDevice });

  ////tsx
  return (
    <Fragment>
      <div
        className={clsx(
          'relative',
          isShowingBothSurroundingLines ? 'add-both-surrounding-lines' : '',
          isShowingOnlyLeftSurroundingLine ? 'add-left-surrounding-line' : ''
        )}
      >
        <div className="absolute top-0 left-0">
          {eventTypes.map((type, index) => (
            <div key={index} className="inline font-base-regular text-base-13">
              <span>{index !== 0 ? '|' : ''}</span>
              <span className={clsx(index !== 0 ? 'mx-2' : 'mr-2')}>
                {getPolishTypeName(type)}
              </span>
            </div>
          ))}
        </div>
        <div className="absolute prose top-[50px]">
          <h2>{createFormattedDate(eventStartDate)}</h2>
        </div>
      </div>

      <div className="max-w-[271px] max-h-[271px] mx-auto mt-[57px] ">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_URL}${newsSectionImageUrl}`}
          width={271}
          height={271}
          alt={title}
          className="rounded-full"
        />
      </div>
      <div className="mt-12 prose">
        <h4>{title}</h4>
        <p>{shortDescription}</p>
      </div>
      <div className="mt-[30px]">
        <CustomLink
          visibleText="dowiedz się więcej ..."
          url={`/events/${id}`}
          descriptionText={title}
        />
      </div>
    </Fragment>
  );
}

function getMonthAlwaysInTwoDigits(date: Date) {
  const monthNumber = date.getMonth() + 1;
  return monthNumber <= 10 ? `0${monthNumber}` : monthNumber;
}
function getDayAlwaysInTwoDigits(date: Date) {
  const dayNumber = date.getDate() + 1;
  return dayNumber <= 10 ? `0${dayNumber}` : dayNumber;
}
function createFormattedDate(date: Date) {
  return `${getDayAlwaysInTwoDigits(date)}.${getMonthAlwaysInTwoDigits(date)}`;
}
function checkIfShouldShowBothSurroundingLines_WhenThreeColumnSelected(
  index: number,
  currentDevice: TCurrentDevice
) {
  let isShouldShowBothLines = false;
  console.log('inside loop');
  for (let i = 1; i <= index; i += 3) {
    if (i > index) break;
    if (i === index) {
      isShouldShowBothLines = true;
      break;
    }
  }

  return isShouldShowBothLines && currentDevice === 'DESKTOP';
}
function checkIfShouldShowOnlyLeftSurroundingLine_WhenTwoColumnSelected(
  index: number,
  currentDevice: TCurrentDevice
) {
  let isShouldShowBothLines = false;
  console.log('inside loop');
  for (let i = 1; i <= index; i += 2) {
    console.log({ i });
    console.log({ index });
    console.log('final comparision: ', i === index);

    if (i > index) break;

    if (i === index) {
      isShouldShowBothLines = true;
      break;
    }
  }

  return isShouldShowBothLines && currentDevice === 'TABLET';
}
