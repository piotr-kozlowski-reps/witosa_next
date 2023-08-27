'use client';

import { useNavigationState } from '@/context/navigationState';
import { useAdjustContainerWIdthsAndMargins } from '@/hooks/useAdjustContainerWIdthsAndMargins';
import { pageVariant } from '@/lib/animations/variants';
import { getPolishCategoryName, getPolishForWhomName } from '@/lib/textHelpers';
import { ActivityType, ForWhom } from '@prisma/client';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import CustomButton from '../CustomButton';
import SearchMenuTextButton from '../SearchMenuTextButton';
import PrevIcon from '../icons/PrevIcon';

interface Props {
  toggleCategory: (_category: ActivityType) => void;
  checkButtonCategoryState: (_category: ActivityType) => boolean;
  toggleForWhom: (_passedForWhom: ForWhom) => void;
  checkButtonForWhomState: (_passedForWhom: ForWhom) => boolean;
  checkIfAllCategoriesAreChosen: () => boolean;
  selectAllOrNoneCategories: () => void;
  checkIfAllForWhomAreChosen: () => boolean;
  selectAllOrNoneForWhoms: () => void;
  categoryOfWhatText: string;
}

export default function NavigationCategoriesAndTarget(props: Props) {
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
    categoryOfWhatText,
  } = props;
  const containerProperClasses = useAdjustContainerWIdthsAndMargins();
  const {
    getIsCyclicalActivitiesMenuVisible,
    toggleIsCyclicalActivitiesMenuVisible,
    setIsCyclicalActivitiesMenuToBeVisible,
  } = useNavigationState();

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
        className="w-full bg-skin-main-bg drop-shadow-big"
      >
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1 }}
          exit={{ scale: 1 }}
          className={clsx(
            'flex justify-between pb-[14px]',
            containerProperClasses
          )}
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
          className={containerProperClasses}
        >
          <AnimatePresence mode="wait">
            {getIsCyclicalActivitiesMenuVisible() ? (
              <motion.div
                initial={{ scaleY: 0, y: -50, opacity: 0 }}
                animate={{ scaleY: 1, y: 0, opacity: 1 }}
                exit={{ scaleY: 0, y: -50, opacity: 0 }}
                className="min-h-[274px] pb-8 origin-top"
              >
                <div className="">
                  <div className="font-base-bold pt-[10px]">
                    {`${categoryOfWhatText}:`}
                  </div>
                  <div className="flex items-center justify-start gap-4 mt-[11px] flex-wrap">
                    <CustomButton
                      text={
                        checkIfAllCategoriesAreChosen()
                          ? 'ODZNACZ WSZYTSKIE'
                          : 'ZAZNACZ WSZYSTKIE'
                      }
                      descriptionText={
                        checkIfAllCategoriesAreChosen()
                          ? 'ODZNACZ WSZYTSKIE KATEGORIE'
                          : 'ZAZNACZ WSZYSTKIE KATEGORIE'
                      }
                      disabled={false}
                      outlined={true}
                      actionFn={selectAllOrNoneCategories}
                    />

                    <div className="-mx-0 separator-vertical"></div>

                    <CustomButton
                      text={getPolishCategoryName('DANCE')}
                      descriptionText={getPolishCategoryName('DANCE')}
                      disabled={false}
                      outlined={
                        checkButtonCategoryState('DANCE') ? false : true
                      }
                      actionFn={() => toggleCategory('DANCE')}
                    />

                    <CustomButton
                      text={getPolishCategoryName('PLASTICITY')}
                      descriptionText={getPolishCategoryName('PLASTICITY')}
                      disabled={false}
                      outlined={
                        checkButtonCategoryState('PLASTICITY') ? false : true
                      }
                      actionFn={() => toggleCategory('PLASTICITY')}
                    />

                    <CustomButton
                      text={getPolishCategoryName('MULTIMEDIA')}
                      descriptionText={getPolishCategoryName('MULTIMEDIA')}
                      disabled={false}
                      outlined={
                        checkButtonCategoryState('MULTIMEDIA') ? false : true
                      }
                      actionFn={() => toggleCategory('MULTIMEDIA')}
                    />

                    <CustomButton
                      text={getPolishCategoryName('THEATER')}
                      descriptionText={getPolishCategoryName('THEATER')}
                      disabled={false}
                      outlined={
                        checkButtonCategoryState('THEATER') ? false : true
                      }
                      actionFn={() => toggleCategory('THEATER')}
                    />

                    <CustomButton
                      text={getPolishCategoryName('MUSIC')}
                      descriptionText={getPolishCategoryName('MUSIC')}
                      disabled={false}
                      outlined={
                        checkButtonCategoryState('MUSIC') ? false : true
                      }
                      actionFn={() => toggleCategory('MUSIC')}
                    />

                    <CustomButton
                      text={getPolishCategoryName('EDUCATION')}
                      descriptionText={getPolishCategoryName('EDUCATION')}
                      disabled={false}
                      outlined={
                        checkButtonCategoryState('EDUCATION') ? false : true
                      }
                      actionFn={() => toggleCategory('EDUCATION')}
                    />

                    <CustomButton
                      text={getPolishCategoryName('RECREATION')}
                      descriptionText={getPolishCategoryName('RECREATION')}
                      disabled={false}
                      outlined={
                        checkButtonCategoryState('RECREATION') ? false : true
                      }
                      actionFn={() => toggleCategory('RECREATION')}
                    />

                    <CustomButton
                      text={getPolishCategoryName('OTHERS')}
                      descriptionText={getPolishCategoryName('OTHERS')}
                      disabled={false}
                      outlined={
                        checkButtonCategoryState('OTHERS') ? false : true
                      }
                      actionFn={() => toggleCategory('OTHERS')}
                    />
                  </div>
                </div>
                <div className="mt-[44px]">
                  <div className="font-base-bold">Dla kogo:</div>
                  <div className="flex items-center justify-start gap-4 mt-[11px] flex-wrap">
                    <CustomButton
                      text={
                        checkIfAllForWhomAreChosen()
                          ? 'ODZNACZ WSZYTSKIE'
                          : 'ZAZNACZ WSZYSTKIE'
                      }
                      descriptionText={
                        checkIfAllForWhomAreChosen()
                          ? 'Odznacz wszytskie opcje dla kogo.'
                          : 'Zaznacz wszytskie opcje dla kogo.'
                      }
                      disabled={false}
                      outlined={true}
                      actionFn={selectAllOrNoneForWhoms}
                    />

                    <div className="-mx-0 separator-vertical"></div>

                    <CustomButton
                      text={getPolishForWhomName('CHILDREN')}
                      descriptionText={getPolishForWhomName('CHILDREN')}
                      disabled={false}
                      outlined={
                        checkButtonForWhomState('CHILDREN') ? false : true
                      }
                      actionFn={() => toggleForWhom('CHILDREN')}
                    />

                    <CustomButton
                      text={getPolishForWhomName('TEENS')}
                      descriptionText={getPolishForWhomName('TEENS')}
                      disabled={false}
                      outlined={checkButtonForWhomState('TEENS') ? false : true}
                      actionFn={() => toggleForWhom('TEENS')}
                    />

                    <CustomButton
                      text={getPolishForWhomName('ADULTS')}
                      descriptionText={getPolishForWhomName('ADULTS')}
                      disabled={false}
                      outlined={
                        checkButtonForWhomState('ADULTS') ? false : true
                      }
                      actionFn={() => toggleForWhom('ADULTS')}
                    />

                    <CustomButton
                      text={getPolishForWhomName('SENIORS')}
                      descriptionText={getPolishForWhomName('SENIORS')}
                      disabled={false}
                      outlined={
                        checkButtonForWhomState('SENIORS') ? false : true
                      }
                      actionFn={() => toggleForWhom('SENIORS')}
                    />

                    <CustomButton
                      text={getPolishForWhomName('WOMEN')}
                      descriptionText={getPolishForWhomName('WOMEN')}
                      disabled={false}
                      outlined={checkButtonForWhomState('WOMEN') ? false : true}
                      actionFn={() => toggleForWhom('WOMEN')}
                    />
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
