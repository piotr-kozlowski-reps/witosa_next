//email
export const badEmailFormatMessage =
  'Podany e-mail ma zły format. Prosimy o wpisanie poprawnych danych.';
export const emailAlreadyExistsMessage =
  'Podany e-mail już jest zapisany w naszym newsletterze.';
export const emailNotExistsMessage =
  'Nie można znaleźć podanego e-maila w bazie danych.';
export const newsletterDbWritingSuccessMessage =
  'E-mail został zapisany w naszym newsletterze.';

//user
export const userNotExistsMessage =
  'Nie można znaleźć użytkownika w bazie danych.';

//db
export const dbWritingErrorMessage =
  'Błąd w trakcie zapisywania danych. Spróbuj ponownie.';
export const dbDeletingErrorMessage =
  'Błąd w trakcie kasowania danych. Spróbuj ponownie.';
export const dbReadingErrorMessage =
  'Błąd podczas łączenia się z bazą danych. Spróbuj ponownie.';

//creating image
export const imageCreationErrorMessage =
  'Błąd w trakcie zapisywania pliku graficznego na serwerze..';

//login
export const notLoggedIn = 'Nie jesteś zalogowany.';
export const loggedIn = 'Jesteś zalogowany.';

//user
export const lackOfUserData = 'Brakuje danych, by dodać użytkownika.';
export const badUserData = 'Otrzymane dane są nieprawidłowe.';
export const userAlreadyExists = 'Użytkownik o takim e-mailu już istnieje.';

//cyclical activities
export const lackOfCyclicalActivitiesData = 'Brakuje danych, by dodać zajęcia.';
export const badReceivedData = 'Otrzymane dane są nieprawidłowe.';
export const cyclicalActivityNotExistsMessage =
  'Nie można znaleźć takich zajęć w bazie danych.';

//events
export const dateOfEventIsNotDefined =
  'Data wydarzenie nie została jeszcze przez Ciebie określona lub jest błędna.';
export const dateOfVisibleFromIsNotDefined =
  'Data rozpoczęcia publikacji wydarzenie nie została jeszcze przez Ciebie określona lub jest błędna.';
export const badEventData = 'Otrzymane dane są nieprawidłowe.';
export const eventNotExistsMessage =
  'Nie ma takiego wydarzenia w bazie danych.';

//data preparation
export const preparationDataError =
  'Coś poszło nie tak z przygotowaniem danych, spróbuj ponownie.';

export function generateNewsletterDbWritingSuccessMessageWithCurrentEmail(
  email: string
) {
  return `E-mail: ${email} - został zapisany w naszym newsletterze.`;
}

export function generateUserDbWritingSuccessMessageWithData(
  userName: string,
  email: string
) {
  return `Użytkownik: ${userName} o e-mailu: ${email} - został zapisany w bazie danych.`;
}
