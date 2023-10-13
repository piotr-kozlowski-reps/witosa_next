'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import {
  badCyclicalActivitiesData,
  cyclicalActivityNotExistsMessage,
  dbReadingErrorMessage,
  dbWritingErrorMessage,
  notLoggedIn,
} from '@/lib/api/apiTextResponses';
import {
  TCyclicalActivityFormInputs,
  validateValuesForCyclicalActivities,
} from '@/lib/forms/cyclical-activities-form';
import logger from '@/lib/logger';
import prisma from '@/prisma/client';
import {
  TActionResponse,
  TGetAllCyclicalActivitiesResponse,
  TImageCyclicalActivityForDB,
  TOccurrence,
} from '@/types';
import { CyclicalActivity, Day, Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export async function addCyclicalActivity(
  values: TCyclicalActivityFormInputs
): Promise<TActionResponse> {
  /** checking session */
  const session = await getServerSession(authOptions);
  if (!session) {
    logger.warn(notLoggedIn);
    return { status: 'ERROR', response: notLoggedIn };
  }

  console.log('server action inside values:', { values });
  console.log('server action inside values, occurrence:', values.occurrence);
  console.log('server action inside values, images:', values.images);

  /* data validation */
  const validationResult = validateValuesForCyclicalActivities(
    values as Object
  );
  if (!validationResult) {
    logger.warn(badCyclicalActivitiesData);
    return { status: 'ERROR', response: badCyclicalActivitiesData };
  }

  // /* writing cyclical activity to db */
  const authorId = session.user?.id;
  const isIncludeImages = !values.isCustomLinkToDetails;

  const occurrencePreparedData: TOccurrence[] = values.occurrence!.map(
    (occurrenceItem) => ({
      day: occurrenceItem.day as Day,
      activityStart: occurrenceItem.activityStart as Date,
      activityEnd: occurrenceItem.activityStart as Date,
    })
  );

  const imagesPreparedData: TImageCyclicalActivityForDB[] = values.images!.map(
    (image) => ({
      url: generateImagePathAfterCreatingImageIfNeeded_Or_PassPathString(
        image.file as string | File
      ),
      alt: image.alt as string,
      additionInfoThatMustBeDisplayed: image.additionInfoThatMustBeDisplayed
        ? image.additionInfoThatMustBeDisplayed
        : null,
    })
  );

  let cyclicalActivityPreparedForDb: Prisma.CyclicalActivityCreateInput = {
    //stage1
    name: values.name,
    activityTypes: values.activityTypes,
    activitiesForWhom: values.activitiesForWhom,
    places: values.places,
    isToBePublished: values.isToBePublished as boolean,
    isExpiresAtRequired: values.isExpiresAtRequired as boolean,
    expiresAt: values.expiresAt as string | Date | null | undefined,

    //stage2
    shortDescription: values.shortDescription,
    isCustomLinkToDetails: values.isCustomLinkToDetails as boolean,
    longDescription: values.longDescription
      ? (values.longDescription as string)
      : null,
    customLinkToDetails: values.customLinkToDetails
      ? values.customLinkToDetails
      : null,
    author: {
      connect: { id: authorId },
    },
    //stage3
    occurrence: {
      createMany: {
        data: occurrencePreparedData,
      },
    },
  };

  if (isIncludeImages) {
    cyclicalActivityPreparedForDb.images = {
      createMany: { data: imagesPreparedData },
    };
  }

  try {
    const response = await prisma.cyclicalActivity.create({
      data: cyclicalActivityPreparedForDb,
    });
    console.log({ response });
  } catch (error) {
    logger.warn(dbWritingErrorMessage);
    return { status: 'ERROR', response: dbWritingErrorMessage };
  }

  /** revalidation */
  revalidatePath('/');

  /* final success response */
  const successMessage = `Zajęcia: (${values.name}) zostały zapisane.`;
  logger.info(successMessage);
  return {
    status: 'SUCCESS',
    response: successMessage,
  };
}

export async function deleteCyclicalActivities(
  ids: string[]
): Promise<TActionResponse> {
  /** checking session */
  const session = await getServerSession(authOptions);
  if (!session) {
    logger.warn(notLoggedIn);
    return { status: 'ERROR', response: notLoggedIn };
  }

  /** checking values eXistenZ */
  if (!ids || ids.length === 0) {
    logger.warn(badCyclicalActivitiesData);
    return { status: 'ERROR', response: badCyclicalActivitiesData };
  }

  /* validation if ids already exist in db */
  for (let i = 0; i < ids.length; i++) {
    let exists: unknown;
    try {
      exists = await checkIfCyclicalActivityExists(ids[i]);
    } catch (error) {
      logger.warn(dbReadingErrorMessage);
      return { status: 'ERROR', response: dbReadingErrorMessage };
    }
    if (!exists) {
      logger.warn(cyclicalActivityNotExistsMessage);
      return { status: 'ERROR', response: cyclicalActivityNotExistsMessage };
    }
  }

  /* deleting users from db */
  for (let i = 0; i < ids.length; i++) {
    console.log(ids[i]);

    const deleteCyclicalActivityImages =
      prisma.imageCyclicalActivity.deleteMany({
        where: {
          cyclicalActivityId: ids[i],
        },
      });

    const deleteCyclicalActivityOccurrence =
      prisma.cyclicalActivityOccurrence.deleteMany({
        where: { cyclicalActivityId: ids[i] },
      });

    const deleteCyclicalActivity = prisma.cyclicalActivity.deleteMany({
      where: {
        id: ids[i],
      },
    });

    let transaction: unknown;
    try {
      transaction = await prisma.$transaction([
        deleteCyclicalActivityImages,
        deleteCyclicalActivityOccurrence,
        deleteCyclicalActivity,
      ]);
    } catch (error) {
      console.error(error);
    }

    console.log({ transaction });

    //   if(transaction[transaction.length -1].co)
  }

  /** revalidate all */
  revalidatePath('/');

  /** final response */
  const successMessage = `Zajęcia zostały usunięte.`;
  logger.info(successMessage);
  return {
    status: 'SUCCESS',
    response: successMessage,
  };
}

export async function getAllCyclicalActivities(): Promise<TGetAllCyclicalActivitiesResponse> {
  let cyclicalActivities: CyclicalActivity[] = [];

  try {
    cyclicalActivities = await prisma.cyclicalActivity.findMany({
      include: {
        images: true,
        occurrence: true,
      },
    });
  } catch (error) {
    logger.warn(dbReadingErrorMessage);
    return { status: 'ERROR', response: dbReadingErrorMessage };
  }
  // const usersPickedData: TUserPicked[] = users.map((user) => ({
  //   id: user.id,
  //   name: user.name,
  //   email: user.email,
  //   updatedAt: user.updatedAt,
  //   userRole: user.userRole as UserRole,
  // }));
  return { status: 'SUCCESS', response: cyclicalActivities };
}

// export async function updateUser(
//   id: string,
//   isToUpdateAlsoPassword: boolean,
//   formData: FormData
// ): Promise<TActionResponse> {
//   /** checking session */
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     logger.warn(notLoggedIn);
//     return { status: 'ERROR', response: notLoggedIn };
//   }

//   /** check if User exists in DB */
//   let exists: unknown;
//   try {
//     exists = await checkIfUserExists(id);
//   } catch (error) {
//     logger.warn(dbReadingErrorMessage);
//     return { status: 'ERROR', response: dbReadingErrorMessage };
//   }
//   if (!exists) {
//     logger.warn(userNotExistsMessage);
//     return { status: 'ERROR', response: userNotExistsMessage };
//   }

//   /** reading all values from formData */
//   const submittedName = formData.get('name') as string;
//   const submittedEmail = formData.get('email') as string;
//   const submittedPassword = formData.get('password') as string;
//   const submittedConfirmPassword = formData.get('confirmPassword') as string;
//   const submittedUserRole = formData.get('userRole') as UserRole;

//   ////
//   /** update without password and password confirmation inputs  */
//   if (!isToUpdateAlsoPassword) {
//     /** check if values exist */
//     if (!submittedName || !submittedEmail || !submittedUserRole) {
//       logger.warn(lackOfUserData);
//       return { status: 'ERROR', response: lackOfUserData };
//     }

//     /* format validation */
//     try {
//       nameSchema_Required_Min2.parse(submittedName);
//       emailSchema.parse(submittedEmail);
//       useRoleSchema.parse(submittedUserRole);
//     } catch (error) {
//       logger.warn(badUserData);
//       return { status: 'ERROR', response: badUserData };
//     }

//     /* updating user in db */
//     try {
//       await prisma.user.update({
//         where: {
//           id: id,
//         },
//         data: {
//           name: submittedName,
//           email: submittedEmail,
//           userRole: submittedUserRole,
//         },
//       });
//     } catch (error) {
//       logger.warn(dbWritingErrorMessage);
//       return { status: 'ERROR', response: dbWritingErrorMessage };
//     }
//   }

//   ////
//   /** update with password and password confirmation inputs  */
//   if (isToUpdateAlsoPassword) {
//     /** check if values exist */
//     if (
//       !submittedName ||
//       !submittedEmail ||
//       !submittedUserRole ||
//       !submittedPassword ||
//       !submittedConfirmPassword
//     ) {
//       logger.warn(lackOfUserData);
//       return { status: 'ERROR', response: lackOfUserData };
//     }

//     /* format validation */
//     let validationResult = false;
//     try {
//       validationResult = validateUserData(
//         submittedName,
//         submittedEmail,
//         submittedPassword,
//         submittedConfirmPassword,
//         submittedUserRole
//       );
//     } catch (error) {
//       logger.warn(badUserData);
//       return { status: 'ERROR', response: badUserData };
//     }

//     if (!validationResult) {
//       logger.warn(badUserData);
//       return { status: 'ERROR', response: badUserData };
//     }

//     console.log('tutaj');

//     /* updating user in db */
//     const hashedPassword = await bcryptjs.hash(submittedPassword, 10);
//     try {
//       await prisma.user.update({
//         where: {
//           id: id,
//         },
//         data: {
//           name: submittedName,
//           email: submittedEmail,
//           userRole: submittedUserRole,
//           hashedPassword,
//         },
//       });
//     } catch (error) {
//       logger.warn(dbWritingErrorMessage);
//       return { status: 'ERROR', response: dbWritingErrorMessage };
//     }
//   }

//   revalidatePath('/dashboard');

//   /* final success response */
//   const responseText = `Dane użytkownika zostały zmienione.`;
//   logger.info(responseText);
//   return {
//     status: 'SUCCESS',
//     response: responseText,
//   };
// }

////utils
async function checkIfCyclicalActivityExists(id: string) {
  const exists = await prisma.cyclicalActivity.findUnique({ where: { id } });
  return exists;
}

////utils
function generateImagePathAfterCreatingImageIfNeeded_Or_PassPathString(
  file: File | string
): string {
  return 'temporary_string.exe';
}
