import { NextApiRequest, NextApiResponse } from 'next';
import { createUser, findUserByEmail } from '../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      const { email, password, name, surname } = JSON.parse(req.body);

      const accountExisted = await findUserByEmail(email);

      if (accountExisted) {
        return res.status(409).json({ text: 'The email has already been used!' });
      }

      const user = { email, password, name, surname };

      createUser(user)
        .then(() => res.status(200).json({ text: 'Success!' }))
        .catch((e) => res.status(400).send(e));

      break;
  }
}
