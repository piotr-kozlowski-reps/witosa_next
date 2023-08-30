import prisma from '@/prisma/client';
// import bcryptjs from 'bcryptjs';
import {
  badEmailFormatMessage,
  dbWritingErrorMessage,
  emailAlreadyExistsMessage,
  newsletterDbWritingSuccessMessage,
} from '@/lib/api/apiTextResponses';
import { loginEmailSchema } from '@/lib/errors/zodSchemas';
import logger from '@/lib/logger';
import { TNewsletterFormValuesSent } from '@/types';
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

export async function POST(req: NextRequest, _res: NextResponse) {
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
    loginEmailSchema.parse(email);
  } catch (error) {
    logger.warn(badEmailFormatMessage);
    return new NextResponse(
      JSON.stringify({ message: badEmailFormatMessage }),
      { status: 400 }
    );
  }

  /* validation if email already exists in db */
  const exists = await prisma.newsletter.findUnique({ where: { email } });
  if (exists) {
    logger.warn(emailAlreadyExistsMessage);
    return new NextResponse(
      JSON.stringify({ message: emailAlreadyExistsMessage }),
      {
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': origin || '*', //TODO:  make it for Postman and such: origin || '*'
          'Content-Type': 'application/json',
        },
      }
    );
  }

  /* sending email to db */
  try {
    await prisma.newsletter.create({ data: { email } });
  } catch (error) {
    logger.warn(dbWritingErrorMessage);
    return new NextResponse(
      JSON.stringify({ message: dbWritingErrorMessage }),
      { status: 500 }
    );
  }

  /* final success response */
  logger.info(newsletterDbWritingSuccessMessage);

  return new NextResponse(
    JSON.stringify({ message: newsletterDbWritingSuccessMessage }),
    {
      status: 201,
      headers: {
        'Access-Control-Allow-Origin': origin || '*', //TODO:  make it for Postman and such: origin || '*'
        'Content-Type': 'application/json',
      },
    }
  );
}

export async function GET(req: NextRequest, _res: NextResponse) {
  const origin = req.headers.get('origin');

  return new NextResponse(JSON.stringify({ message: 'text message' }), {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': origin || '*', //TODO:  make it for Postman and such: origin || '*'
      'Content-Type': 'application/json',
    },
  });
}
