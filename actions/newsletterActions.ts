'use server';

import {
  badEmailFormatMessage,
  dbReadingErrorMessage,
  dbWritingErrorMessage,
  emailAlreadyExistsMessage,
  newsletterDbWritingSuccessMessage,
} from '@/lib/api/apiTextResponses';
import { loginEmailSchema } from '@/lib/errors/zodSchemas';
import logger from '@/lib/logger';
import prisma from '@/prisma/client';
import { TActionResponse, TNewsletterFormValues } from '@/types';
import { Newsletter } from '@prisma/client';

export async function addNewsletterAddress(
  formData: FormData
): Promise<TActionResponse> {
  const email = formData.get('email') as string;

  /** checking values eXistenZ */
  if (!email) {
    logger.warn(badEmailFormatMessage);
    return { status: 'ERROR', response: badEmailFormatMessage };
  }

  /* format validation */
  try {
    loginEmailSchema.parse(email);
  } catch (error) {
    logger.warn(badEmailFormatMessage);
    return { status: 'ERROR', response: badEmailFormatMessage };
  }

  /* validation if email already exists in db */
  let exists: unknown;
  try {
    exists = await prisma.newsletter.findUnique({ where: { email } });
  } catch (error) {
    logger.warn(dbReadingErrorMessage);
  }
  if (exists) {
    logger.warn(emailAlreadyExistsMessage);
    return { status: 'ERROR', response: emailAlreadyExistsMessage };
  }

  /* sending email to db */
  try {
    await prisma.newsletter.create({ data: { email } });
  } catch (error) {
    logger.warn(dbWritingErrorMessage);
    return { status: 'ERROR', response: dbWritingErrorMessage };
  }

  /* final success response */
  ////TODO: dodaj email wyslany właśnie jeszcze do response i loggera
  logger.info(newsletterDbWritingSuccessMessage);
  return { status: 'SUCCESS', response: newsletterDbWritingSuccessMessage };
}

// export async function getAllNewsletterAddresses(): Promise<Newsletter>{

//   const

// }
