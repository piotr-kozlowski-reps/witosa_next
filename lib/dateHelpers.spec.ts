import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getMonthAlwaysInTwoDigits,
  setDateWith_23_59minutes,
  setTodaysDateFromMidnight,
} from './dateHelpers';

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

describe('setTodaysDateFromMidnight()', () => {
  beforeEach(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers();
  });

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers();
  });

  it('should return date 2023-12-12 00:00:00', () => {
    const date = new Date(2023, 11, 12, 14, 52);
    vi.setSystemTime(date);
    expect(setTodaysDateFromMidnight().toISOString()).toEqual(
      '2023-12-12T00:00:00.000Z'
    );
  });

  it('should return date 2025-05-05 00:00:00', () => {
    const date = new Date('2025-05-05T15:55:12.000Z');

    vi.setSystemTime(date);
    expect(setTodaysDateFromMidnight().toISOString()).toEqual(
      '2025-05-05T00:00:00.000Z'
    );
  });
});

describe('setDateWith_23_59minutes()', () => {
  it('should return date 2023-12-12 23:59:00', () => {
    const date = new Date('2023-12-12T00:00:00.000Z');
    expect(setDateWith_23_59minutes(date).toISOString()).toEqual(
      '2023-12-12T23:59:00.000Z'
    );
  });

  it('should return date: 2100-01-01T23:59:00', () => {
    const date = new Date('2100-01-01T12:59:11.000Z');
    expect(setDateWith_23_59minutes(date).toISOString()).toEqual(
      '2100-01-01T23:59:00.000Z'
    );
  });

  // it('should return date 2025-05-05 00:00:00', () => {
  //   const date = new Date('2025-05-05T15:55:12.000Z');

  //   vi.setSystemTime(date);
  //   expect(setTodaysDateFromMidnight().toISOString()).toEqual(
  //     '2025-05-05T00:00:00.000Z'
  //   );
  // });
});
