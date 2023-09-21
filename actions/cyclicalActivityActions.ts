'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { dbReadingErrorMessage, notLoggedIn } from '@/lib/api/apiTextResponses';
import logger from '@/lib/logger';
import prisma from '@/prisma/client';
import { TActionResponse, TGetAllUsersResponse, TUserPicked } from '@/types';
import { User, UserRole } from '@prisma/client';
import { getServerSession } from 'next-auth';

export async function addCyclicalActivity(
  formData: FormData
): Promise<TActionResponse> {
  /** checking session */
  const session = await getServerSession(authOptions);
  if (!session) {
    logger.warn(notLoggedIn);
    return { status: 'ERROR', response: notLoggedIn };
  }

  const authorId = session.user?.id;

  console.log('addCyclicalActivity');

  const response = await prisma.cyclicalActivity.create({
    data: {
      name: 'test1',
      activityTypes: ['PLASTICITY'],
      activitiesForWhom: ['ADULTS', 'SENIORS', 'WOMEN'],
      shortDescription: 'short desctiption',
      longDescription: 'long description',
      customLinkToDetails: 'customLinkToDetails',
      places: ['ART_ROOM'],
      isToBePublished: true,
      expiresAt: '2025-10-10T22:00:24.968Z',
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
    },
    include: {
      images: true
    }
  });

  console.log({ response });

  /////////////////////////////////////////////////////////////////////////

  //   extendedInfo: {
  //     images: [
  //       {
  //         url: 'activities_image_004.jpg',
  //         alt: 'Prezentowana wystawa miała formę wizualizacji multimedialnej opartej na filme VR 360 i odtwarzanej za pomocą przeznaczonych do tego celu okularów i słuchawek.',
  //         additionInfoThatMustBeDisplayed: null,
  //       },
  //       {
  //         url: 'activities_image_005.jpg',
  //         alt: 'Cykl dyplomowy “Subtelne Formy”, który przedstawiał ciało, jako abstrakcyjną wyłaniającą się z czerni formę.',
  //         additionInfoThatMustBeDisplayed: null,
  //       },
  //       {
  //         url: 'activities_image_006.jpg',
  //         alt: 'Cykl “Introspekcja” buduje obraz człowieka składającego się nie tylko z fizycznego wyglądu ale także z własnej emocjonalności.',
  //         additionInfoThatMustBeDisplayed: null,
  //       },
  //     ],
  //     description:
  //       '<p>\r\n            Prowadząca: <b>AGATA NIŹNIKIEWICZ</b>\r\n          </p>\r\n          <p>\r\n            Zajęcia, na których absolutnie odpoczniesz od elektroniki i na\r\n            chwilę zwolnisz, zatracając się w pracy manualnej.\r\n          </p>\r\n          <p>\r\n            Nie jest to czas wyłącznie dla osób uzdolnionych plastycznie,\r\n            ponieważ dla uczestników warsztatów przygotowane są szablony i\r\n            wzory.\r\n          </p>\r\n          <p>\r\n            Warsztaty polegają na ręcznym tworzeniu matryc w różnych materiałach\r\n            w zależności od techniki. Wyryte matryce pokrywamy farbą drukarską i\r\n            przy użyciu prasy drukarskiej przenosimy rysunek z matrycy na\r\n            papier, tworząc grafikę.\r\n          </p>\r\n          <p>\r\n            Zajęcia prowadzone w miłej atmosferze sprzyjają odprężeniu i\r\n            twórczym działaniom oraz pozwalają na chwilę relaksu, Prace\r\n            uczestników systematycznie będą prezentowane w formie wystaw.\r\n          </p>',
  //   },
  //   occurrence: [
  //     {
  //       id: '854e7c17-0uu4-4881-fff5-ce6bgezzh848',
  //       day: 'MONDAY',
  //       duration: [
  //         {
  //           activityStart: new Date('2000-01-01T18:00:00.968Z'),
  //           activityEnd: new Date('2000-01-01T20:00:00.968Z'),
  //         },
  //       ],
  //     },
  //   ],

  //   expiresAt: new Date('2025-08-10T11:00:24.968Z'),
  // },
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////

  //// model CyclicalActivity{
  ////   id String @id @default(uuid())
  ////   name String
  /////   activityTypes ActivityType[]
  ////   activitiesForWhom ForWhom[]
  ////   shortDescription String
  //   occurance CyclicalActivityOccurrence[]
  ////   places Place[]
  ////   customLinkToDetails String?
  //   expiresAt DateTime?
  ////   isToBePublished Boolean
  ////   createdAt DateTime @default(now())
  ////   updatedAt DateTime @updatedAt
  //   author User @relation(fields: [authorId], references: [id])

  // }

  // model CyclicalActivityOccurrence {
  //   id String @id @default(uuid())
  //   day Day
  //   activityStart DateTime
  //   activityEnd DateTime
  //   cyclicalActivity CyclicalActivity @relation(fields: [cyclicalActivityId], references: [id])
  //   cyclicalActivityId String

  /////////////////////////////////////////////////////////////////////////

  // /** checking values eXistenZ */
  // const submittedName = formData.get('name') as string;
  // const submittedEmail = formData.get('email') as string;
  // const submittedPassword = formData.get('password') as string;
  // const submittedConfirmPassword = formData.get('confirmPassword') as string;
  // const submittedUserRole = formData.get('userRole') as UserRole;

  // if (
  //   !submittedName ||
  //   !submittedEmail ||
  //   !submittedPassword ||
  //   !submittedConfirmPassword ||
  //   !submittedUserRole
  // ) {
  //   logger.warn(lackOfUserData);
  //   return { status: 'ERROR', response: lackOfUserData };
  // }

  // /* format validation */
  // let validationResult = false;
  // try {
  //   validationResult = validateUserData(
  //     submittedName,
  //     submittedEmail,
  //     submittedPassword,
  //     submittedConfirmPassword,
  //     submittedUserRole
  //   );
  // } catch (error) {
  //   logger.warn(badUserData);
  //   return { status: 'ERROR', response: badUserData };
  // }
  // if (validationResult) {
  //   logger.warn(badUserData);
  //   return { status: 'ERROR', response: badUserData };
  // }

  // /* validation if user already exists in db */
  // let exists: unknown;
  // try {
  //   exists = await prisma.user.findUnique({
  //     where: {
  //       email: submittedEmail,
  //     },
  //   });
  // } catch (error) {
  //   logger.warn(dbReadingErrorMessage);
  //   return { status: 'ERROR', response: dbReadingErrorMessage };
  // }
  // if (exists) {
  //   logger.warn(userAlreadyExists);
  //   return { status: 'ERROR', response: userAlreadyExists };
  // }

  // /* writing user to db */
  // const hashedPassword = await bcryptjs.hash(submittedPassword, 10);
  // try {
  //   await prisma.user.create({
  //     data: {
  //       name: submittedName,
  //       email: submittedEmail,
  //       hashedPassword,
  //       userRole: submittedUserRole,
  //     },
  //   });
  // } catch (error) {
  //   logger.warn(dbWritingErrorMessage);
  //   return { status: 'ERROR', response: dbWritingErrorMessage };
  // }

  // revalidatePath('/dashboard');

  // /* final success response */
  // const successMessage = generateUserDbWritingSuccessMessageWithData(
  //   submittedName,
  //   submittedEmail
  // );
  // logger.info(successMessage);
  // return {
  //   status: 'SUCCESS',
  //   response: successMessage,
  // };

  return {
    status: 'SUCCESS',
    response: 'temporary',
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
    userRole: user.userRole as UserRole,
  }));

  return { status: 'SUCCESS', response: usersPickedData };
}

