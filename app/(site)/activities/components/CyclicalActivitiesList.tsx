import { pageVariant } from '@/lib/animations/variants';
import {
  createBetweenHoursText,
  createListingOfAllPlacesSeparatedWithCommas,
  getPolishDayName,
} from '@/lib/textHelpers';
import { CyclicalActivityTemporary } from '@/types';
import { Day } from '@prisma/client';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import CustomLink from '../../components/CustomLink';

interface Props {
  chosenCyclicalActivities: CyclicalActivityTemporary[];
  getCyclicalActivitiesByDayOfTheWeekSortedByDate: (
    _day: Day
  ) => CyclicalActivityTemporary[];
}

export default function CyclicalActivitiesList(props: Props) {
  ////vars
  const {
    chosenCyclicalActivities,
    getCyclicalActivitiesByDayOfTheWeekSortedByDate,
  } = props;

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
          <h1>Zajęcia stałe</h1>
        </div>
        <AnimatePresence mode="wait">
          <div className="mt-[50px]">
            <AnimatePresence mode="wait">
              {chosenCyclicalActivities.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-base-bold text-skin-base"
                >
                  Niestety, nie ma zajęć dla wybranych przez Ciebie kategorii.
                </motion.div>
              ) : null}
            </AnimatePresence>
            <AnimatePresence mode="wait">
              {chosenCyclicalActivities.length !== 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {Object.keys(Day).map((day) => {
                    const activitiesForToday =
                      getCyclicalActivitiesByDayOfTheWeekSortedByDate(
                        day as Day
                      );

                    return (
                      <AnimatePresence mode="wait" key={day}>
                        {activitiesForToday.length !== 0 ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <div className="prose">
                              <h2>{`${getPolishDayName(day as Day)}:`}</h2>
                              {activitiesForToday.map((activity, index) => {
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
                                          {createListingOfAllPlacesSeparatedWithCommas(
                                            activity.places
                                          )}
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
                  })}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
