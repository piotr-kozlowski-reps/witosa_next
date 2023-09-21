'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import {
  badEmailFormatMessage,
  badUserData,
  dbReadingErrorMessage,
  dbWritingErrorMessage,
  generateUserDbWritingSuccessMessageWithData,
  lackOfUserData,
  notLoggedIn,
  userAlreadyExists,
  userNotExistsMessage,
} from '@/lib/api/apiTextResponses';
import logger from '@/lib/logger';
import {
  emailSchema,
  nameSchema_Required_Min2,
  passwordSchema_Required_Min5_Max20,
  useRoleSchema,
} from '@/lib/zodSchemas';
import prisma from '@/prisma/client';
import { TActionResponse, TGetAllUsersResponse, TUserPicked } from '@/types';
import { User, UserRole } from '@prisma/client';
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

export async function getAllUsers(): Promise<TGetAllUsersResponse> {
  /** checking session */
  const session = await getServerSession(authOptions);
  if (!session) {
    logger.warn(notLoggedIn);
    return { status: 'ERROR', response: notLoggedIn };
  }

  let users: User[] = [];
  try {
    users = await prisma.user.findMany();
  } catch (error) {
    logger.warn(dbReadingErrorMessage);
    return { status: 'ERROR', response: dbReadingErrorMessage };
  }

  const usersPickedData: TUserPicked[] = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    updatedAt: user.updatedAt,
    role: user.role as UserRole,
  }));

  return { status: 'SUCCESS', response: usersPickedData };
}

export async function deleteUsers(ids: string[]): Promise<TActionResponse> {
  /** checking session */
  const session = await getServerSession(authOptions);
  if (!session) {
    logger.warn(notLoggedIn);
    return { status: 'ERROR', response: notLoggedIn };
  }

  // console.log(JSON.stringify(ids));

  /** checking values eXistenZ */
  if (!ids || ids.length === 0) {
    logger.warn(badEmailFormatMessage);
    return { status: 'ERROR', response: badEmailFormatMessage };
  }

  /* validation if ids already exist in db */
  for (let i = 0; i < ids.length; i++) {
    let exists: unknown;
    try {
      exists = await checkIfUserExists(ids[i]);
      console.log({ exists });
    } catch (error) {
      logger.warn(dbReadingErrorMessage);
      return { status: 'ERROR', response: dbReadingErrorMessage };
    }

    if (!exists) {
      logger.warn(userNotExistsMessage);
      return { status: 'ERROR', response: userNotExistsMessage };
    }
  }

  /* deleting users from db */
  try {
    await prisma.user.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  } catch (error) {
    logger.warn(dbWritingErrorMessage);
    return { status: 'ERROR', response: dbWritingErrorMessage };
  }

  revalidatePath('/dashboard');

  const responseText =
    ids.length === 1
      ? `Użytkownik został skasowany.`
      : `Użytkownicy zostali skasowani.`;

  return {
    status: 'SUCCESS',
    response: responseText,
  };
}

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

////utils
async function checkIfUserExists(id: string) {
  const exists = await prisma.user.findUnique({ where: { id } });
  return exists;
}
