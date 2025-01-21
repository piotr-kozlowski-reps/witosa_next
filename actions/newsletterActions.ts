'use server';

// export const revalidate = 3600; // revalidate the data at most every hour

// export const getItem = cache(async (id: string) => {
//   const item = await db.item.findUnique({ id });
//   return item;
// });
import { revalidatePath } from 'next/cache';

import {
  badEmailFormatMessage,
  dbReadingErrorMessage,
  dbWritingErrorMessage,
  emailAlreadyExistsMessage,
  emailNotExistsMessage,
  generateNewsletterDbWritingSuccessMessageWithCurrentEmail,
  notLoggedIn,
} from '@/lib/api/apiTextResponses';
import logger from '@/lib/logger';
import { createEmailsListInOneLineInSquareBrackets } from '@/lib/textHelpers';
import { emailSchema } from '@/lib/zodSchemas';
import prisma from '@/prisma/client';
import { TActionResponse, TGetAllNewsletterAddressesResponse } from '@/types';
import { Newsletter } from '@prisma/client';
import { checkIfLoggedIn } from './actionHelpers';

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
    emailSchema.parse(email);
  } catch (error) {
    logger.warn((error as Error).stack);
    return { status: 'ERROR', response: badEmailFormatMessage };
  }

  /* validation if email already exists in db */
  let exists: unknown;
  try {
    exists = await checkIfEmailExists(email);
  } catch (error) {
    logger.warn((error as Error).stack);
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
    logger.warn((error as Error).stack);
    return { status: 'ERROR', response: dbWritingErrorMessage };
  }

  revalidatePath('/dashboard');

  /* final success response */
  logger.info(generateNewsletterDbWritingSuccessMessageWithCurrentEmail(email));
  return {
    status: 'SUCCESS',
    response: generateNewsletterDbWritingSuccessMessageWithCurrentEmail(email),
  };
}

export const getAllNewsletterAddresses =
  async (): Promise<TGetAllNewsletterAddressesResponse> => {
    /** checking session */
    try {
      await checkIfLoggedIn();
    } catch (error) {
      return { status: 'ERROR', response: notLoggedIn };
    }

    let emailsInNewsletter: Newsletter[] = [];
    try {
      emailsInNewsletter = await prisma.newsletter.findMany();
    } catch (error) {
      logger.warn((error as Error).stack);
      return { status: 'ERROR', response: dbReadingErrorMessage };
    }

    return { status: 'SUCCESS', response: emailsInNewsletter };
  };

export async function deleteNewsletterAddresses(
  emailsArray: string[]
): Promise<TActionResponse> {
  /** checking session */
  try {
    await checkIfLoggedIn();
  } catch (error) {
    return { status: 'ERROR', response: notLoggedIn };
  }

  /** checking values eXistenZ */
  if (!emailsArray) {
    logger.warn(badEmailFormatMessage);
    return { status: 'ERROR', response: badEmailFormatMessage };
  }

  /* validation if emails already exist in db */
  for (let i = 0; i < emailsArray.length; i++) {
    let exists: unknown;
    try {
      exists = await checkIfEmailExists(emailsArray[i]);
    } catch (error) {
      logger.warn((error as Error).stack);
      return { status: 'ERROR', response: dbReadingErrorMessage };
    }

    if (!exists) {
      logger.warn(emailNotExistsMessage);
      return { status: 'ERROR', response: emailNotExistsMessage };
    }
  }

  try {
    await prisma.newsletter.deleteMany({
      where: {
        email: {
          in: emailsArray,
        },
      },
    });
  } catch (error) {
    logger.warn((error as Error).stack);
    return { status: 'ERROR', response: dbWritingErrorMessage };
  }

  revalidatePath('/dashboard');

  const responseText =
    emailsArray.length === 1
      ? `E-mail: ${createEmailsListInOneLineInSquareBrackets(
          emailsArray
        )} - został skasowany z Newslettera.`
      : `E-maile: ${createEmailsListInOneLineInSquareBrackets(
          emailsArray
        )} - zostały skasowane z Newslettera.`;

  return {
    status: 'SUCCESS',
    response: responseText,
  };
}

export async function updateNewsletterAddress(
  oldAddress: string,
  formData: FormData
): Promise<TActionResponse> {
  /** checking session */
  try {
    await checkIfLoggedIn();
  } catch (error) {
    return { status: 'ERROR', response: notLoggedIn };
  }

  const updatedAddress = formData.get('email') as string;

  /** validate existence of addresses */
  if (!oldAddress || !updatedAddress) {
    logger.warn(badEmailFormatMessage);
    return { status: 'ERROR', response: badEmailFormatMessage };
  }

  /** validate format of emails */
  try {
    emailSchema.parse(oldAddress);
    emailSchema.parse(updatedAddress);
  } catch (error) {
    logger.warn((error as Error).stack);
    return { status: 'ERROR', response: badEmailFormatMessage };
  }

  /** check if value exists in DB */
  let exists: unknown;
  try {
    exists = await checkIfEmailExists(oldAddress);
  } catch (error) {
    logger.warn((error as Error).stack);
    return { status: 'ERROR', response: dbReadingErrorMessage };
  }
  if (!exists) {
    logger.warn(emailNotExistsMessage);
    return { status: 'ERROR', response: emailNotExistsMessage };
  }

  /* updating email in db */
  try {
    await prisma.newsletter.update({
      where: {
        email: oldAddress,
      },
      data: {
        email: updatedAddress,
      },
    });
  } catch (error) {
    logger.warn((error as Error).stack);
    return { status: 'ERROR', response: dbWritingErrorMessage };
  }

  revalidatePath('/dashboard');

  /* final success response */
  const responseText = `E-mail: ${oldAddress} został zmieniony na: ${updatedAddress}.`;
  logger.info(responseText);
  return {
    status: 'SUCCESS',
    response: responseText,
  };
}

////utils
async function checkIfEmailExists(email: string) {
  const exists = await prisma.newsletter.findUnique({ where: { email } });
  return exists;
}
