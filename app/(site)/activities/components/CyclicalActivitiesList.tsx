import { pageVariant } from '@/lib/animations/variants';
import { getCyclicalActivitiesByDayOfTheWeekSortedByDate } from '@/lib/api/cyclicalActivitiesUtils';
import { getPolishDayName } from '@/lib/textHelpers';
import { CyclicalActivityTemporary, TOccurrence } from '@/types';
import { Day } from '@prisma/client';
import { AnimatePresence, motion } from 'framer-motion';
import CyclicalActivityItem from './CyclicalActivityItem';

interface Props {
  chosenCyclicalActivities: CyclicalActivityTemporary[];
}

export default function CyclicalActivitiesList(props: Props) {
  ////vars
  const { chosenCyclicalActivities } = props;

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
                  {Object.keys(Day).map((day, indexInDay) => {
                    const activitiesForToday =
                      getCyclicalActivitiesByDayOfTheWeekSortedByDate(
                        chosenCyclicalActivities,
                        day as Day
                      );

                    return (
                      <AnimatePresence mode="wait" key={`${day}-${indexInDay}`}>
                        {activitiesForToday.length !== 0 ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <div className="prose">
                              <h2>{`${getPolishDayName(day as Day)}:`}</h2>
                              {activitiesForToday.map((activity, index) => {
                                const todaysInfoAsArray: TOccurrence[] =
                                  activity.occurrence.filter(
                                    (item) => item.day === day
                                  );

                                const isLastActivityToDisplay =
                                  activitiesForToday.length === index + 1;

                                return (
                                  <AnimatePresence
                                    mode="wait"
                                    key={`${day}-${indexInDay}-${index}`}
                                  >
                                    {todaysInfoAsArray.map(
                                      (todaysOccurrence, index) => {
                                        return (
                                          <CyclicalActivityItem
                                            key={`${index}`}
                                            occurrence={todaysOccurrence}
                                            name={activity.name}
                                            id={activity.id}
                                            shortDescription={
                                              activity.shortDescription
                                            }
                                            places={activity.places}
                                            isLastActivityToDisplay={
                                              isLastActivityToDisplay
                                            }
                                            customLinkToDetails={
                                              activity.customLinkToDetails
                                            }
                                          />
                                        );
                                      }
                                    )}
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
