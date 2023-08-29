import { ActivityType, Day, EventType, ForWhom, Place } from '@prisma/client';

export function getPolishTypeName(type: EventType) {
  let polishTypeName = '';

  switch (type) {
    case 'CONCERT':
      polishTypeName = 'koncert';
      break;

    case 'WORKSHOP':
      polishTypeName = 'warsztaty';
      break;

    case 'LECTURE':
      polishTypeName = 'wykłady';
      break;

    case 'CABARET':
      polishTypeName = 'kabaret';
      break;

    case 'CYCLIC_MEETING':
      polishTypeName = 'spotkania cykliczne';
      break;

    case 'FESTIVAL':
      polishTypeName = 'festiwal';
      break;

    case 'OTHERS':
      polishTypeName = 'inne';
      break;

    case 'SPECTACLE':
      polishTypeName = 'spektakl';
      break;

    default:
      throw new Error('getPolishTypeName not defined');
  }

  return polishTypeName;
}

export function getPolishCategoryOfActivitiesName(category: ActivityType) {
  let polishCategoryName = '';

  switch (category) {
    case 'DANCE':
      polishCategoryName = 'taniec';
      break;

    case 'PLASTICITY':
      polishCategoryName = 'plastyka';
      break;

    case 'MULTIMEDIA':
      polishCategoryName = 'multimedia';
      break;

    case 'THEATER':
      polishCategoryName = 'teatr';
      break;

    case 'MUSIC':
      polishCategoryName = 'muzyka';
      break;

    case 'EDUCATION':
      polishCategoryName = 'edukacja';
      break;

    case 'RECREATION':
      polishCategoryName = 'rekreacja';
      break;

    case 'OTHERS':
      polishCategoryName = 'inne';
      break;

    default:
      throw new Error('getPolishCategoryName not defined');
  }

  return polishCategoryName;
}

export function getPolishCategoryOfEventsName(category: EventType) {
  let polishCategoryName = '';

  switch (category) {
    case 'CABARET':
      polishCategoryName = 'kabaret';
      break;

    case 'CONCERT':
      polishCategoryName = 'koncert';
      break;

    case 'CYCLIC_MEETING':
      polishCategoryName = 'wydarzenia cykliczne';
      break;

    case 'FESTIVAL':
      polishCategoryName = 'festiwal';
      break;

    case 'LECTURE':
      polishCategoryName = 'wykład';
      break;

    case 'SPECTACLE':
      polishCategoryName = 'spektakl';
      break;

    case 'WORKSHOP':
      polishCategoryName = 'warsztaty';
      break;

    case 'OTHERS':
      polishCategoryName = 'inne';
      break;

    default:
      throw new Error(`getPolishCategoryOfEvents - ${category} not defined`);
  }

  return polishCategoryName;
}

export function getPolishForWhomName(forWhom: ForWhom) {
  let polishForWhomName = '';

  switch (forWhom) {
    case 'CHILDREN':
      polishForWhomName = 'dla dzieci';
      break;

    case 'TEENS':
      polishForWhomName = 'dla młodzieży';
      break;

    case 'ADULTS':
      polishForWhomName = 'dla dorosłych';
      break;

    case 'SENIORS':
      polishForWhomName = 'dla seniorów';
      break;

    case 'WOMEN':
      polishForWhomName = 'dla kobiet';
      break;

    default:
      throw new Error('getPolishForWhomName not defined');
  }

  return polishForWhomName;
}
export function createListingOfAllPlacesSeparatedWithCommas(places: Place[]) {
  let resultString = '';

  places.forEach((place, index) => {
    if (index === places.length - 1) {
      resultString += getPolishPlaceName(place);
      return;
    }
    resultString += `${getPolishPlaceName(place)}, `;
  });

  return resultString;
}

//time
export function getPolishDayName(day: Day) {
  let polishDayName = '';

  switch (day) {
    case 'MONDAY':
      polishDayName = 'poniedziałek';
      break;

    case 'TUESDAY':
      polishDayName = 'wtorek';
      break;

    case 'WEDNESDAY':
      polishDayName = 'środa';
      break;

    case 'THURSDAY':
      polishDayName = 'czwartek';
      break;

    case 'FRIDAY':
      polishDayName = 'piątek';
      break;

    case 'SATURDAY':
      polishDayName = 'sobota';
      break;

    case 'SUNDAY':
      polishDayName = 'niedziela';
      break;

    default:
      throw new Error('getPolishDayName not defined');
  }

  return polishDayName;
}
export function getTwoDigitMinutes(date: Date) {
  return date.getMinutes() <= 9
    ? `0${date.getMinutes()}`
    : `${date.getMinutes()}`;
}
export function getTwoDigitHours(date: Date) {
  return date.getUTCHours() <= 9
    ? `0${date.getUTCHours()}`
    : `${date.getUTCHours()}`;
}
export function getCorrectTwoDigitsMonthNumber(date: Date) {
  const month = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];
  return month[date.getMonth()];
}
export function getPolishPlaceName(place: Place) {
  let polishPlaceName = '';

  switch (place) {
    case 'DANCING_ROOM':
      polishPlaceName = 'Sala taneczna';
      break;

    case 'ART_ROOM':
      polishPlaceName = 'Sala plastyczna';
      break;

    case 'CONCERT_HALL':
      polishPlaceName = 'Sala koncertowa';
      break;

    default:
      throw new Error(`getPolishPlaceName not defined: entered ${place}`);
  }

  return polishPlaceName;
}
export function createBetweenHoursText(startDate: Date, endDate: Date) {
  return `${getTwoDigitHours(startDate)}:${getTwoDigitMinutes(
    startDate
  )}-${getTwoDigitHours(endDate)}:${getTwoDigitMinutes(endDate)}`;
}
export function getPolishDayFromDateObject(date: Date) {
  const day = [
    'niedziela',
    'poniedziałek',
    'wtorek',
    'środa',
    'czwartek',
    'piątek',
    'sobota',
  ];
  return day[date.getDay()];
}
export function getHoursAndMinutesWithGInFrontFromDateObject(date: Date) {
  return `g. ${getTwoDigitHours(date)}:${getTwoDigitMinutes(date)}`;
}
export function createDateInFormat_DateSeparatorFullDayNameSeparatorTime(
  date: Date
) {
  return `${date.getDate()}.${getCorrectTwoDigitsMonthNumber(
    date
  )}.${date.getFullYear()} | ${getPolishDayFromDateObject(
    date
  )} | g. ${getTwoDigitHours(date)}:${getTwoDigitMinutes(date)}`;
}
