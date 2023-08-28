import { checkIfArrayContainTheSameValues } from '@/lib/arrayHelpers';
import { EventType } from '@prisma/client';
import { useState } from 'react';

export function useEventsCategoriesChoosingHandler() {
  const [categories, setCategories] = useState<EventType[]>(
    Object.values(EventType)
  );

  /* toggles occurrence of chosen category in "categories" Array */
  const toggleCategory = (category: EventType) => {
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
  const checkButtonCategoryState = (category: EventType) => {
    return categories.includes(category);
  };

  const checkIfAllCategoriesAreChosen = () => {
    return checkIfArrayContainTheSameValues(
      categories,
      Object.values(EventType)
    );
  };

  const selectAllOrNoneCategories = () => {
    const isAllCategoriesChosen = checkIfArrayContainTheSameValues(
      categories,
      Object.values(EventType)
    );

    if (isAllCategoriesChosen) {
      setCategories([]);
      return;
    }

    setCategories(Object.values(EventType));
  };

  return {
    categories,
    toggleCategory,
    checkButtonCategoryState,
    checkIfAllCategoriesAreChosen,
    selectAllOrNoneCategories,
  };
}
