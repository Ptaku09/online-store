import { NextApiRequest, NextApiResponse } from 'next';
import { deleteUserById } from '../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'DELETE':
      const { token } = JSON.parse(req.body);

      try {
        await deleteUserById(token);
        res.status(200).json({ text: 'Success!' });
      } catch (err) {
        res.status(400).json(err);
      }

      break;
  }
}
