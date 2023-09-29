export function isFirstDateBeforeSecond(date1: Date, date2: Date) {
  return date1.getTime() < date2.getTime();
}
export function isFirstDateAfterSecond(date1: Date, date2: Date) {
  return date1.getTime() > date2.getTime();
}

export function getMonthAlwaysInTwoDigits(date: Date) {
  const monthNumber = date.getMonth() + 1;
  return monthNumber <= 9 ? `0${monthNumber}` : `${monthNumber}`;
}

export function getDayAlwaysInTwoDigits(date: Date) {
  const dayNumber = date.getDate();
  return dayNumber <= 9 ? `0${dayNumber}` : `${dayNumber}`;
}
