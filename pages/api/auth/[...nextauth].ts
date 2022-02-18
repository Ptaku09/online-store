import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';
import CredentialsProvider from 'next-auth/providers/credentials';
import { findUserByEmail, validatePassword } from '../../../lib/auth';

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'johndoe@gmail.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const user = await findUserByEmail(credentials?.email);

        if (!user) {
          return null;
        }

        const isValid = await validatePassword(user, credentials?.password);

        if (!isValid) {
          throw new Error('Wrong password or email');
        }

        return {
          id: user._id,
          name: user.name + ' ' + user.surname,
          email: user.email,
        };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_SECRET_ID || '',
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.sub;

      return session;
    },
  },
});
