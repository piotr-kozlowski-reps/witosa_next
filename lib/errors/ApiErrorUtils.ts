import { HttpStatusCode } from 'axios';
import { NextResponse } from 'next/server';
import logger from '../logger';

export function logAndRespondWithApiError(
  errorMessage: string,
  statusCode: HttpStatusCode | number
) {
  logger.info(errorMessage);
  return NextResponse.json({ message: errorMessage }, { status: statusCode });
}
