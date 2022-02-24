import { NextApiRequest, NextApiResponse } from 'next';
import { updateUserById } from '../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'PATCH':
      const { token, name, email } = JSON.parse(req.body);

      try {
        await updateUserById(token, name, email);
        res.status(200).json({ text: 'Success!' });
      } catch (err) {
        res.status(400).json(err);
      }

      break;
  }
}
