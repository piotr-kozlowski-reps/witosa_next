'use client';

import { useObserveElementHeight } from '@/hooks/useObserveElementHeight';
import { getPolishEventTypeName } from '@/lib/textHelpers';
import { TSlide } from '@/types';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { Fragment } from 'react';
import CustomLink from '../CustomLink';
import TextButton from '../TextButton';
import PrevIcon from '../icons/PrevIcon';
import SliderDateText from './SliderDateText';

type Props = {
  slide: TSlide;
  eventId: string;
  direction: number;
  prevButtonHandler: () => void;
  nextButtonHandler: () => void;
  toggleSliderButtonFn: () => void;
  isSliderPaused: boolean;
};

export default function SliderContent(props: Props) {
  ////vars
  const {
    slide,
    eventId,
    prevButtonHandler,
    nextButtonHandler,
    direction,
    toggleSliderButtonFn,
    isSliderPaused,
  } = props;
  const { height: overallHeight, ref: overallRef } =
    useObserveElementHeight<HTMLDivElement>();
  const { height: descriptionHeight, ref: descriptionRef } =
    useObserveElementHeight<HTMLDivElement>();

  const slideSlidingVariant = {
    initial: (direction: number) => {
      return {
        x: direction > 0 ? 500 : -500,
        opacity: 0,
        scale: 0.9,
      };
    },
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction: number) => {
      return {
        x: direction > 0 ? -500 : 500,
        opacity: 0,
        scale: 0.9,
        transition: {
          x: { type: 'spring', stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        },
      };
    },
  };

  const textsVariant = {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
  };

  ////tsx
  return (
    <Fragment>
      <div className="relative w-full" style={{ height: overallHeight }}>
        <div ref={overallRef} className="absolute top-0 w-full">
          {/* version when screen bigger than "slider-break-point" */}
          <div className="relative items-start justify-start hidden bg-skin-main-bg drop-shadow-big rounded-base slider-break-point:flex">
            <div className="h-[638px] overflow-hidden  ">
              <div>
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    variants={slideSlidingVariant}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    key={slide.id}
                    custom={direction}
                    className="h-[638px] w-[453px]"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_AWS_S3_MAIN_URL}${slide.sliderImageUrl}`}
                      width={1140}
                      height={900}
                      alt={slide.sliderImageAlt || ''}
                      className="object-cover object-center h-full rounded-l-base"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div
              className="flex-1 mt-[23px] ml-8 mr-8"
              style={{ height: descriptionHeight }}
            >
              <div ref={descriptionRef} className="absolute !max-w-full prose">
                <motion.div
                  variants={textsVariant}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  key={slide.id}
                  transition={{ delay: 0.1 }}
                  className="pr-8 "
                >
                  <div className="text-size-normal">
                    {slide.eventTypes.map((type, index) => (
                      <div key={index} className="inline font-base-regular">
                        <span>{index !== 0 ? '|' : ''}</span>
                        <span className={clsx(index !== 0 ? 'mx-2' : 'mr-2')}>
                          {getPolishEventTypeName(type)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <h1 className="mt-[18px]">{slide.title}</h1>
                  <h2 className="-mt-[15px]">
                    <SliderDateText
                      date={slide.eventStartDate}
                      twoLines={true}
                    />
                  </h2>
                  <div className="mt-[36px]">
                    <CustomLink
                      visibleText="dowiedz się więcej..."
                      url={`events/${eventId}`}
                      descriptionText={slide.title}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
            <div className="absolute left-0 z-[1] bottom-4 bg-skin-main-bg rounded-r-base">
              <div className="h-[44px]">
                <PrevIcon
                  alt="Wróć do poprzedniego slajdu."
                  actionFn={prevButtonHandler}
                  isToBeRotatedToBeVertical={false}
                />
              </div>
            </div>
            <div className="absolute right-0 z-[1] bottom-4 bg-skin-main-bg rounded-l-base">
              <div className="h-[44px]">
                <PrevIcon
                  alt="Następny slajd."
                  actionFn={nextButtonHandler}
                  isToBeRotatedToBeVertical={false}
                  isToBeFlippedToBeNextButton={true}
                />
              </div>
            </div>
            <div className="absolute right-0 z-[1] top-[638px]">
              <TextButton
                buttonName={
                  isSliderPaused
                    ? 'uruchom pokaz slajdów'
                    : 'zatrzymaj pokaz slajdów'
                }
                actionFn={toggleSliderButtonFn}
              />
            </div>
          </div>

          {/* version when screen smaller than "slider-break-point" */}
          <div className="block slider-break-point:hidden bg-skin-main-bg">
            <div className="relative ">
              <div className="h-[638px] rounded-base overflow-hidden ">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    variants={slideSlidingVariant}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    key={slide.id}
                    custom={direction}
                    className="absolute object-cover object-center w-full h-full rounded-base"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_AWS_S3_MAIN_URL}${slide.sliderImageUrl}`}
                      width={1140}
                      height={900}
                      alt={slide.sliderImageAlt || ''}
                      className="object-contain object-center w-full h-full rounded-base"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="absolute left-0 z-[1] bottom-2 bg-skin-main-bg rounded-r-base">
                <div className="h-[44px]">
                  <PrevIcon
                    alt="Wróć do poprzedniego slajdu."
                    actionFn={prevButtonHandler}
                    isToBeRotatedToBeVertical={false}
                  />
                </div>
              </div>
              <div className="absolute right-0 z-[1] bottom-2 bg-skin-main-bg rounded-l-base">
                <div className="h-[44px]">
                  <PrevIcon
                    alt="Następny slajd."
                    actionFn={nextButtonHandler}
                    isToBeRotatedToBeVertical={false}
                    isToBeFlippedToBeNextButton={true}
                  />
                </div>
              </div>
            </div>

            <div className="absolute right-0 z-[1] top-[638px]">
              <TextButton
                buttonName={
                  isSliderPaused
                    ? 'uruchom pokaz slajdów'
                    : 'zatrzymaj pokaz slajdów'
                }
                actionFn={toggleSliderButtonFn}
              />
            </div>

            <div className="relative" style={{ height: descriptionHeight }}>
              <div
                ref={descriptionRef}
                className="absolute !max-w-full mt-8 prose"
              >
                <motion.div
                  variants={textsVariant}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  key={slide.id}
                  transition={{ delay: 0.1 }}
                >
                  <div className="text-size-normal">
                    {slide.eventTypes.map((type, index) => (
                      <div key={index} className="inline font-base-regular">
                        <span>{index !== 0 ? '|' : ''}</span>
                        <span className={clsx(index !== 0 ? 'mx-2' : 'mr-2')}>
                          {getPolishEventTypeName(type)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <h1 className="mt-[18px]">{slide.title}</h1>
                  <h2 className="-mt-[15px]">
                    <SliderDateText date={slide.eventStartDate} />
                  </h2>
                  <div className="mt-[41px]">
                    <CustomLink
                      visibleText="dowiedz się więcej..."
                      url={`events/${eventId}`}
                      descriptionText={slide.title}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

//////////////////////////////////////
// <Fragment>
//   <div className="relative w-full" style={{ height: overallHeight }}>
//     <div ref={overallRef} className="absolute top-0 w-full">
//       {/* image + icons -> start */}
//       <div className="relative bg-skin-main-bg">
//         <div className="h-[352px] rounded-base overflow-hidden">
//           <AnimatePresence initial={false} custom={direction}>
//             <motion.div
//               variants={slideSlidingVariant}
//               initial="initial"
//               animate="animate"
//               exit="exit"
//               key={slide.id}
//               custom={direction}
//               className="absolute object-cover object-center w-full h-full rounded-base"
//             >
//               <Image
//                 src={`${process.env.NEXT_PUBLIC_AWS_S3_MAIN_URL}${slide.sliderImageUrl}`}
//                 width={1140}
//                 height={900}
//                 alt={slide.sliderImageAlt || ''}
//                 className="object-cover object-center w-full h-full rounded-base"
//               />
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         <div className="absolute left-0 z-[1] bottom-2 bg-skin-main-bg rounded-r-base">
//           <div className="h-[44px]">
//             <PrevIcon
//               alt="Wróć do poprzedniego slajdu."
//               actionFn={prevButtonHandler}
//               isToBeRotatedToBeVertical={false}
//             />
//           </div>
//         </div>
//         <div className="absolute right-0 z-[1] bottom-2 bg-skin-main-bg rounded-l-base">
//           <div className="h-[44px]">
//             <PrevIcon
//               alt="Następny slajd."
//               actionFn={nextButtonHandler}
//               isToBeRotatedToBeVertical={false}
//               isToBeFlippedToBeNextButton={true}
//             />
//           </div>
//         </div>
//       </div>
//       {/* image + icons -> end */}

//       {/* pause slider */}
//       <div className="absolute right-0 z-[1] top-[350px]">
//         <TextButton
//           buttonName={
//             isSliderPaused
//               ? 'uruchom pokaz slajdów'
//               : 'zatrzymaj pokaz slajdów'
//           }
//           actionFn={toggleSliderButtonFn}
//         />
//       </div>

//       <div className="relative" style={{ height: descriptionHeight }}>
//         <div
//           ref={descriptionRef}
//           className="absolute !max-w-full mt-8 prose"
//         >
//           <motion.div
//             variants={textsVariant}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             key={slide.id}
//             transition={{ delay: 0.1 }}
//           >
//             <div className="text-size-normal">
//               {slide.eventTypes.map((type, index) => (
//                 <div key={index} className="inline font-base-regular">
//                   <span>{index !== 0 ? '|' : ''}</span>
//                   <span className={clsx(index !== 0 ? 'mx-2' : 'mr-2')}>
//                     {getPolishEventTypeName(type)}
//                   </span>
//                 </div>
//               ))}
//             </div>
//             <h1 className="mt-[18px]">{slide.title}</h1>
//             <h2 className="-mt-[15px]">
//               <SliderDateText date={slide.eventStartDate} />
//             </h2>
//             <div className="mt-[41px]">
//               <CustomLink
//                 visibleText="dowiedz się więcej..."
//                 url={`events/${eventId}`}
//                 descriptionText={slide.title}
//               />
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   </div>
// </Fragment>;
