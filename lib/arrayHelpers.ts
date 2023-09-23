import { TWhatTypeIsProvidedEnum } from '@/types';

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

export function getWhatTypeIsProvidedEnum(
  providedEnum: any[]
): TWhatTypeIsProvidedEnum {
  if (
    providedEnum.includes('PLASTICITY') &&
    providedEnum.includes('THEATER') &&
    providedEnum.includes('RECREATION')
  ) {
    return 'IT_IS_ACTIVITY_TYPE';
  }

  if (
    providedEnum.includes('FESTIVAL') &&
    providedEnum.includes('SPECTACLE') &&
    providedEnum.includes('WORKSHOP')
  ) {
    return 'IT_IS_EVENT_TYPE';
  }

  if (providedEnum.includes('CHILDREN') && providedEnum.includes('WOMEN')) {
    return 'IT_IS_FOR_WHOM_TYPE';
  }

  if (
    providedEnum.includes('DANCING_ROOM') &&
    providedEnum.includes('ART_ROOM')
  ) {
    return 'IT_IS_PLACE_TYPE';
  }

  throw new Error(
    `getWhatTypeIsProvidedEnum - provided Enum doesn't fit desired criteria.`
  );
}
