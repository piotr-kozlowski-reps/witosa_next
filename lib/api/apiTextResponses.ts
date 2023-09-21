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
export const dbReadingErrorMessage =
  'Błąd podczas łączenia się z bazą danych. Spróbuj ponownie.';

//login
export const notLoggedIn = 'Nie jesteś zalogowany.';
export const loggedIn = 'Jesteś zalogowany.';

//user
export const lackOfUserData = 'Brakuje danych, by dodać użytkownika.';
export const badUserData = 'Otrzymane danych są nieprawidłowe.';
export const userAlreadyExists = 'Użytkownik o takim e-mailu już istnieje.';

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
