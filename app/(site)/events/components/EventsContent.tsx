'use client';

import { useCategoriesChoosingHandler } from '@/hooks/useCategoriesChoosingHandler';
import { useForWhomChoosingHandler } from '@/hooks/useForWhomChoosingHandler';
import { TEventTemporary } from '@/types';
import { Fragment } from 'react';
import NavigationCategoriesAndTarget from '../../components/navigation/NavigationCategoriesAndTarget';
import EventsList from './EventsList';

interface Props {
  events: TEventTemporary[];
}

export default function EventsContent(props: Props) {
  ////vars
  const { events } = props;
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
        categoryOfWhatText="Kategoria wydarzeń"
      />
      <EventsList
        chosenEvents={events}
        // getCyclicalActivitiesByDayOfTheWeek={
        //   getCyclicalActivitiesByDayOfTheWeek
        // }
      />
    </Fragment>
  );
}
