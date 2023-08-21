'use client';

import { Fragment, useState } from 'react';

import { CyclicalActivityTemporary } from '@/types';
import { ActivityForWhom, ActivityType } from '@prisma/client';
import NavigationCategoriesAndTarget from '../../components/navigation/NavigationCategoriesAndTarget';
import CyclicalActivitiesList from './CyclicalActivitiesList';

interface Props {
  cyclicalActivities: CyclicalActivityTemporary[];
}

export default function CyclicalActivitiesContent(props: Props) {
  ////vars
  const { cyclicalActivities } = props;

  const [categories, setCategories] = useState<ActivityType[]>(
    Object.values(ActivityType)
  );
  const [forWhom, _setForWhom] = useState<ActivityForWhom[]>(
    Object.values(ActivityForWhom)
  );
  const [chosenCyclicalActivities, _setChosenCyclicalActivities] = useState<
    CyclicalActivityTemporary[]
  >([]);

  // console.log('state categories: ', categories);
  console.log('state forWhom: ', forWhom);

  ////utils
  const toggleCategory = (category: ActivityType) => {
    if (categories.includes(category)) {
      const resultCategoryArray = categories.filter((categoryIterated) => {
        return categoryIterated !== category;
      });
      setCategories(resultCategoryArray);
      return;
    }
    const resultCategoryArray = [...categories, category];
    setCategories(resultCategoryArray);
  };

  const toggleForWhom = (_passedForWhom: ActivityForWhom) => {};

  ////tsx
  return (
    <Fragment>
      <NavigationCategoriesAndTarget toggleCategory={toggleCategory} />
      <CyclicalActivitiesList cyclicalActivities={chosenCyclicalActivities} />
    </Fragment>
  );
}
