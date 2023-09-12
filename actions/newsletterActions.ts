'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import {
  badEmailFormatMessage,
  dbReadingErrorMessage,
  dbWritingErrorMessage,
  emailAlreadyExistsMessage,
  emailNotExistsMessage,
  newsletterDbWritingSuccessMessage,
  notLoggedIn,
} from '@/lib/api/apiTextResponses';
import { loginEmailSchema } from '@/lib/errors/zodSchemas';
import logger from '@/lib/logger';
import prisma from '@/prisma/client';
import {
  TActionResponse,
  TGetAllNewsletterAddressesResponse,
  TNewsletterFormValues,
} from '@/types';
import { Newsletter } from '@prisma/client';
import { getServerSession } from 'next-auth';

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
    exists = await checkIfEmailExists(email);
  } catch (error) {
    logger.warn(dbReadingErrorMessage);
    return { status: 'ERROR', response: dbReadingErrorMessage };
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

export async function getAllNewsletterAddresses(): Promise<TGetAllNewsletterAddressesResponse> {
  /** checking session */
  const session = await getServerSession(authOptions);
  if (!session) {
    logger.warn(notLoggedIn);
    return { status: 'ERROR', response: notLoggedIn };
  }

  let emailsInNewsletter: Newsletter[] = [];
  try {
    emailsInNewsletter = await prisma.newsletter.findMany();
  } catch (error) {
    logger.warn(dbReadingErrorMessage);
    return { status: 'ERROR', response: dbReadingErrorMessage };
  }

  return { status: 'SUCCESS', response: emailsInNewsletter };
}

export async function deleteNewsletterAddress(
  email: string
): Promise<TActionResponse> {
  /** checking session */
  const session = await getServerSession(authOptions);
  if (!session) {
    logger.warn(notLoggedIn);
    return { status: 'ERROR', response: notLoggedIn };
  }

  /** checking values eXistenZ */
  if (!email) {
    logger.warn(badEmailFormatMessage);
    return { status: 'ERROR', response: badEmailFormatMessage };
  }

  /* validation if email already exists in db */
  let exists: unknown;
  try {
    exists = await checkIfEmailExists(email);
  } catch (error) {
    logger.warn(dbReadingErrorMessage);
    return { status: 'ERROR', response: dbReadingErrorMessage };
  }
  if (!exists) {
    logger.warn(emailNotExistsMessage);
    return { status: 'ERROR', response: emailNotExistsMessage };
  }

  //TODO: delete email from DB if problem - send error

  return {
    status: 'SUCCESS',
    response: `E-mail: ${email}, został skasowany z Newslettera.`,
  }; ////TODO: check ortograf
}

export async function updateNewsletterAddress(
  oldAddress: string,
  updatedAddress: string
) {
  /** checking session */
  const session = await getServerSession(authOptions);
  if (!session) {
    logger.warn(notLoggedIn);
    return { status: 'ERROR', response: notLoggedIn };
  }

  /** validate existence of addresses */
  if (!oldAddress || !updatedAddress) {
    logger.warn(badEmailFormatMessage);
    return { status: 'ERROR', response: badEmailFormatMessage };
  }

  /** validate form of emails */
  try {
    loginEmailSchema.parse(oldAddress);
    loginEmailSchema.parse(updatedAddress);
  } catch (error) {
    logger.warn(badEmailFormatMessage);
    return { status: 'ERROR', response: badEmailFormatMessage };
  }

  /** check if value exists in DB */
  let exists: unknown;
  try {
    exists = await checkIfEmailExists(oldAddress);
  } catch (error) {
    logger.warn(dbReadingErrorMessage);
    return { status: 'ERROR', response: dbReadingErrorMessage };
  }
  if (!exists) {
    logger.warn(emailNotExistsMessage);
    return { status: 'ERROR', response: emailNotExistsMessage };
  }

  //TODO: update value

  /** send success response */
  return {
    status: 'SUCCESS',
    response: `E-mail: ${oldAddress}, został zmieniony na: ${updatedAddress}.`,
  }; ////TODO: check ortograf
}

////utils
async function checkIfEmailExists(email: string) {
  const exists = await prisma.newsletter.findUnique({ where: { email } });
  return exists;
}
