import prisma from '@/prisma/client';
// import bcryptjs from 'bcryptjs';
import {
  badEmailFormatMessage,
  dbReadingErrorMessage,
  dbWritingErrorMessage,
  emailAlreadyExistsMessage,
  newsletterDbWritingSuccessMessage,
} from '@/lib/api/apiTextResponses';
import {
  addStatusAndAllowOriginContent,
  stringifyObject,
} from '@/lib/api/responsesUtils';
import logger from '@/lib/logger';
import { emailSchema } from '@/lib/zodSchemas';
import { TNewsletterFormValuesSent } from '@/types';
import { Newsletter } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth/authOptions';
import { NextRequest, NextResponse } from 'next/server';

// export async function OPTIONS(req: NextRequest) {
//   const origin = req.headers.get('origin');
//   // const allowedOrigin = 'https://www.art-ck.pl';
//   const response = new NextResponse(null, {
//     status: 204,
//     headers: {
//       'Access-Control-Allow-Origin': origin || '*',
//       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//       'Access-Control-Allow-Headers':
//         'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
//       'Access-Control-Max-Age': '86400',
//     },
//   });

//   return response;
// }

export async function POST(req: NextRequest) {
  ////vars
  const origin = req.headers.get('origin');
  const body: TNewsletterFormValuesSent = await req.json();
  const { email } = body;

  if (!email) {
    logger.warn(badEmailFormatMessage);
    return new NextResponse(
      JSON.stringify({ message: badEmailFormatMessage }),
      { status: 400 }
    );
  }

  /* format validation */
  try {
    emailSchema.parse(email);
  } catch (error) {
    logger.warn((error as Error).stack);
    return new NextResponse(
      stringifyObject({ message: badEmailFormatMessage }),
      addStatusAndAllowOriginContent(400, origin)
    );
  }

  /* validation if email already exists in db */
  let exists: unknown;
  try {
    exists = await prisma.newsletter.findUnique({ where: { email } });
  } catch (error) {
    logger.warn((error as Error).stack);
    return new NextResponse(
      JSON.stringify({ message: dbReadingErrorMessage }),
      { status: 500 }
    );
  }
  if (exists) {
    logger.warn(emailAlreadyExistsMessage);
    return new NextResponse(
      stringifyObject({ message: emailAlreadyExistsMessage }),
      addStatusAndAllowOriginContent(400, origin)
    );
  }

  /* sending email to db */
  try {
    await prisma.newsletter.create({ data: { email } });
  } catch (error) {
    logger.warn((error as Error).stack);
    return new NextResponse(
      JSON.stringify({ message: dbWritingErrorMessage }),
      { status: 500 }
    );
  }

  /* final success response */
  logger.info(newsletterDbWritingSuccessMessage);
  return new NextResponse(
    stringifyObject({
      message: newsletterDbWritingSuccessMessage,
    }),
    addStatusAndAllowOriginContent(201, origin)
  );
}

export async function GET(req: NextRequest) {
  /** checking session */
  const session = await getServerSession(authOptions);

  const origin = req.headers.get('origin');

  let emailsInNewsletter: Newsletter[] = [];
  try {
    emailsInNewsletter = await prisma.newsletter.findMany();
  } catch (error) {
    logger.warn((error as Error).stack);
    return new NextResponse(
      JSON.stringify({
        message: dbReadingErrorMessage,
      }),
      { status: 500 }
    );
  }

  return new NextResponse(
    stringifyObject({
      emailsInNewsletter,
      session: session?.user?.name || 'no session',
    }),
    addStatusAndAllowOriginContent(200, origin)
  );
}
