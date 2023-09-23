import { describe, expect, it } from 'vitest';
import { getWhatTypeIsProvidedEnum } from './arrayHelpers';

describe('getTwoDigitMinutes()', () => {
  it('should return "IT_IS_ACTIVITY_TYPE" when providedEnum includes "PLASTICITY", "THEATER", and "RECREATION"', () => {
    const providedEnum = ['PLASTICITY', 'THEATER', 'RECREATION'];
    const result = getWhatTypeIsProvidedEnum(providedEnum);
    expect(result).toBe('IT_IS_ACTIVITY_TYPE');
  });

  it('should return "IT_IS_EVENT_TYPE" when providedEnum includes "FESTIVAL", "SPECTACLE", and "WORKSHOP"', () => {
    const providedEnum = ['FESTIVAL', 'SPECTACLE', 'WORKSHOP'];
    const result = getWhatTypeIsProvidedEnum(providedEnum);
    expect(result).toBe('IT_IS_EVENT_TYPE');
  });

  it('should return "IT_IS_FOR_WHOM_TYPE" when providedEnum includes "CHILDREN" and "WOMEN"', () => {
    const providedEnum = ['CHILDREN', 'WOMEN'];
    const result = getWhatTypeIsProvidedEnum(providedEnum);
    expect(result).toBe('IT_IS_FOR_WHOM_TYPE');
  });

  it('should return "IT_IS_PLACE_TYPE" when providedEnum includes "DANCING_ROOM" and "ART_ROOM"', () => {
    const providedEnum = ['DANCING_ROOM', 'ART_ROOM'];
    const result = getWhatTypeIsProvidedEnum(providedEnum);
    expect(result).toBe('IT_IS_PLACE_TYPE');
  });
});
