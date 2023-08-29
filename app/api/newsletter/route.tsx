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

export async function POST(req: NextRequest, _res: NextResponse) {
  ////vars
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
      { status: 400 }
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
    { status: 201 }
  );
}

export async function GET(req: NextRequest, _res: NextResponse) {
  return new NextResponse(JSON.stringify({ message: 'text message' }), {
    status: 200,
  });
}
