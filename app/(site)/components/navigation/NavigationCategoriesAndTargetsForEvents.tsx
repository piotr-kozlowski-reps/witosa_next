import { useCyclicalActivitiesState } from '@/context/cyclicalActivityState';
import { pageVariant } from '@/lib/animations/variants';
import { EventType, ForWhom } from '@prisma/client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import SearchMenuTextButton from '../SearchMenuTextButton';
import PrevIcon from '../icons/PrevIcon';
import NavigationEventTypes from './NavigationEventTypes';
import NavigationTargets from './NavigationTargets';

interface Props {
  toggleCategory: (_category: EventType) => void;
  checkButtonCategoryState: (_category: EventType) => boolean;
  toggleForWhom: (_passedForWhom: ForWhom) => void;
  checkButtonForWhomState: (_passedForWhom: ForWhom) => boolean;
  checkIfAllCategoriesAreChosen: () => boolean;
  selectAllOrNoneCategories: () => void;
  checkIfAllForWhomAreChosen: () => boolean;
  selectAllOrNoneForWhoms: () => void;
}

export default function NavigationCategoriesAndTargetsForEvents(props: Props) {
  ////vars
  const {
    toggleCategory,
    checkButtonCategoryState,
    toggleForWhom,
    checkButtonForWhomState,
    checkIfAllCategoriesAreChosen,
    selectAllOrNoneCategories,
    checkIfAllForWhomAreChosen,
    selectAllOrNoneForWhoms,
  } = props;

  const {
    getIsCyclicalActivitiesMenuVisible,
    toggleIsCyclicalActivitiesMenuVisible,
    setIsCyclicalActivitiesMenuToBeVisible,
  } = useCyclicalActivitiesState();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsCyclicalActivitiesMenuToBeVisible();
    }, 400);
    return () => clearTimeout(timeout);
  }, []);

  ////tsx
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={pageVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full bg-skin-main-bg drop-shadow-big z-[-1] relative"
      >
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1 }}
          exit={{ scale: 1 }}
          className="flex justify-between pb-[14px] proper-container-classes"
        >
          <div>
            <SearchMenuTextButton
              buttonName="Co Cię interesuje?"
              idForAriaControls="cyclical-activities-choose-navigation"
              toggleMenuVisibility={toggleIsCyclicalActivitiesMenuVisible}
              isMenuVisible={getIsCyclicalActivitiesMenuVisible()}
            />
          </div>
          <div className="mt-[13px]">
            <PrevIcon
              alt={getIsCyclicalActivitiesMenuVisible() ? 'Zamknij menu ' : ''}
              actionFn={toggleIsCyclicalActivitiesMenuVisible}
              isToBeRotatedToBeVertical={true}
              isDefaultStateOrRotatedState={getIsCyclicalActivitiesMenuVisible()}
            />
          </div>
        </motion.div>

        <div
          id="cyclical-activities-choose-navigation"
          className="proper-container-classes"
        >
          <AnimatePresence mode="wait">
            {getIsCyclicalActivitiesMenuVisible() ? (
              <motion.div
                initial={{ scaleY: 0, y: -50, opacity: 0 }}
                animate={{ scaleY: 1, y: 0, opacity: 1 }}
                exit={{ scaleY: 0, y: -50, opacity: 0 }}
                className="min-h-[274px] pb-8 origin-top"
              >
                <NavigationEventTypes
                  checkIfAllCategoriesAreChosen={checkIfAllCategoriesAreChosen}
                  selectAllOrNoneCategories={selectAllOrNoneCategories}
                  checkButtonCategoryState={checkButtonCategoryState}
                  toggleCategory={toggleCategory}
                />

                <NavigationTargets
                  checkIfAllForWhomAreChosen={checkIfAllForWhomAreChosen}
                  selectAllOrNoneForWhoms={selectAllOrNoneForWhoms}
                  checkButtonForWhomState={checkButtonForWhomState}
                  toggleForWhom={toggleForWhom}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
