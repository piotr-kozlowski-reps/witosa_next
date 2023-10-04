'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import {
  badCyclicalActivitiesData,
  cyclicalActivityNotExistsMessage,
  dbReadingErrorMessage,
  dbWritingErrorMessage,
  lackOfCyclicalActivitiesData,
  notLoggedIn,
} from '@/lib/api/apiTextResponses';
import { TCyclicalActivityFormInputs } from '@/lib/forms/cyclical-activities-form';
import logger from '@/lib/logger';
import {
  activityTypeArraySchema,
  forWhomArraySchema,
  isBooleanSchema,
  isDateSchema,
  nameSchema_Required_Min2,
  placesArraySchema,
} from '@/lib/zodSchemas';
import prisma from '@/prisma/client';
import {
  TActionResponse,
  TCyclicalActivitiesFormValues,
  TGetAllCyclicalActivitiesResponse,
} from '@/types';
import { ActivityType, CyclicalActivity, ForWhom, Place } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export async function addCyclicalActivity(
  formData: FormData
): Promise<TActionResponse> {
  /** checking session */
  const session = await getServerSession(authOptions);
  if (!session) {
    logger.warn(notLoggedIn);
    return { status: 'ERROR', response: notLoggedIn };
  }

  // console.log([...formData]);

  // /** checking values eXistenZ */
  //TODO:  .... check everything here, starts to be a mess
  const submittedName = formData.get('name') as string;
  const submittedActivityTypes = formData.getAll(
    'activityTypes'
  ) as ActivityType[];
  const submittedActivitiesForWhom = formData.getAll(
    'activitiesForWhom'
  ) as ForWhom[];
  const submittedPlaces = formData.getAll('places') as Place[];
  const submittedIsToBePublished =
    (formData.get('isToBePublished') as string) === 'true' ? true : false;
  const submittedIsCustomLinkToDetails =
    (formData.get('isCustomLinkToDetails') as string) === 'true' ? true : false;
  const submittedIsExpiresAtRequired =
    (formData.get('isExpiresAtRequired') as string) === 'true' ? true : false;
  const submittedExpiresAt = formData.get('expiresAt') as Date & string;
  const submittedShortDescription = formData.get('shortDescription') as string;
  const submittedLongDescription = formData.get('longDescription') as string;
  const submittedCustomLinkToDetails = formData.get(
    'longDescription'
  ) as string;

  //TODO: maybe also with ZOD  .... check everything here, starts to be a mess
  if (
    !submittedName ||
    !submittedActivityTypes ||
    !submittedActivitiesForWhom ||
    !submittedPlaces ||
    submittedIsToBePublished === undefined ||
    submittedIsExpiresAtRequired === undefined ||
    submittedShortDescription ||
    submittedIsCustomLinkToDetails === undefined
  ) {
    logger.warn(lackOfCyclicalActivitiesData);
    return { status: 'ERROR', response: lackOfCyclicalActivitiesData };
  }

  /* format validation */
  const formDataAsObject: TCyclicalActivitiesFormValues = {
    name: submittedName,
    activityTypes: submittedActivityTypes,
    activitiesForWhom: submittedActivitiesForWhom,
    places: submittedPlaces,
    isExpiresAtRequired: submittedIsExpiresAtRequired,
    expiresAt: submittedExpiresAt || null,
    isToBePublished: submittedIsToBePublished,
    shortDescription: submittedShortDescription,
    longDescription: submittedLongDescription,
    isCustomLinkToDetails: submittedIsCustomLinkToDetails,
    customLinkToDetails: submittedCustomLinkToDetails,
  };
  let validationResult = false;
  try {
    validationResult = validateCyclicalActivityData(formDataAsObject);
  } catch (error) {
    logger.warn(badCyclicalActivitiesData);
    return { status: 'ERROR', response: badCyclicalActivitiesData };
  }
  if (!validationResult) {
    logger.warn(badCyclicalActivitiesData);
    return { status: 'ERROR', response: badCyclicalActivitiesData };
  }

  /* writing cyclical activity to db */
  const authorId = session.user?.id;
  try {
    const response = await prisma.cyclicalActivity.create({
      data: {
        //stage1
        name: submittedName,
        activityTypes: submittedActivityTypes,
        activitiesForWhom: submittedActivitiesForWhom,
        places: submittedPlaces,
        isToBePublished: submittedIsToBePublished,
        isExpiresAtRequired: submittedIsExpiresAtRequired,
        expiresAt: submittedExpiresAt,
        //stage2
        shortDescription: submittedShortDescription,
        longDescription: 'long description',
        isCustomLinkToDetails: submittedIsCustomLinkToDetails,
        customLinkToDetails: 'customLinkToDetails',
        author: {
          connect: { id: authorId },
        },
        images: {
          createMany: {
            data: [
              {
                url: 'url1.jpg',
                alt: 'alt1',
                additionInfoThatMustBeDisplayed: 'additionalInfo',
              },
              {
                url: 'url2.jpg',
                alt: 'alt3',
              },
            ],
          },
        },
        occurrence: {
          createMany: {
            data: [
              {
                day: 'MONDAY',
                activityStart: '2025-10-10T20:00:24.968Z',
                activityEnd: '2025-10-10T22:00:24.968Z',
              },
              {
                day: 'WEDNESDAY',
                activityStart: '2025-10-10T16:00:24.968Z',
                activityEnd: '2025-10-10T18:15:24.968Z',
              },
            ],
          },
        },
      },
      include: {
        images: true,
        occurrence: true,
      },
    });

    console.log({ response });
  } catch (error) {
    logger.warn(dbWritingErrorMessage);
    return { status: 'ERROR', response: dbWritingErrorMessage };
  }

  /** revalidation */
  revalidatePath('/');

  /* final success response */
  const successMessage = `Zajęcia: (${submittedName}) zostały zapisane.`;
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

function validateCyclicalActivityData(
  cyclicalActivity: TCyclicalActivityFormInputs
) {
  nameSchema_Required_Min2.parse(cyclicalActivity.name);
  activityTypeArraySchema.parse(cyclicalActivity.activityTypes);
  forWhomArraySchema.parse(cyclicalActivity.activitiesForWhom);
  placesArraySchema.parse(cyclicalActivity.places);
  isBooleanSchema.parse(cyclicalActivity.isToBePublished);
  isBooleanSchema.parse(cyclicalActivity.isExpiresAtRequired);
  //expiresAt
  if (cyclicalActivity.isExpiresAtRequired) {
    isDateSchema.parse(cyclicalActivity.expiresAt);
  }

  return true;
}
//TODO: może szansa aby to także zrobić singe source of truth dzieki schematowi z ZODa
