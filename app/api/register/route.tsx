import prisma from '@/prisma/client';
import { TRegisterFormValuesSent } from '@/types';
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, _res: NextResponse) {
  const body: TRegisterFormValuesSent = await req.json();
  const { name, email, password, userRole } = body;

  //TODO: check all them separatedly and log them with info which was not passed
  if (!name || !email || !password || !userRole) {
    return new NextResponse('Missing fields', { status: 400 });
  }
  const exist = await prisma.user.findUnique({ where: { email } });
  if (exist) {
    //TODO: make middleware to handle Errors to log them
    throw new Error('Email already exist');
  }
  const hashedPassword = await bcryptjs.hash(password, 10);
  let user;
  try {
    user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        role: userRole,
      },
    });
  } catch (error) {
    //TODO: make middleware to handle Errors to log them
    throw new Error('User not persisted');
  }
  return NextResponse.json(user);
}
