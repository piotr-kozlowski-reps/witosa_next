import { checkIfArrayContainTheSameValues } from '@/lib/arrayHelpers';
import { ActivityType } from '@prisma/client';
import { useState } from 'react';

export function useActivitiesCategoriesChoosingHandler() {
  const [categories, setCategories] = useState<ActivityType[]>(
    Object.values(ActivityType)
  );

  /* toggles occurrence of chosen category in "categories" Array */
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

  /* checks occurrence of chosen category in "categories" Array */
  const checkButtonCategoryState = (category: ActivityType) => {
    return categories.includes(category);
  };

  const checkIfAllCategoriesAreChosen = () => {
    return checkIfArrayContainTheSameValues(
      categories,
      Object.values(ActivityType)
    );
  };

  const selectAllOrNoneCategories = () => {
    const isAllCategoriesChosen = checkIfArrayContainTheSameValues(
      categories,
      Object.values(ActivityType)
    );

    if (isAllCategoriesChosen) {
      setCategories([]);
      return;
    }

    setCategories(Object.values(ActivityType));
  };

  return {
    categories,
    toggleCategory,
    checkButtonCategoryState,
    checkIfAllCategoriesAreChosen,
    selectAllOrNoneCategories,
  };
}
