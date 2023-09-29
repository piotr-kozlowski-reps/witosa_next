import { describe, expect, it } from 'vitest';
import { getMonthAlwaysInTwoDigits } from './dateHelpers';

describe('getMonthAlwaysInTwoDigits()', () => {
  it('should return month in two digits format when month number is greater than 10', () => {
    const date = new Date('2022-11-15');
    expect(getMonthAlwaysInTwoDigits(date)).toEqual('11');
  });

  it('should return month in two digits format when month number is equal to 10', () => {
    const date = new Date('2022-10-15');
    expect(getMonthAlwaysInTwoDigits(date)).toBe('10');
  });

  it('should return month in two digits format when month number is less than 10', () => {
    const date = new Date('2022-09-15');
    expect(getMonthAlwaysInTwoDigits(date)).toBe('09');
  });

  it('should return month in two digits format when month number is 0', () => {
    const date = new Date('2022-01-15');
    expect(getMonthAlwaysInTwoDigits(date)).toBe('01');
  });

  it('should return month in two digits format when month number is 11', () => {
    const date = new Date('2022-12-15');
    expect(getMonthAlwaysInTwoDigits(date)).toBe('12');
  });

  // it('should return month in two digits format when input date is null', () => {
  //   const date = null;
  //   expect(getMonthAlwaysInTwoDigits(date)).toBe(null);
  // });
});
