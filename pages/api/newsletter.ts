import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  switch (req.method) {
    case 'POST':
      const bodyObject = JSON.parse(req.body);
      const newUser = await db.collection('users').insertOne(bodyObject);
      res.json({ status: 200, data: newUser });
      break;

    case 'GET':
      const users = await db.collection('users').find({}).toArray();
      res.status(200).json({ data: users });
      break;
  }
}
