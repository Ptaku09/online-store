import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, surname, email } = req.body;

  res.status(200).json({
    user: {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
    },
  });
}
