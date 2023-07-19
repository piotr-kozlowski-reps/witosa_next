export const responseMessages = {
  responseMessageNotLoggedIn:
    'Tylko zalogowani użytkownicy mają dostęp do tych zasobów.',
  responseMessageNotAdminUser:
    'Tylko Administratorzy mają dostęp do tych zasobów.',
  cannotAccessLogFiles: "Wystąpił błąd. Nie mogę pobrać plików z log'ami.",
  cannotAccessLogFile: 'Wystąpił błąd. Nie mogę pobrać pliku.',
};

export const errorMessages = {
  onlyAuthenticatedUsers:
    'Tylko zalogowani użytkownicy mają dostęp do tych zasobów.',
};

export function createErrorMessageWithSpecifiedPath(
  errorMessage: string,
  path: string
) {
  return `${errorMessage} Ścieżka: ${path}`;
}
