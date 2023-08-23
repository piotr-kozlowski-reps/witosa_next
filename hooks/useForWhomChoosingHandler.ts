import { checkIfArrayContainTheSameValues } from '@/lib/arrayHelpers';
import { ActivityForWhom } from '@prisma/client';
import { useState } from 'react';

export function useForWhomChoosingHandler() {
  const [forWhom, setForWhom] = useState<ActivityForWhom[]>(
    Object.values(ActivityForWhom)
  );

  const toggleForWhom = (passedForWhom: ActivityForWhom) => {
    if (forWhom.includes(passedForWhom)) {
      const resultForWhomArray = forWhom.filter(
        (forWhomIterated) => forWhomIterated !== passedForWhom
      );
      setForWhom(resultForWhomArray);
      return;
    }

    const resultForWhomArray = [...forWhom, passedForWhom];
    setForWhom(resultForWhomArray);
  };

  const checkIfAllForWhomAreChosen = () => {
    return checkIfArrayContainTheSameValues(
      forWhom,
      Object.values(ActivityForWhom)
    );
  };

  const checkButtonForWhomState = (passedForWhom: ActivityForWhom) => {
    return forWhom.includes(passedForWhom);
  };

  const selectAllOrNoneForWhoms = () => {
    const isAllForWhomsChosen = checkIfArrayContainTheSameValues(
      forWhom,
      Object.values(ActivityForWhom)
    );

    if (isAllForWhomsChosen) {
      setForWhom([]);
      return;
    }

    setForWhom(Object.values(ActivityForWhom));
  };

  return {
    forWhom,
    toggleForWhom,
    checkIfAllForWhomAreChosen,
    checkButtonForWhomState,
    selectAllOrNoneForWhoms,
  };
}
