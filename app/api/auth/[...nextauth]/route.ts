import { getExceptionStack } from '@/lib/errors/ErrorUtils';
import { loginEmailSchema, loginPasswordSchema } from '@/lib/errors/zodSchemas';
import logger from '@/lib/logger';
import prisma from '@/prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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
          loginEmailSchema.parse(credentials.email);
          loginPasswordSchema.parse(credentials.password);
        } catch (error) {
          logger.warn(badLoginCredentialsMessage);
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
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }

      return session;
    },
  },
  secret: process.env.SECRET,
  session: { strategy: 'jwt' },
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
