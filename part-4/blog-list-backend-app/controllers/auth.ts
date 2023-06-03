import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import mongoose, { Model } from 'mongoose';
import express, { Request, Response, Router } from 'express';
import { User } from '../models/user';

interface LoginRequest {
  username: string;
  password: string;
}

const router: Router = express.Router();
const UserModel: Model<User> = require('../models/user');

router.post('/login', async (req: Request, res: Response) => {
  const { username, password }: LoginRequest = req.body;

  if (!username) {
    return res.status(400).json({ error: '`username` is required' });
  }

  if (!password) {
    return res.status(400).json({ error: '`password` is required' });
  }

  const user: User | null = await UserModel.findOne({ username });

  const passwordCheck: boolean = user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCheck)) {
    return res.status(401).json({ error: 'invalid username or password' });
  }

  const secret: string | undefined = process.env.SECRET;

  if (!secret) {
    throw new Error('secret key is undefined');
  }

  const payload = {
    id: user.id,
    username: user.username,
  };

  const token: string = await jwt.sign(payload, secret, { expiresIn: 60 * 60 });

  return res.json({
    username: user.username,
    name: user.name,
    token,
  });
});

module.exports = router;
