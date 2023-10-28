import { TImageCyclicalActivityAllOptional } from '@/types';
import { describe, expect, it } from 'vitest';
import { getIfImagesShouldBeProcessedFurther } from './objectHelpers';

describe('getIfImagesShouldBeProcessedFurther()', () => {
  it('should return false when differencesImages array is empty', () => {
    const differencesImages: TImageCyclicalActivityAllOptional[] = [];
    expect(getIfImagesShouldBeProcessedFurther([], [], differencesImages)).toBe(
      false
    );
  });

  it('should return false when differencesImages array has only empty objects', () => {
    const differencesImages: TImageCyclicalActivityAllOptional[] = [{}, {}];
    expect(getIfImagesShouldBeProcessedFurther([], [], differencesImages)).toBe(
      false
    );
  });

  it('should return true when any of objects has any property ', () => {
    const differencesImages: TImageCyclicalActivityAllOptional[] = [
      { url: '', alt: '' },
      { url: '', alt: '' },
      { url: '', alt: '' },
    ];
    const result = getIfImagesShouldBeProcessedFurther(
      [],
      [],
      differencesImages
    );
    expect(result).toBe(true);
  });

  it('should return true when arrays of original images and changes images has different length', () => {
    const differencesImages: TImageCyclicalActivityAllOptional[] = [{}, {}];
    expect(
      getIfImagesShouldBeProcessedFurther([{}, {}], [{}], differencesImages)
    ).toBe(true);
  });

  it('should return false when arrays of original images and changes images has the same length', () => {
    const differencesImages: TImageCyclicalActivityAllOptional[] = [{}, {}];
    expect(
      getIfImagesShouldBeProcessedFurther([{}, {}], [{}, {}], differencesImages)
    ).toBe(false);
  });
});
