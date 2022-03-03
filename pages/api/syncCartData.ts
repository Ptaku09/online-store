import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'bson';
import { Product } from '../../providers/CartDataProvider';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const dbGoogle = client.db(process.env.DB_NAME_USERS_GOOGLE);
  const dbEmail = client.db(process.env.DB_NAME_USERS);
  const { token } = JSON.parse(req.body);
  const uid = new ObjectId(token);

  switch (req.method) {
    case 'POST':
      let user = await dbGoogle.collection('users').findOne({ _id: uid });
      !user ? (user = await dbEmail.collection('users').findOne({ _id: uid })) : null;

      res.status(200).json({
        cartProducts: user?.cartProducts || ([] as Product[]),
        cartValue: user?.cartValue || 0,
        cartAmount: user?.cartAmount || 0,
      });

      break;

    case 'PATCH':
      const { cartProducts, cartValue, cartAmount } = JSON.parse(req.body);

      try {
        await dbGoogle
          .collection('users')
          .findOneAndUpdate({ _id: uid }, { $set: { cartProducts: cartProducts, cartValue: cartValue, cartAmount: cartAmount } });
        await dbEmail
          .collection('users')
          .findOneAndUpdate({ _id: uid }, { $set: { cartProducts: cartProducts, cartValue: cartValue, cartAmount: cartAmount } });

        res.status(200).json('Saved in db!');
      } catch (e) {
        res.status(400).json(e);
      }

      break;
  }
}
