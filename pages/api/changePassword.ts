import { NextApiRequest, NextApiResponse } from 'next';
import { changePassword, findUserByEmail, validatePassword } from '../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    const { email, current, passwordToSet } = JSON.parse(req.body);

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json('No user found');
    }

    const isValid = await validatePassword(user, current);

    if (isValid) {
      try {
        await changePassword(email, passwordToSet);
        return res.status(200).json({ text: 'Success!' });
      } catch (err) {
        return res.status(400).json(err);
      }
    } else {
      return res.status(409).json('Wrong password!');
    }
  }
}
