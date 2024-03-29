import {
  getDayAlwaysInTwoDigits,
  getMonthAlwaysInTwoDigits,
} from '@/lib/dateHelpers';
import { getPolishEventTypeName } from '@/lib/textHelpers';
import { TCurrentDevice } from '@/types';
import { EventType } from '@prisma/client';
import clsx from 'clsx';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Fragment, useRef } from 'react';
import CustomLink from '../CustomLink';

interface Props {
  id: string;
  eventTypes: EventType[];
  eventStartDate: Date;
  newsSectionImageUrl: string | null; //TODO: create some image dummy if there's no image
  title: string;
  shortDescription: string;
  index: number;
  currentDevice: TCurrentDevice;
  isDateToBeHiddenInNewsSection: boolean;
  customLinkToDetails?: string | null;
  isToBeOnlyInNewsSection_NoDetails: boolean;
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
    isDateToBeHiddenInNewsSection,
    customLinkToDetails = '',
    isToBeOnlyInNewsSection_NoDetails,
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

  ////animation
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });
  const animationState = {
    start: 0,
    endOfStartingAnimation: 0.4,
    textEndAnimation: 0.5,
    startOfEndingAnimation: 0.75,
    end: 1,
  };

  const wholeDivOpacity = useTransform(
    scrollYProgress,
    [
      animationState.start,
      animationState.endOfStartingAnimation,
      animationState.startOfEndingAnimation,
      animationState.end,
    ],
    [0, 1, 1, 0]
  );
  const wholeDivScale = useTransform(
    scrollYProgress,
    [
      animationState.start,
      animationState.endOfStartingAnimation,
      animationState.startOfEndingAnimation,
      animationState.end,
    ],
    [0.9, 1, 1, 0.9]
  );

  const textScale = useTransform(
    scrollYProgress,
    [animationState.start, animationState.textEndAnimation],
    [1.2, 1]
  );
  const textX = useTransform(
    scrollYProgress,
    [animationState.start, animationState.textEndAnimation],
    [45, 0]
  );

  ////tsx
  return (
    <Fragment>
      <motion.section
        ref={targetRef}
        style={{ opacity: wholeDivOpacity, scale: wholeDivScale }}
      >
        <div
          className={clsx(
            'relative',
            isShowingBothSurroundingLines ? 'add-both-surrounding-lines' : '',
            isShowingOnlyLeftSurroundingLine ? 'add-left-surrounding-line' : ''
          )}
        >
          <div className="absolute top-0 left-0">
            {eventTypes.map((type, index) => (
              <div
                key={index}
                className="inline font-base-regular text-size-normal"
              >
                <span>{index !== 0 ? '|' : ''}</span>
                <span className={clsx(index !== 0 ? 'mx-2' : 'mr-2')}>
                  {getPolishEventTypeName(type)}
                </span>
              </div>
            ))}
          </div>
          {isDateToBeHiddenInNewsSection ? null : (
            <div className="absolute prose top-[46px] bg-skin-main-bg py-1 pr-4 rounded-r-base">
              <h2>{createFormattedDate(eventStartDate)}</h2>
            </div>
          )}
        </div>

        <div className="-mt-[7px]">
          <div className="pt-[57px]">
            <div className="max-w-[271px] max-h-[271px] mx-auto">
              <Image
                src={`${process.env.NEXT_PUBLIC_AWS_S3_MAIN_URL}${newsSectionImageUrl}`}
                width={271}
                height={271}
                alt={title}
                className="rounded-full"
              />
            </div>
          </div>
          <div className="mt-12 prose">
            <motion.h4 style={{ scale: textScale, x: textX }}>
              {title}
            </motion.h4>
            <p>{shortDescription}</p>
          </div>
          <div className="mt-[30px]">
            <CustomLink
              visibleText="dowiedz się więcej ..."
              url={customLinkToDetails ? customLinkToDetails : `/events/${id}`}
              descriptionText={title}
              inactiveLink={isToBeOnlyInNewsSection_NoDetails}
            />
          </div>
        </div>
      </motion.section>
    </Fragment>
  );
}

////utils
function createFormattedDate(date: Date) {
  return `${getDayAlwaysInTwoDigits(date)}.${getMonthAlwaysInTwoDigits(date)}`;
}
function checkIfShouldShowBothSurroundingLines_WhenThreeColumnSelected(
  index: number,
  currentDevice: TCurrentDevice
) {
  let isShouldShowBothLines = false;
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
  for (let i = 1; i <= index; i += 2) {
    if (i > index) break;

    if (i === index) {
      isShouldShowBothLines = true;
      break;
    }
  }

  return isShouldShowBothLines && currentDevice === 'TABLET';
}
