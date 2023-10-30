import { describe, expect, it } from 'vitest';
import {
  createBetweenHoursText,
  createDateInFormat_DateSeparatorFullDayNameSeparatorTime,
  createEmailsListInOneLineInSquareBrackets,
  createListingOfAllPlacesSeparatedWithCommas,
  getCorrectTwoDigitsMonthNumber,
  getHoursAndMinutesWithGInFrontFromDateObject,
  getPolishDayFromDateObject,
  getPolishEventTypeName,
  getPolishUserRoleName,
  getTwoDigitHours,
  getTwoDigitMinutes,
} from './textHelpers';

describe('getTwoDigitMinutes()', () => {
  it('returns 00', () => {
    expect(getTwoDigitMinutes(new Date('2023-08-10T11:00:24.968Z'))).toEqual(
      '00'
    );
  });
  it('returns 09', () => {
    expect(getTwoDigitMinutes(new Date('2023-08-10T11:09:24.968Z'))).toEqual(
      '09'
    );
  });
  it('returns 10', () => {
    expect(getTwoDigitMinutes(new Date('2023-08-10T11:10:24.968Z'))).toEqual(
      '10'
    );
  });
  it('returns 59', () => {
    expect(getTwoDigitMinutes(new Date('2023-08-10T11:59:24.968Z'))).toEqual(
      '59'
    );
  });
});

describe('getTwoDigitHours()', () => {
  it('returns 00', () => {
    expect(getTwoDigitHours(new Date('2023-08-10T00:00:24.968Z'))).toEqual(
      '00'
    );
  });
  it('returns 09', () => {
    expect(getTwoDigitHours(new Date('2023-08-10T09:00:24.968Z'))).toEqual(
      '09'
    );
  });
  it('returns 12', () => {
    expect(getTwoDigitHours(new Date('2023-08-10T12:00:24.968Z'))).toEqual(
      '12'
    );
  });
  it('returns 23', () => {
    expect(getTwoDigitHours(new Date('2023-08-10T23:00:24.968Z'))).toEqual(
      '23'
    );
  });
});

describe('createBetweenHoursText()', () => {
  it('returns 17:45-19:45', () => {
    expect(
      createBetweenHoursText(
        new Date('2000-01-01T17:45:00.968Z'),
        new Date('2000-01-01T19:45:00.968Z')
      )
    ).toEqual('17:45-19:45');
  });
  it('returns 16:00-17:30', () => {
    expect(
      createBetweenHoursText(
        new Date('2000-01-01T16:00:00.968Z'),
        new Date('2000-01-01T17:30:00.968Z')
      )
    ).toEqual('16:00-17:30');
  });
  it('returns 17:00-20:00', () => {
    expect(
      createBetweenHoursText(
        new Date('2000-01-01T17:00:00.968Z'),
        new Date('2000-01-01T20:00:00.968Z')
      )
    ).toEqual('17:00-20:00');
  });
});

describe('getCorrectTwoDigitsMonthNumber()', () => {
  it('returns 01', () => {
    expect(
      getCorrectTwoDigitsMonthNumber(new Date('2000-01-01T17:45:00.968Z'))
    ).toEqual('01');
  });

  it('returns 12', () => {
    expect(
      getCorrectTwoDigitsMonthNumber(new Date('2000-12-01T17:45:00.968Z'))
    ).toEqual('12');
  });

  it('returns 05', () => {
    expect(
      getCorrectTwoDigitsMonthNumber(new Date('2000-05-01T17:45:00.968Z'))
    ).toEqual('05');
  });
});

describe('getPolishDayFromDateObject()', () => {
  it('returns poniedziałek', () => {
    expect(
      getPolishDayFromDateObject(new Date('2023-08-21T17:45:00.968Z'))
    ).toEqual('poniedziałek');
  });
  it('returns wtorek', () => {
    expect(
      getPolishDayFromDateObject(new Date('2023-08-22T17:45:00.968Z'))
    ).toEqual('wtorek');
  });
  it('returns środę', () => {
    expect(
      getPolishDayFromDateObject(new Date('2023-08-23T17:45:00.968Z'))
    ).toEqual('środa');
  });
  it('returns czawartek', () => {
    expect(
      getPolishDayFromDateObject(new Date('2023-08-24T17:45:00.968Z'))
    ).toEqual('czwartek');
  });
  it('returns piątek', () => {
    expect(
      getPolishDayFromDateObject(new Date('2023-08-25T17:45:00.968Z'))
    ).toEqual('piątek');
  });
  it('returns sobotę', () => {
    expect(
      getPolishDayFromDateObject(new Date('2023-08-26T17:45:00.968Z'))
    ).toEqual('sobota');
  });
  it('returns niedzielę', () => {
    expect(
      getPolishDayFromDateObject(new Date('2023-08-27T17:45:00.968Z'))
    ).toEqual('niedziela');
  });
  it('returns poniedziałek', () => {
    expect(
      getPolishDayFromDateObject(new Date('2023-08-28T17:45:00.968Z'))
    ).toEqual('poniedziałek');
  });
});

