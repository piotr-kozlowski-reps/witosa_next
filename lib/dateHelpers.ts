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

export function setTodaysDateFromMidnight() {
  const todaysDate = new Date();
  const todaysDateAsString = todaysDate.toISOString();
  const correctedDateAsString = todaysDateAsString.replace(
    /T\w{2}:\w{2}:\w{2}/g,
    'T00:00:00'
  );
  return new Date(correctedDateAsString);
}
export function setDateWith_23_59minutes(date: Date) {
  const todaysDateAsString = date.toISOString();
  const correctedDateAsString = todaysDateAsString.replace(
    /T\w{2}:\w{2}:\w{2}/g,
    'T23:59:00'
  );
  return new Date(correctedDateAsString);
}

export const getTimezoneOffset = (value: Date) =>
  value.getTimezoneOffset() * 60000;

export const makeLocalAppearUTC = (value: Date) => {
  const dateTime = new Date(value);
  const utcFromLocal = new Date(
    dateTime.getTime() + getTimezoneOffset(dateTime)
  );
  return utcFromLocal;
};

export const localToUTC = (dateTime: Date) => {
  // console.log('localToUTC');
  // console.log(dateTime.toISOString());
  // console.log('getTimezoneOffset(dateTime): ', getTimezoneOffset(dateTime));
  // console.log(
  //   `
  //   dateTime.getTime() - getTimezoneOffset(dateTime)
  // )`,
  //   new Date(dateTime.getTime() - getTimezoneOffset(dateTime))
  // );

  const utcFromLocal = new Date(
    dateTime.getTime() - getTimezoneOffset(dateTime)
  );
  return utcFromLocal;
};
