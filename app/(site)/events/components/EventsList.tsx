import { useNavigationState } from '@/context/navigationState';
import { pageVariant } from '@/lib/animations/variants';
import { createListingOfAllPlacesSeparatedWithCommas } from '@/lib/textHelpers';
import { TEventTemporary } from '@/types';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import CustomLink from '../../components/CustomLink';
import SliderDateText from '../../components/slider_main/SliderDateText';

interface Props {
  chosenEvents: TEventTemporary[];
}

export default function EventsList(props: Props) {
  ////vars
  const { chosenEvents } = props;
  const { getCurrentDevice } = useNavigationState();

  ////tsx
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={pageVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="mt-[57px] proper-container-classes"
      >
        <div className="prose">
          <h1>Wydarzenia</h1>
        </div>
        <AnimatePresence mode="wait">
          <div className="mt-[50px]">
            <AnimatePresence mode="wait">
              {chosenEvents.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-base-bold text-skin-base"
                >
                  Niestety, nie ma wydarzeń dla wybranych przez Ciebie
                  kategorii.
                </motion.div>
              ) : null}
            </AnimatePresence>
            <AnimatePresence mode="wait">
              {chosenEvents.length !== 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {chosenEvents.map((event, index) => {
                    const isLastActivityToDisplay =
                      chosenEvents.length === index + 1;

                    return (
                      <AnimatePresence mode="wait" key={event.id}>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="w-full "
                        >
                          <div className="w-full">
                            <div className="prose">
                              <h2 className="-mt-[1px]">
                                <SliderDateText date={event.eventStartDate} />
                              </h2>
                            </div>

                            <div
                              className={clsx(
                                'font-large-bold ml-12 -mt-[13px] text-skin-base',
                                getCurrentDevice() === 'MOBILE'
                                  ? 'pt-[20px]'
                                  : ''
                              )}
                            >
                              <div className="prose mt-[13px] w-full">
                                <h4>{event.title}</h4>
                              </div>

                              <div className="font-base-regular mt-[7px]">
                                {event.shortDescription}
                              </div>

                              <div className="font-base-regular mt-[7px]">
                                {createListingOfAllPlacesSeparatedWithCommas(
                                  event.places
                                )}
                              </div>
                              <div
                                className={clsx(
                                  'mt-[21px]',
                                  isLastActivityToDisplay
                                    ? 'mb-[60px]'
                                    : 'mb-[59px]'
                                )}
                              >
                                <CustomLink
                                  url={`events/${event.id}`}
                                  descriptionText={`${event.title}`}
                                  visibleText="więcej..."
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    );
                  })}
                  {/*  <AnimatePresence mode="wait" key={day}>
                        {activitiesForToday.length !== 0 ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <div className="prose">
                              <h2>{`${getPolishDayName(day as Day)}:`}</h2>
                              {activitiesForToday.map((activity, index) => {
                                // console.log(activity.occurrence);

                                const todaysInfoAsArray =
                                  activity.occurrence.filter(
                                    (item) => item.day === day
                                  );
                                const todaysInfo = todaysInfoAsArray[0];

                                const isLastActivityToDisplay =
                                  activitiesForToday.length === index + 1;

                                return (
                                  <AnimatePresence mode="wait" key={day}>
                                    <motion.div
                                      initial={{ opacity: 0, x: 50 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      exit={{ opacity: 0, x: 50 }}
                                      key={activity.id}
                                    >
                                      <div className="font-large-bold ml-12 pt-[1px] text-skin-base">
                                        {createBetweenHoursText(
                                          todaysInfo.activityStart,
                                          todaysInfo.activityEnd
                                        )}
                                      </div>
                                      <div className="ml-[80px]">
                                        <div className="prose mt-[13px]">
                                          <h4>{activity.name}</h4>
                                        </div>
                                        <div className="font-base-regular mt-[7px]">
                                          {activity.shortDescription}
                                        </div>
                                        <div className="font-base-regular mt-[7px]">
                                          {getPolishPlaceName(activity.place)}
                                        </div>
                                        <div
                                          className={clsx(
                                            'mt-[21px]',
                                            isLastActivityToDisplay
                                              ? 'mb-[60px]'
                                              : 'mb-[44px]'
                                          )}
                                        >
                                          <CustomLink
                                            url={
                                              activity.customLinkToDetails
                                                ? activity.customLinkToDetails
                                                : `activities/${activity.id}`
                                            }
                                            descriptionText={`${activity.name}`}
                                            visibleText="więcej..."
                                          />
                                        </div>
                                      </div>
                                    </motion.div>
                                  </AnimatePresence>
                                );
                              })}
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    );
                  })} */}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
