import prisma from '@/prisma/client';
import { TRegisterFormValuesSent } from '@/types';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body: TRegisterFormValuesSent = await request.json();
  const { name, email, password } = body;

  //TODO: check all them separatedly and log them with info which was not passed
  if (!name || !email || !password) {
    return new NextResponse('Missing fields', { status: 400 });
  }

  const exist = await prisma.user.findUnique({ where: { email } });
  if (exist) {
    //TODO: make middleware to handle Errors to log them
    throw new Error('Email already exist');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  let user;
  try {
    user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        //TODO: add role later ADMIN/USER
      },
    });
  } catch (error) {
    //TODO: make middleware to handle Errors to log them
    throw new Error('User not persisted');
  }

  return NextResponse.json(user);
}
