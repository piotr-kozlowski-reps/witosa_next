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
  let validationResult = false;
  try {
    validationResult = validateUserData(
      submittedName,
      submittedEmail,
      submittedPassword,
      submittedConfirmPassword,
      submittedUserRole
    );
  } catch (error) {
    logger.warn((error as Error).stack);
    return { status: 'ERROR', response: badUserData };
  }
  if (validationResult) {
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
    logger.warn((error as Error).stack);
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
        userRole: submittedUserRole,
      },
    });
  } catch (error) {
    logger.warn((error as Error).stack);
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
    logger.warn((error as Error).stack);
    return { status: 'ERROR', response: dbReadingErrorMessage };
  }

  const usersPickedData: TUserPicked[] = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    updatedAt: user.updatedAt,
    userRole: user.userRole as UserRole,
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

  console.log({ ids });

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
    } catch (error) {
      logger.warn((error as Error).stack);
      return { status: 'ERROR', response: dbReadingErrorMessage };
    }

    if (!exists) {
      logger.warn(userNotExistsMessage);
      return { status: 'ERROR', response: userNotExistsMessage };
    }
  }

  console.log('jestem za exist');

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
    logger.warn((error as Error).stack);
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

export async function updateUser(
  id: string,
  isToUpdateAlsoPassword: boolean,
  formData: FormData
): Promise<TActionResponse> {
  /** checking session */
  const session = await getServerSession(authOptions);
  if (!session) {
    logger.warn(notLoggedIn);
    return { status: 'ERROR', response: notLoggedIn };
  }

  /** check if User exists in DB */
  let exists: unknown;
  try {
    exists = await checkIfUserExists(id);
  } catch (error) {
    logger.warn((error as Error).stack);
    return { status: 'ERROR', response: dbReadingErrorMessage };
  }
  if (!exists) {
    logger.warn(userNotExistsMessage);
    return { status: 'ERROR', response: userNotExistsMessage };
  }

  /** reading all values from formData */
  const submittedName = formData.get('name') as string;
  const submittedEmail = formData.get('email') as string;
  const submittedPassword = formData.get('password') as string;
  const submittedConfirmPassword = formData.get('confirmPassword') as string;
  const submittedUserRole = formData.get('userRole') as UserRole;

  ////
  /** update without password and password confirmation inputs  */
  if (!isToUpdateAlsoPassword) {
    /** check if values exist */
    if (!submittedName || !submittedEmail || !submittedUserRole) {
      logger.warn(lackOfUserData);
      return { status: 'ERROR', response: lackOfUserData };
    }

    /* format validation */
    try {
      nameSchema_Required_Min2.parse(submittedName);
      emailSchema.parse(submittedEmail);
      useRoleSchema.parse(submittedUserRole);
    } catch (error) {
      logger.warn((error as Error).stack);
      return { status: 'ERROR', response: badUserData };
    }

    /* updating user in db */
    try {
      await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          name: submittedName,
          email: submittedEmail,
          userRole: submittedUserRole,
        },
      });
    } catch (error) {
      logger.warn((error as Error).stack);
      return { status: 'ERROR', response: dbWritingErrorMessage };
    }
  }

  ////
  /** update with password and password confirmation inputs  */
  if (isToUpdateAlsoPassword) {
    /** check if values exist */
    if (
      !submittedName ||
      !submittedEmail ||
      !submittedUserRole ||
      !submittedPassword ||
      !submittedConfirmPassword
    ) {
      logger.warn(lackOfUserData);
      return { status: 'ERROR', response: lackOfUserData };
    }

    /* format validation */
    let validationResult = false;
    try {
      validationResult = validateUserData(
        submittedName,
        submittedEmail,
        submittedPassword,
        submittedConfirmPassword,
        submittedUserRole
      );
    } catch (error) {
      logger.warn((error as Error).stack);
      return { status: 'ERROR', response: badUserData };
    }

    if (!validationResult) {
      logger.warn(badUserData);
      return { status: 'ERROR', response: badUserData };
    }

    console.log('tutaj');

    /* updating user in db */
    const hashedPassword = await bcryptjs.hash(submittedPassword, 10);
    try {
      await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          name: submittedName,
          email: submittedEmail,
          userRole: submittedUserRole,
          hashedPassword,
        },
      });
    } catch (error) {
      logger.warn((error as Error).stack);
      return { status: 'ERROR', response: dbWritingErrorMessage };
    }
  }

  revalidatePath('/dashboard');

  /* final success response */
  const responseText = `Dane użytkownika zostały zmienione.`;
  logger.info(responseText);
  return {
    status: 'SUCCESS',
    response: responseText,
  };
}

////utils
async function checkIfUserExists(id: string) {
  const exists = await prisma.user.findUnique({ where: { id } });
  console.log({ exists });

  return exists;
}

function validateUserData(
  name: string,
  email: string,
  password: string,
  confirmationPassword: string,
  userRole: UserRole
) {
  nameSchema_Required_Min2.parse(name);
  emailSchema.parse(email);
  passwordSchema_Required_Min5_Max20.parse(password);
  passwordSchema_Required_Min5_Max20.parse(confirmationPassword);
  useRoleSchema.parse(userRole);
  if (password.trim() !== confirmationPassword.trim()) {
    throw new Error("Password and it's confirmation are not the same");
  }
  return true;
}
