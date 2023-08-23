'use client';

import { useCategoriesChoosingHandler } from '@/hooks/useCategoriesChoosingHandler';
import { useChosenCyclicalActivitiesHandler } from '@/hooks/useChosenCyclicalActivitiesHandler';
import { useForWhomChoosingHandler } from '@/hooks/useForWhomChoosingHandler';
import { CyclicalActivityTemporary } from '@/types';
import { Day } from '@prisma/client';
import { Fragment } from 'react';
import NavigationCategoriesAndTarget from '../../components/navigation/NavigationCategoriesAndTarget';
import CyclicalActivitiesList from './CyclicalActivitiesList';

interface Props {
  cyclicalActivities: CyclicalActivityTemporary[];
}

export default function CyclicalActivitiesContent(props: Props) {
  ////vars
  const { cyclicalActivities } = props;
  const {
    categories,
    toggleCategory,
    checkButtonCategoryState,
    checkIfAllCategoriesAreChosen,
    selectAllOrNoneCategories,
  } = useCategoriesChoosingHandler();

  const {
    forWhom,
    toggleForWhom,
    checkButtonForWhomState,
    checkIfAllForWhomAreChosen,
    selectAllOrNoneForWhoms,
  } = useForWhomChoosingHandler();

  const chosenCyclicalActivities = useChosenCyclicalActivitiesHandler(
    cyclicalActivities,
    categories,
    forWhom
  );

  const getCyclicalActivitiesByDayOfTheWeek = (day: Day) => {
    const resultCyclicalActivitiesByDay = chosenCyclicalActivities.filter(
      (activity) => activity.occurrence.find((item) => item.day === day)
    );
    return resultCyclicalActivitiesByDay;
  };

  ////tsx
  return (
    <Fragment>
      <NavigationCategoriesAndTarget
        toggleCategory={toggleCategory}
        checkButtonCategoryState={checkButtonCategoryState}
        toggleForWhom={toggleForWhom}
        checkButtonForWhomState={checkButtonForWhomState}
        checkIfAllCategoriesAreChosen={checkIfAllCategoriesAreChosen}
        selectAllOrNoneCategories={selectAllOrNoneCategories}
        checkIfAllForWhomAreChosen={checkIfAllForWhomAreChosen}
        selectAllOrNoneForWhoms={selectAllOrNoneForWhoms}
      />
      <CyclicalActivitiesList
        chosenCyclicalActivities={chosenCyclicalActivities}
        getCyclicalActivitiesByDayOfTheWeek={
          getCyclicalActivitiesByDayOfTheWeek
        }
      />
    </Fragment>
  );
}
