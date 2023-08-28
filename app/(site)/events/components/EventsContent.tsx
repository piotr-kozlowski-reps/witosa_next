'use client';

import { useChosenEventsHandler } from '@/hooks/useChosenEventsHandler';
import { useEventsCategoriesChoosingHandler } from '@/hooks/useEventsCategoriesChoosingHandler';
import { useForWhomChoosingHandler } from '@/hooks/useForWhomChoosingHandler';
import { TEventTemporary } from '@/types';
import { Fragment } from 'react';
import NavigationCategoriesAndTargetsForEvents from '../../components/navigation/NavigationCategoriesAndTargetsForEvents';
import EventsList from './EventsList';

interface Props {
  events: TEventTemporary[];
}

export default function EventsContent(props: Props) {
  ////vars
  const { events } = props;

  const {
    categories,
    checkIfAllCategoriesAreChosen,
    selectAllOrNoneCategories,
    checkButtonCategoryState,
    toggleCategory,
  } = useEventsCategoriesChoosingHandler();

  const {
    forWhom,
    toggleForWhom,
    checkButtonForWhomState,
    checkIfAllForWhomAreChosen,
    selectAllOrNoneForWhoms,
  } = useForWhomChoosingHandler();

  const chosenEvents = useChosenEventsHandler(events, categories, forWhom);

  ////tsx
  return (
    <Fragment>
      <NavigationCategoriesAndTargetsForEvents
        toggleForWhom={toggleForWhom}
        checkButtonForWhomState={checkButtonForWhomState}
        checkIfAllForWhomAreChosen={checkIfAllForWhomAreChosen}
        selectAllOrNoneForWhoms={selectAllOrNoneForWhoms}
        checkIfAllCategoriesAreChosen={checkIfAllCategoriesAreChosen}
        selectAllOrNoneCategories={selectAllOrNoneCategories}
        checkButtonCategoryState={checkButtonCategoryState}
        toggleCategory={toggleCategory}
      />
      <EventsList chosenEvents={chosenEvents} />
    </Fragment>
  );
}
