import express, { Request, Response, Router } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import { User } from '../models/user';

const router: Router = express.Router();
const UserModel: Model<User> = require('../models/user');

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user: User | null = await UserModel.findOne({ username });
  const passwordCorrect: boolean = user === null ? false : await bcrypt.compare(password, user.passwordHash);
  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'invalid username or password' });
  }

  const tokenPayload = {
    username: user.username,
    id: user.id,
  };

  const secretKey: string | undefined = process.env.SECRET;

  if (secretKey === undefined) {
    logger.error('secret key is undefined');
    throw new Error('internal server error');
  }

  const token: string = jwt.sign(tokenPayload, secretKey, { expiresIn: 60 * 60 });

  return res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = router;
