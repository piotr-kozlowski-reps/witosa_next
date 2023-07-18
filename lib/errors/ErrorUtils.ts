function isError(exception: unknown): exception is Error {
  return exception instanceof Error;
}

export function getExceptionStack(exception: unknown) {
  return isError(exception) ? exception.stack : undefined;
}
