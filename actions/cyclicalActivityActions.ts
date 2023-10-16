'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import {
  badCyclicalActivitiesData,
  cyclicalActivityNotExistsMessage,
  dbDeletingErrorMessage,
  dbReadingErrorMessage,
  dbWritingErrorMessage,
  imageCreationErrorMessage,
  notLoggedIn,
} from '@/lib/api/apiTextResponses';
import { validateValuesForCyclicalActivities } from '@/lib/forms/cyclical-activities-form';
import logger from '@/lib/logger';
import { generateFileName } from '@/lib/textHelpers';
import prisma from '@/prisma/client';
import {
  TActionResponse,
  TCyclicalActivityFormInputs,
  TCyclicalActivityWithImageAndOccurrence,
  TGetAllCyclicalActivitiesResponse,
  TGetOneCyclicalActivityResponse,
  TImageCyclicalActivityForDB,
  TOccurrence,
} from '@/types';
import {
  CyclicalActivity,
  Day,
  ImageCyclicalActivity,
  Prisma,
} from '@prisma/client';
import { unlink } from 'fs/promises';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import sharp from 'sharp';

export async function addCyclicalActivity(
  values: TCyclicalActivityFormInputs
): Promise<TActionResponse> {
  /**
   * checking session
   * */
  const session = await getServerSession(authOptions);
  if (!session) {
    logger.warn(notLoggedIn);
    return { status: 'ERROR', response: notLoggedIn };
  }

  /* 
  data validation 
  */
  const validationResult = validateValuesForCyclicalActivities(
    values as Object
  );
  if (!validationResult) {
    logger.warn(badCyclicalActivitiesData);
    return { status: 'ERROR', response: badCyclicalActivitiesData };
  }

  /* 
 writing cyclical activity to db 
 */
  const authorId = session.user?.id;
  const isIncludeImages = !values.isCustomLinkToDetails;
  const occurrencePreparedData: TOccurrence[] =
    prepareOccurrenceDataForSavingInDB(values);

  //
  const currentlyCreatedImagesToBeDeletedWhenError: string[] = [];

  let imagesPreparedData: TImageCyclicalActivityForDB[];
  try {
    imagesPreparedData = await prepareImageDataForSavingInDB(
      values,
      currentlyCreatedImagesToBeDeletedWhenError
    );
    // throw new Error('test');
  } catch (error) {
    logger.warn(dbWritingErrorMessage);
    await deleteImagesFiles(currentlyCreatedImagesToBeDeletedWhenError);
    return { status: 'ERROR', response: imageCreationErrorMessage };
  }

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
    await deleteImagesFiles(currentlyCreatedImagesToBeDeletedWhenError);
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
  /**
   * checking session
   * */
  const session = await getServerSession(authOptions);
  if (!session) {
    logger.warn(notLoggedIn);
    return { status: 'ERROR', response: notLoggedIn };
  }

  /**
   * checking values eXistenZ
   * */
  if (!ids || ids.length === 0) {
    logger.warn(badCyclicalActivitiesData);
    return { status: 'ERROR', response: badCyclicalActivitiesData };
  }

  const imagesToBeDeleted: string[] = [];
  /* 
  validation if ids already exist in db
   */
  for (let i = 0; i < ids.length; i++) {
    let exists: unknown;
    try {
      exists = await checkIfCyclicalActivityExists(ids[i]);
      if (exists && typeof exists === 'object' && 'images' in exists) {
        const images = exists.images as ImageCyclicalActivity[];
        images.forEach((image) => imagesToBeDeleted.push(image.url));
      }
    } catch (error) {
      logger.warn(dbReadingErrorMessage);
      return { status: 'ERROR', response: dbReadingErrorMessage };
    }
    if (!exists) {
      logger.warn(cyclicalActivityNotExistsMessage);
      return { status: 'ERROR', response: cyclicalActivityNotExistsMessage };
    }
  }

  /* 
  deleting users from db
  */
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

    // let transaction: unknown;
    try {
      await prisma.$transaction([
        deleteCyclicalActivityImages,
        deleteCyclicalActivityOccurrence,
        deleteCyclicalActivity,
      ]);
    } catch (error) {
      logger.warn(dbDeletingErrorMessage);
      return { status: 'ERROR', response: dbDeletingErrorMessage };
    }
  }

  /* 
  deleting images from server (from deleted cyclical activity)
  */
  try {
    await deleteImagesFiles(imagesToBeDeleted);
  } catch (error) {
    logger.error((error as Error).stack);
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
  return { status: 'SUCCESS', response: cyclicalActivities };
}

