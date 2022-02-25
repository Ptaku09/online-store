import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';
import CredentialsProvider from 'next-auth/providers/credentials';
import { findUserByEmail, validatePassword } from '../../../lib/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, {
    adapter: MongoDBAdapter(clientPromise),
    secret: process.env.NEXT_AUTH_SECRET,
    debug: true,
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
            return null;
          }

          return {
            id: user._id,
            name: user.name,
            email: user.email,
            provider: 'credentials',
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
      error: '/signin',
    },
    session: {
      strategy: 'jwt',
    },
    callbacks: {
      jwt: async ({ token, user }) => {
        if (req.url === '/api/auth/session?update') {
          const client = await clientPromise;
          const dbGoogle = client.db(process.env.DB_NAME_USERS_GOOGLE);
          const dbEmail = client.db(process.env.DB_NAME_USERS);
          const uid = new ObjectId(token.sub);

          //Check if user is logged via Google or credentials
          let updatedUser = await dbGoogle.collection('users').findOne({ _id: uid });

          if (updatedUser) {
            token.user.provider = 'google';
          } else {
            updatedUser = await dbEmail.collection('users').findOne({ _id: uid });
            token.user.provider = 'credentials';
          }

          token.user.name = updatedUser?.name;
          token.user.email = updatedUser?.email;
          token.user.image = updatedUser?.image;
        } else {
          user && (token.user = user);
        }

        token.user.id = token.sub;
        return token;
      },
      session: async ({ session, token }) => {
        session.user = token.user;

        return session;
      },
    },
  });
}
