import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import clientPromise from './mongodb';
import { Document, WithId } from 'mongodb';

type User = {
  email: string;
  password: string;
  name: string;
  surname: string;
};

export const createUser = async ({ email, password, name, surname }: User) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

  const user = {
    id: uuidv4(),
    createdAt: Date.now(),
    email,
    name,
    surname,
    hash,
    salt,
  };

  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME_USERS);
  await db.collection('users').insertOne(user);
};

export const findUserByEmail = async (email: string | undefined) => {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME_USERS);

  return await db.collection('users').findOne({ email });
};

export const deleteUser = async (email: string) => {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME_USERS);

  await db.collection('users').deleteOne({ email });
};

export const validatePassword = async (user: WithId<Document>, inputPassword: string | undefined) => {
  const inputHash = crypto.pbkdf2Sync(inputPassword || '', user.salt, 1000, 64, 'sha512').toString('hex');

  return user.hash === inputHash;
};
