'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import {
  badUserData,
  dbReadingErrorMessage,
  dbWritingErrorMessage,
  generateUserDbWritingSuccessMessageWithData,
  lackOfUserData,
  notLoggedIn,
  userAlreadyExists,
} from '@/lib/api/apiTextResponses';
import logger from '@/lib/logger';
import {
  emailSchema,
  nameSchema_Required_Min2,
  passwordSchema_Required_Min5_Max20,
  useRoleSchema,
} from '@/lib/zodSchemas';
import prisma from '@/prisma/client';
import { TActionResponse } from '@/types';
import { UserRole } from '@prisma/client';
import bcryptjs from 'bcryptjs';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export async function addUser(formData: FormData): Promise<TActionResponse> {
  /** checking session */
  const session = await getServerSession(authOptions);
  if (!session) {
    logger.warn(notLoggedIn);
    return { status: 'ERROR', response: notLoggedIn };
  }

  /** checking values eXistenZ */
  const submittedName = formData.get('name') as string;
  const submittedEmail = formData.get('email') as string;
  const submittedPassword = formData.get('password') as string;
  const submittedConfirmPassword = formData.get('confirmPassword') as string;
  const submittedUserRole = formData.get('userRole') as UserRole;

  if (
    !submittedName ||
    !submittedEmail ||
    !submittedPassword ||
    !submittedConfirmPassword ||
    !submittedUserRole
  ) {
    logger.warn(lackOfUserData);
    return { status: 'ERROR', response: lackOfUserData };
  }

  /* format validation */
  try {
    nameSchema_Required_Min2.parse(submittedName);
    emailSchema.parse(submittedEmail);
    passwordSchema_Required_Min5_Max20.parse(submittedPassword);
    passwordSchema_Required_Min5_Max20.parse(submittedConfirmPassword);
    useRoleSchema.parse(submittedUserRole);
    if (submittedPassword.trim() !== submittedConfirmPassword.trim()) {
      throw new Error("Password and it's confirmation are not the same");
    }
  } catch (error) {
    logger.warn(badUserData);
    return { status: 'ERROR', response: badUserData };
  }

  /* validation if user already exists in db */
  let exists: unknown;
  try {
    exists = await prisma.user.findUnique({
      where: {
        email: submittedEmail,
      },
    });
  } catch (error) {
    logger.warn(dbReadingErrorMessage);
    return { status: 'ERROR', response: dbReadingErrorMessage };
  }
  if (exists) {
    logger.warn(userAlreadyExists);
    return { status: 'ERROR', response: userAlreadyExists };
  }

  /* writing user to db */
  const hashedPassword = await bcryptjs.hash(submittedPassword, 10);
  try {
    await prisma.user.create({
      data: {
        name: submittedName,
        email: submittedEmail,
        hashedPassword,
        role: submittedUserRole,
      },
    });
  } catch (error) {
    logger.warn(dbWritingErrorMessage);
    return { status: 'ERROR', response: dbWritingErrorMessage };
  }

  revalidatePath('/dashboard');

  /* final success response */
  const successMessage = generateUserDbWritingSuccessMessageWithData(
    submittedName,
    submittedEmail
  );
  logger.info(successMessage);
  return {
    status: 'SUCCESS',
    response: successMessage,
  };
}

// export const getAllNewsletterAddresses =
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
//   };

// export async function deleteNewsletterAddresses(
//   emailsArray: string[]
// ): Promise<TActionResponse> {
//   /** checking session */
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     logger.warn(notLoggedIn);
//     return { status: 'ERROR', response: notLoggedIn };
//   }

//   /** checking values eXistenZ */
//   if (!emailsArray) {
//     logger.warn(badEmailFormatMessage);
//     return { status: 'ERROR', response: badEmailFormatMessage };
//   }

//   /* validation if emails already exist in db */
//   for (let i = 0; i < emailsArray.length; i++) {
//     let exists: unknown;
//     try {
//       exists = await checkIfEmailExists(emailsArray[i]);
//     } catch (error) {
//       logger.warn(dbReadingErrorMessage);
//       return { status: 'ERROR', response: dbReadingErrorMessage };
//     }

//     if (!exists) {
//       logger.warn(emailNotExistsMessage);
//       return { status: 'ERROR', response: emailNotExistsMessage };
//     }
//   }

//   try {
//     await prisma.newsletter.deleteMany({
//       where: {
//         email: {
//           in: emailsArray,
//         },
//       },
//     });
//   } catch (error) {
//     logger.warn(dbWritingErrorMessage);
//     return { status: 'ERROR', response: dbWritingErrorMessage };
//   }

//   revalidatePath('/dashboard');

//   const responseText =
//     emailsArray.length === 1
//       ? `E-mail: ${createEmailsListInOneLineInSquareBrackets(
//           emailsArray
//         )} - został skasowany z Newslettera.`
//       : `E-maile: ${createEmailsListInOneLineInSquareBrackets(
//           emailsArray
//         )} - zostały skasowane z Newslettera.`;

//   return {
//     status: 'SUCCESS',
//     response: responseText,
//   };
// }

// export async function updateNewsletterAddress(
//   oldAddress: string,
//   formData: FormData
// ): Promise<TActionResponse> {
//   /** checking session */
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     logger.warn(notLoggedIn);
//     return { status: 'ERROR', response: notLoggedIn };
//   }

//   const updatedAddress = formData.get('email') as string;

//   /** validate existence of addresses */
//   if (!oldAddress || !updatedAddress) {
//     logger.warn(badEmailFormatMessage);
//     return { status: 'ERROR', response: badEmailFormatMessage };
//   }

//   /** validate format of emails */
//   try {
//     emailSchema.parse(oldAddress);
//     emailSchema.parse(updatedAddress);
//   } catch (error) {
//     logger.warn(badEmailFormatMessage);
//     return { status: 'ERROR', response: badEmailFormatMessage };
//   }

//   /** check if value exists in DB */
//   let exists: unknown;
//   try {
//     exists = await checkIfEmailExists(oldAddress);
//   } catch (error) {
//     logger.warn(dbReadingErrorMessage);
//     return { status: 'ERROR', response: dbReadingErrorMessage };
//   }
//   if (!exists) {
//     logger.warn(emailNotExistsMessage);
//     return { status: 'ERROR', response: emailNotExistsMessage };
//   }

//   /* updating email in db */
//   try {
//     await prisma.newsletter.update({
//       where: {
//         email: oldAddress,
//       },
//       data: {
//         email: updatedAddress,
//       },
//     });
//   } catch (error) {
//     logger.warn(dbWritingErrorMessage);
//     return { status: 'ERROR', response: dbWritingErrorMessage };
//   }

//   revalidatePath('/dashboard');

//   /* final success response */
//   const responseText = `E-mail: ${oldAddress} został zmieniony na: ${updatedAddress}.`;
//   logger.info(responseText);
//   return {
//     status: 'SUCCESS',
//     response: responseText,
//   };
// }

// ////utils
// async function checkIfEmailExists(email: string) {
//   const exists = await prisma.newsletter.findUnique({ where: { email } });
//   return exists;
// }