export async function getCyclicalActivity(
  id: string
): Promise<TGetOneCyclicalActivityResponse> {
  let cyclicalActivity: TCyclicalActivityWithImageAndOccurrence | null;

  try {
    cyclicalActivity = await prisma.cyclicalActivity.findFirst({
      where: { id },
      include: {
        images: true,
        occurrence: true,
      },
    });
  } catch (error) {
    logger.warn(dbReadingErrorMessage);
    return { status: 'ERROR', response: dbReadingErrorMessage };
  }

  if (!cyclicalActivity) {
    return { status: 'ERROR', response: cyclicalActivityNotExistsMessage };
  }

  return { status: 'SUCCESS', response: cyclicalActivity };
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
  const exists = await prisma.cyclicalActivity.findUnique({
    where: { id },
    include: { images: true },
  });
  return exists;
}

function prepareOccurrenceDataForSavingInDB(
  values: TCyclicalActivityFormInputs
) {
  return values.occurrence!.map((occurrenceItem) => ({
    day: occurrenceItem.day as Day,
    activityStart: occurrenceItem.activityStart as Date,
    activityEnd: occurrenceItem.activityStart as Date,
  }));
}

async function prepareImageDataForSavingInDB(
  values: TCyclicalActivityFormInputs,
  createdImagesArray: string[]
): Promise<TImageCyclicalActivityForDB[]> {
  const originalImagesData = values.images;

  let result: TImageCyclicalActivityForDB[] = [];
  if (!originalImagesData) {
    return result;
  }
  for (let i = 0; i < originalImagesData.length; i++) {
    const imageUrl =
      await generateImageUrlAfterCreatingImageIfNeeded_Or_PassPathString(
        originalImagesData[i].file as string
      );

    //adding created image url to be deleted when some error occur
    createdImagesArray.push(imageUrl);

    result.push({
      url: imageUrl,
      alt: originalImagesData[i].alt as string,
      additionInfoThatMustBeDisplayed: originalImagesData[i]
        .additionInfoThatMustBeDisplayed
        ? (originalImagesData[i].additionInfoThatMustBeDisplayed as string)
        : null,
    });
  }
  return result;
}
async function generateImageUrlAfterCreatingImageIfNeeded_Or_PassPathString(
  file: string
): Promise<string> {
  console.log({ file });

  if (file.startsWith('data:image') && file.includes('base64')) {
    const imageUrl = await proccessAndSaveImageOnServer(file);
    return imageUrl;
  }

  return file;
}

async function proccessAndSaveImageOnServer(
  fileAsBase64: string
): Promise<string> {
  if (!fileAsBase64) {
    throw new Error('No base 64 image');
  }

  const fileName = `./public/${generateFileName()}.jpg`;

  try {
    const uri = fileAsBase64.split(';base64,').pop();
    let buffer = Buffer.from(uri as string, 'base64');
    const image = await sharp(buffer)
      .resize({
        width: 1140,
        withoutEnlargement: true,
      })
      .toFormat('jpg', { compression: '80' })
      .toFile(fileName);

    console.log('saved image: ', { image });
  } catch (error) {
    logger.error(error);
    throw new Error('Unable to save image on server.');
  }

  return fileName.replace('./public/', '');
}

async function deleteImagesFiles(filesArray: string[]): Promise<boolean> {
  let result = true;
  for (let i = 0; i < filesArray.length; i++) {
    try {
      await unlink(`public/${filesArray[i]}`);
    } catch (error) {
      logger.error(`Deleting file: ${filesArray[i]} unsuccessful.`);
      result = false;
    }
  }

  return result;
}
