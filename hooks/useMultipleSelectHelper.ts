import { FormikProps } from 'formik';
import { useEffect, useState } from 'react';

export function useMultipleSelectHelper<T, R>(
  formik: FormikProps<R>,
  name: string
) {
  ////vars
  const [chosenItemsInArray, setChosenItemsInArray] = useState<T[]>(
    formik.getFieldProps(name).value
  );

  console.log(formik.getFieldProps(name).value);

  ////utils
  const toggleItemsInArray = (itemInArray: T) => {
    if (chosenItemsInArray.includes(itemInArray)) {
      const resultItemsArray = chosenItemsInArray.filter((item) => {
        return item !== itemInArray;
      });
      setChosenItemsInArray(resultItemsArray);
      return;
    }
    const resultItemsArray = [...chosenItemsInArray, itemInArray];
    setChosenItemsInArray(resultItemsArray);
  };

  function isItemChosen(item: T) {
    return chosenItemsInArray.includes(item);
  }

  useEffect(() => {
    formik.setFieldValue(name, chosenItemsInArray);

    const isFieldTouched = formik.getFieldMeta(name).touched;
    const isAnyChosenItem = chosenItemsInArray.length > 0;

    if (!isFieldTouched && isAnyChosenItem) {
      formik.setFieldTouched(name);
      formik.setFieldValue(name, chosenItemsInArray);
    }
  }, [chosenItemsInArray]);

  return { chosenItemsInArray, toggleItemsInArray, isItemChosen };
}
