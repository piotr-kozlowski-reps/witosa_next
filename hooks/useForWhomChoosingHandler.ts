import { checkIfArrayContainTheSameValues } from '@/lib/arrayHelpers';
import { ForWhom } from '@prisma/client';
import { useState } from 'react';

export function useForWhomChoosingHandler() {
  const [forWhom, setForWhom] = useState<ForWhom[]>(Object.values(ForWhom));

  const toggleForWhom = (passedForWhom: ForWhom) => {
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
    return checkIfArrayContainTheSameValues(forWhom, Object.values(ForWhom));
  };

  const checkButtonForWhomState = (passedForWhom: ForWhom) => {
    return forWhom.includes(passedForWhom);
  };

  const selectAllOrNoneForWhoms = () => {
    const isAllForWhomsChosen = checkIfArrayContainTheSameValues(
      forWhom,
      Object.values(ForWhom)
    );

    if (isAllForWhomsChosen) {
      setForWhom([]);
      return;
    }

    setForWhom(Object.values(ForWhom));
  };

  return {
    forWhom,
    toggleForWhom,
    checkIfAllForWhomAreChosen,
    checkButtonForWhomState,
    selectAllOrNoneForWhoms,
  };
}