describe('getHoursAndMinutesWithGInFrontFromDateObject()', () => {
  it('returns g. 17:45', () => {
    expect(
      getHoursAndMinutesWithGInFrontFromDateObject(
        new Date('2023-08-21T17:45:00.968Z')
      )
    ).toEqual('g. 17:45');
  });

  it('returns g. 00:15', () => {
    expect(
      getHoursAndMinutesWithGInFrontFromDateObject(
        new Date('2023-08-21T00:15:00.968Z')
      )
    ).toEqual('g. 00:15');
  });

  it('returns g. 02:08', () => {
    expect(
      getHoursAndMinutesWithGInFrontFromDateObject(
        new Date('2023-08-21T02:08:00.968Z')
      )
    ).toEqual('g. 02:08');
  });

  it('returns g. 23:59', () => {
    expect(
      getHoursAndMinutesWithGInFrontFromDateObject(
        new Date('2023-08-21T23:59:00.968Z')
      )
    ).toEqual('g. 23:59');
  });
});

describe('getPolishTypeName()', () => {
  it('returns kabaret', () => {
    expect(getPolishEventTypeName('CABARET')).toEqual('kabaret');
  });

  it('returns koncert', () => {
    expect(getPolishEventTypeName('CONCERT')).toEqual('koncert');
  });
  it('returns spotkania cykliczne', () => {
    expect(getPolishEventTypeName('CYCLIC_MEETING')).toEqual(
      'spotkania cykliczne'
    );
  });
  it('returns festiwal', () => {
    expect(getPolishEventTypeName('FESTIVAL')).toEqual('festiwal');
  });
  it('returns wykłady', () => {
    expect(getPolishEventTypeName('LECTURE')).toEqual('wykłady');
  });
  it('returns inne', () => {
    expect(getPolishEventTypeName('OTHERS')).toEqual('inne');
  });
  it('returns spektakl', () => {
    expect(getPolishEventTypeName('SPECTACLE')).toEqual('spektakl');
  });
  it('returns warsztaty', () => {
    expect(getPolishEventTypeName('WORKSHOP')).toEqual('warsztaty');
  });
});

describe('createListingOfAllPlacesSeparatedWithCommas()', () => {
  it('returns only one place with no comma in the end', () => {
    expect(createListingOfAllPlacesSeparatedWithCommas(['ART_ROOM'])).toEqual(
      'sala plastyczna'
    );
  });

  it('returns 2 places with no comma in the end', () => {
    expect(
      createListingOfAllPlacesSeparatedWithCommas(['ART_ROOM', 'CONCERT_HALL'])
    ).toEqual('sala plastyczna, sala koncertowa');
  });

  it('returns all places with no comma in the end', () => {
    expect(
      createListingOfAllPlacesSeparatedWithCommas([
        'ART_ROOM',
        'CONCERT_HALL',
        'DANCING_ROOM',
      ])
    ).toEqual('sala plastyczna, sala koncertowa, sala taneczna');
  });
});

describe('createDateInFormat_DateSeparatorFullDayNameSeparatorTime()', () => {
  it('returns only one place with no comma in the end', () => {
    expect(
      createDateInFormat_DateSeparatorFullDayNameSeparatorTime(
        new Date('2023-08-29T10:45:00.968Z')
      )
    ).toEqual('29.08.2023 | wtorek | g. 10:45');
  });
});

describe('createEmailsListInOneLineInSquareBrackets()', () => {
  it('returns only one place with no comma in the end', () => {
    expect(
      createEmailsListInOneLineInSquareBrackets([
        'test@test.pl',
        'test2@test.pl',
      ])
    ).toEqual(`test@test.pl, test2@test.pl`);
  });
});

describe('getPolishUserRoleName', () => {
  // Should return 'Administrator' when userRole is 'ADMIN'
  it('should return "Administrator" when userRole is "ADMIN"', () => {
    const result = getPolishUserRoleName('ADMIN');
    expect(result).toBe('Administrator');
  });

  // Should return 'Edytor' when userRole is 'EDITOR'
  it("should return 'Edytor' when userRole is 'EDITOR'", () => {
    const result = getPolishUserRoleName('EDITOR');
    expect(result).toBe('Edytor');
  });

  // Should throw an error when userRole is null
  it('should throw an error when userRole is null', () => {
    expect(() => {
      getPolishUserRoleName(null!);
    }).toThrowError('getPolishUserRoleName not defined');
  });

  // Should throw an error when userRole is undefined
  it('should throw an error when userRole is undefined', () => {
    expect(() => {
      getPolishUserRoleName(undefined!);
    }).toThrowError('getPolishUserRoleName not defined');
  });
});

// describe('generateFileName()', () => {
//   beforeEach(() => {
//     // tell vitest we use mocked time
//     vi.useFakeTimers();
//     vi.mock('generateQuickGuid', () => {
//       return '710o6pvxd7vva9tx04gnj';
//     });
//   });

//   afterEach(() => {
//     // restoring date after each test run
//     vi.useRealTimers();
//   });

//   it('', () => {
//     const date = new Date('2023-10-02');
//     vi.setSystemTime(date);
//     const result = generateFileName();
//     expect(result).toBe('2023_10_02__');
//   });
// });
