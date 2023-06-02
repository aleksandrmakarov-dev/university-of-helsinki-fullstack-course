import express, { Request, Response, Router } from 'express';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../models/user';

const router: Router = express.Router();
const UserModel: Model<User> = require('../models/user');

router.post('/', async (req: Request, res: Response) => {
  const { username, name, password } = req.body;

  const saltRounds = 10;
  const passwordHash: string = await bcrypt.hash(password, saltRounds);

  const newUser: User = new UserModel({
    username,
    name,
    passwordHash,
  });

  const createdUser: User = await UserModel.create(newUser);

  res.status(201).json(createdUser);
});

router.get('/', async (req: Request, res: Response) => {
  const users: User[] = await UserModel.find().populate('notes');
  res.json(users);
});

router.get('/:id', async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const user: User | null = await UserModel.findById(id);
  if (user === null) {
    res.status(404).json({ error: `user with id = ${id} not found` });
  }
  res.json(user);
});

module.exports = router;
