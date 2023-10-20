import { dbReadingErrorMessage } from '@/lib/api/apiTextResponses';
import logger from '@/lib/logger';
import prisma from '@/prisma/client';
import { TGetAllEventsResponse } from '@/types';
import { Event } from '@prisma/client';

export async function getAllEvents(): Promise<TGetAllEventsResponse> {
  let events: Event[] = [];

  try {
    events = await prisma.event.findMany({ include: { images: true } });
  } catch (error) {
    logger.warn((error as Error).stack);
    return { status: 'ERROR', response: dbReadingErrorMessage };
  }
  return { status: 'SUCCESS', response: events };
}
