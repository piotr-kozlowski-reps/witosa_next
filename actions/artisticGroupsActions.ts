import { TGetAllArtisticGroupsResponse } from '@/types';
import { ArtisticGroup, Prisma } from '@prisma/client';
import prisma from '@/prisma/client';
import logger from '@/lib/logger';
import { dbReadingErrorMessage } from '@/lib/api/apiTextResponses';

export async function getAllArtisticGroups(): Promise<TGetAllArtisticGroupsResponse> {
  let artisticGroups: ArtisticGroup[] = [];
  try {
    artisticGroups = await prisma.artisticGroup.findMany({
      include: { images: true },
    });
  } catch (error) {
    logger.warn((error as Error).stack);
    return { status: 'ERROR', response: dbReadingErrorMessage };
  }
  return { status: 'SUCCESS', response: artisticGroups };
}
