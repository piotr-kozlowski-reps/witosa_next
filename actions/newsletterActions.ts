'use server';

// export const revalidate = 3600; // revalidate the data at most every hour

// export const getItem = cache(async (id: string) => {
//   const item = await db.item.findUnique({ id });
//   return item;
// });
import { revalidatePath } from 'next/cache';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import {
  badEmailFormatMessage,
  dbReadingErrorMessage,
  dbWritingErrorMessage,
  emailAlreadyExistsMessage,
  emailNotExistsMessage,
  generateNewsletterDbWritingSuccessMessageWithCurrentEmail,
  notLoggedIn,
} from '@/lib/api/apiTextResponses';
import { loginEmailSchema } from '@/lib/errors/zodSchemas';
import logger from '@/lib/logger';
import { createEmailsListInOneLineInSquareBrackets } from '@/lib/textHelpers';
import prisma from '@/prisma/client';
import { TActionResponse, TGetAllNewsletterAddressesResponse } from '@/types';
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
    console.log({ error });

    logger.warn(dbWritingErrorMessage);
    return { status: 'ERROR', response: dbWritingErrorMessage };
  }

  /* final success response */
  logger.info(generateNewsletterDbWritingSuccessMessageWithCurrentEmail(email));
  return {
    status: 'SUCCESS',
    response: generateNewsletterDbWritingSuccessMessageWithCurrentEmail(email),
  };
}

// export const getAllNewsletterAddresses = cache(
//   async (): Promise<TGetAllNewsletterAddressesResponse> => {
//     /** checking session */
//     const session = await getServerSession(authOptions);
//     if (!session) {
//       logger.warn(notLoggedIn);
//       return { status: 'ERROR', response: notLoggedIn };
//     }

//     let emailsInNewsletter: Newsletter[] = [];
//     try {
//       emailsInNewsletter = await prisma.newsletter.findMany();
//     } catch (error) {
//       logger.warn(dbReadingErrorMessage);
//       return { status: 'ERROR', response: dbReadingErrorMessage };
//     }

//     return { status: 'SUCCESS', response: emailsInNewsletter };
//   }
// );

export const getAllNewsletterAddresses =
  async (): Promise<TGetAllNewsletterAddressesResponse> => {
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
  };

export async function deleteNewsletterAddresses(
  emailsArray: string[]
): Promise<TActionResponse> {
  /** checking session */
  const session = await getServerSession(authOptions);
  if (!session) {
    logger.warn(notLoggedIn);
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
      logger.warn(dbReadingErrorMessage);
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
    logger.warn(dbWritingErrorMessage);
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
    response: `E-mail: ${oldAddress} został zmieniony na: ${updatedAddress}.`,
  };
}

////utils
async function checkIfEmailExists(email: string) {
  const exists = await prisma.newsletter.findUnique({ where: { email } });
  return exists;
}
