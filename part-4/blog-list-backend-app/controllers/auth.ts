import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import express, { Request, Response, Router } from 'express';
import { User } from '../models/user';
import { InternalError, UnAuthorizedError, ValidationError } from '../utils/custom-errors';

interface LoginRequest {
  username: string;
  password: string;
}

const router: Router = express.Router();
const UserModel: Model<User> = require('../models/user');
const config = require('../utils/config');

router.post('/login', async (req: Request, res: Response) => {
  const { username, password }: LoginRequest = req.body;

  if (!username) {
    throw new ValidationError('`username` is required');
  }

  if (!password) {
    throw new ValidationError('`password` is required');
  }

  const user: User | null = await UserModel.findOne({ username });

  const passwordCheck: boolean = user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCheck)) {
    throw new UnAuthorizedError('invalid username or password');
  }

  const secret: string | undefined = config.SECRET;

  if (!secret) {
    throw new InternalError('secret key is undefined');
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
