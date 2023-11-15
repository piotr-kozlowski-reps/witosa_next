'use client';

import { useActivitiesCategoriesChoosingHandler } from '@/hooks/useActivitiesCategoriesChoosingHandler';
import { useChosenCyclicalActivitiesHandler } from '@/hooks/useChosenCyclicalActivitiesHandler';
import { useCyclicalActivityResponseHandler } from '@/hooks/useCyclicalActivityResponseHandler';
import { useForWhomChoosingHandler } from '@/hooks/useForWhomChoosingHandler';
import { TGetAllCyclicalActivitiesResponse } from '@/types';
import { Fragment } from 'react';
import NavigationCategoriesAndTargetsForCyclicalActivities from '../../components/navigation/NavigationCategoriesAndTargetsForCyclicalActivities';
import CyclicalActivitiesList from './CyclicalActivitiesList';

interface Props {
  cyclicalActivitiesResponse: TGetAllCyclicalActivitiesResponse;
}

export default function CyclicalActivitiesContent(props: Props) {
  ////vars
  const { cyclicalActivitiesResponse } = props;
  const cyclicalActivities = useCyclicalActivityResponseHandler(
    cyclicalActivitiesResponse
  );

  const {
    categories,
    toggleCategory,
    checkButtonCategoryState,
    checkIfAllCategoriesAreChosen,
    selectAllOrNoneCategories,
  } = useActivitiesCategoriesChoosingHandler();

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

  ////tsx
  return (
    <Fragment>
      <NavigationCategoriesAndTargetsForCyclicalActivities
        toggleCategory={toggleCategory}
        checkButtonCategoryState={checkButtonCategoryState}
        toggleForWhom={toggleForWhom}
        checkButtonForWhomState={checkButtonForWhomState}
        checkIfAllCategoriesAreChosen={checkIfAllCategoriesAreChosen}
        selectAllOrNoneCategories={selectAllOrNoneCategories}
        checkIfAllForWhomAreChosen={checkIfAllForWhomAreChosen}
        selectAllOrNoneForWhoms={selectAllOrNoneForWhoms}
        categoryOfWhatText="Kategoria zajęć"
      />
      <CyclicalActivitiesList
        chosenCyclicalActivities={chosenCyclicalActivities}
      />
    </Fragment>
  );
}
