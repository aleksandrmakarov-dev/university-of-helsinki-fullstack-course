import express, { Request, Response, Router } from 'express';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDTO } from '../models/user';

const router: Router = express.Router();
const UserModel: Model<User> = require('../models/user');

router.post('/', async (req: Request, res: Response) => {
  const { username, name, password } = req.body;

  const saltRounds = 10;
  const passwordHash: string = await bcrypt.hashSync(password, saltRounds);

  const newUser: User = {
    username,
    name,
    passwordHash,
  };

  const createdUser: UserDTO = await UserModel.create(newUser);

  res.status(201).json(createdUser);
});

router.get('/', async (req: Request, res: Response) => {
  const users: UserDTO[] = await UserModel.find();
  res.json(users);
});

module.exports = router;
