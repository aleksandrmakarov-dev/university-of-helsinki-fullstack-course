import express, { Request, Response, Router } from 'express';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../models/user';

interface UserCreateRequest {
  username: string;
  name: string;
  password: string;
}

const router: Router = express.Router();
const UserModel: Model<User> = require('../models/user');

// GET all users
router.get('/', async (req: Request, res: Response) => {
  const users: User[] = await UserModel.find().populate('blogs', { user: 0, likes: 0 });
  return res.json(users);
});

// POST new user
router.post('/', async (req: Request, res: Response) => {
  const { username, name, password }: UserCreateRequest = req.body;

  const minLength = 3;

  if (password.length < minLength) {
    return res.status(400).json({
      error: `User validation failed: username: Path \`password\` is shorter than the minimum allowed length (${minLength}).`,
    });
  }

  const saltRounds = 10;
  const passwordHash: string = await bcrypt.hash(password, saltRounds);

  const newUser: User = new UserModel({
    username,
    name,
    passwordHash,
  });

  const createdUser: User = await UserModel.create(newUser);

  return res.status(201).json(createdUser);
});

module.exports = router;
