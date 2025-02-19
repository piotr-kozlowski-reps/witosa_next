import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/prisma/client';
import CredentialsProvider from 'next-auth/providers/credentials';
import logger from '@/lib/logger';
import {
  emailSchema,
  passwordSchema_Required_Min5_Max20,
} from '@/lib/zodSchemas';
import { getExceptionStack } from '@/lib/errors/ErrorUtils';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'wprowadź swój email',
        },
        password: {
          label: 'Hasło',
          type: 'text',
        },
      },

      async authorize(credentials) {
        ////vars
        const badLoginCredentialsMessage =
          'Podano złe dane logowania. Prosimy o wpisanie poprawnych danych.';

        ////logic
        /* email and password validation **/
        if (!credentials?.email) {
          logger.warn(badLoginCredentialsMessage);
          throw new Error(badLoginCredentialsMessage);
        }

        if (!credentials?.password) {
          logger.warn(badLoginCredentialsMessage);
          throw new Error(badLoginCredentialsMessage);
        }

        try {
          emailSchema.parse(credentials.email);
          passwordSchema_Required_Min5_Max20.parse(credentials.password);
        } catch (error) {
          logger.warn((error as Error).stack);
          throw new Error(badLoginCredentialsMessage);
        }

        /* user validation **/
        let user = null;
        try {
          user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });
        } catch (error) {
          const exceptionStack = getExceptionStack(error);
          logger.error(exceptionStack);
        }

        if (!user || !user?.hashedPassword) {
          logger.warn(
            `Nie znaleziono użytkownika, email: ${credentials.email}`
          );
          throw new Error(`No user found.`);
        }

        let passwordMatch;
        try {
          passwordMatch = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );
        } catch (error) {
          const exceptionStack = getExceptionStack(error);
          logger.error(exceptionStack);
        }

        if (!passwordMatch) {
          logger.warn(
            `Podano złe hasło użytkownika, email: ${credentials.email}`
          );
          throw new Error('Incorrect password.');
        }

        logger.info(`Użytkownik, email: ${credentials.email} zalogowany.`);
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userRole = user.userRole;
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.userRole = token.userRole;
        session.user.id = token.id;
      }

      return session;
    },
  },
  secret: process.env.SECRET,
  session: { strategy: 'jwt' },
  debug: process.env.NODE_ENV === 'development',
};
