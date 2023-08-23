export function checkIfArrayContainTheSameValues<T>(
  array1: Array<T>,
  array2: Array<T>
) {
  const comparedArray1 = Array.isArray(array1) ? array1 : [];
  const comparedArray2 = Array.isArray(array2) ? array2 : [];

  return (
    comparedArray1.length === comparedArray2.length &&
    comparedArray1.every((el) => comparedArray2.includes(el))
  );
}
