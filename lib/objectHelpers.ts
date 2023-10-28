import { TImageCyclicalActivityAllOptional } from '@/types';
import { isArray, isEqual, isObject, transform } from 'lodash';

/**
 * Find difference between two objects
 * @param  {object} origObj - Source object to compare newObj against
 * @param  {object} newObj  - New object with potential changes
 * @return {object} differences
 */
export function getDifferencesBetweenTwoObjects(origObj: any, newObj: any) {
  function changes(newObj: any, origObj: any) {
    let arrayIndexCounter = 0;
    return transform(newObj, function (result: any, value, key) {
      if (!isEqual(value, origObj[key])) {
        let resultKey = isArray(origObj) ? arrayIndexCounter++ : key;
        result[resultKey] =
          isObject(value) && isObject(origObj[key])
            ? changes(value, origObj[key])
            : value;
      }
    });
  }
  return changes(newObj, origObj);
}

//if array of differences has only empty objects && arrays lengths are the same - nothing happens
// const isDifferenceObjectFilledWithAnything =
//   getIfImagesShouldBeProcessedFurther(
//     differencesImages as TImageCyclicalActivityAllOptional[]
//   );
// const areArraysLengthTheSame = originalImages.length === changedImages.length;
// const isImagesToBeProcessedFurther: boolean =
//   isDifferenceObjectFilledWithAnything || !areArraysLengthTheSame;
export function getIfImagesShouldBeProcessedFurther(
  originalImages: TImageCyclicalActivityAllOptional[],
  changedImages: TImageCyclicalActivityAllOptional[],
  differencesImages: TImageCyclicalActivityAllOptional[]
): boolean {
  if (originalImages.length !== changedImages.length) {
    return true;
  }

  if (!differencesImages.length) {
    return false;
  }

  let hasProperty = false;
  differencesImages.forEach((differenceObject) => {
    for (let key in differenceObject) {
      console.log(key);
      hasProperty = true;
    }
  });

  return hasProperty;
}

// function isObjectEmpty(object: Object) {
//   for (let key in object) {
//     // if (object.hasOwnProperty(key)) {
//     if (Object.prototype.isPrototypeOf.call(object, key)) {
//       return false;
//     }
//   }
//   return true;
// }
