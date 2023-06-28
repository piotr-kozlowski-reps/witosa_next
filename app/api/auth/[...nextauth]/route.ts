import prisma from '@/prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt';
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
        name: {
          label: 'Nazwa',
          type: 'text',
          placeholder: 'wprowadź swoje imię',
        },
      },

      async authorize(credentials) {
        //TODO: rewrite later with loging and errors via middleware
        if (!credentials?.email || !credentials.password) {
          throw new Error('Please enter email and password. ');
        } //TODO: podziel to i daj w osobnych ifach, żeby zalogować czego brakowąło

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          console.log('no user - throwing error');
          throw new Error('no user found');
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!passwordMatch) {
          throw new Error('Incorrect password');
        }

        return user;
      },
    }),
  ],
  secret: process.env.SECRET,
  session: { strategy: 'jwt' },
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