// export async function deleteUsers(ids: string[]): Promise<TActionResponse> {
//   /** checking session */
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     logger.warn(notLoggedIn);
//     return { status: 'ERROR', response: notLoggedIn };
//   }

//   /** checking values eXistenZ */
//   if (!ids || ids.length === 0) {
//     logger.warn(badEmailFormatMessage);
//     return { status: 'ERROR', response: badEmailFormatMessage };
//   }

//   /* validation if ids already exist in db */
//   for (let i = 0; i < ids.length; i++) {
//     let exists: unknown;
//     try {
//       exists = await checkIfUserExists(ids[i]);
//     } catch (error) {
//       logger.warn(dbReadingErrorMessage);
//       return { status: 'ERROR', response: dbReadingErrorMessage };
//     }

//     if (!exists) {
//       logger.warn(userNotExistsMessage);
//       return { status: 'ERROR', response: userNotExistsMessage };
//     }
//   }

//   /* deleting users from db */
//   try {
//     await prisma.user.deleteMany({
//       where: {
//         id: {
//           in: ids,
//         },
//       },
//     });
//   } catch (error) {
//     logger.warn(dbWritingErrorMessage);
//     return { status: 'ERROR', response: dbWritingErrorMessage };
//   }

//   revalidatePath('/dashboard');

//   const responseText =
//     ids.length === 1
//       ? `Użytkownik został skasowany.`
//       : `Użytkownicy zostali skasowani.`;

//   return {
//     status: 'SUCCESS',
//     response: responseText,
//   };
// }

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
// async function checkIfUserExists(id: string) {
//   const exists = await prisma.user.findUnique({ where: { id } });
//   return exists;
// }

// function validateUserData(
//   name: string,
//   email: string,
//   password: string,
//   confirmationPassword: string,
//   userRole: UserRole
// ) {
//   nameSchema_Required_Min2.parse(name);
//   emailSchema.parse(email);
//   passwordSchema_Required_Min5_Max20.parse(password);
//   passwordSchema_Required_Min5_Max20.parse(confirmationPassword);
//   useRoleSchema.parse(userRole);
//   if (password.trim() !== confirmationPassword.trim()) {
//     throw new Error("Password and it's confirmation are not the same");
//   }
//   return true;
// }
