import express, { Request, Response, Router } from 'express';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../models/user';
import { BadRequestError, NotFoundError } from '../utils/custom-errors';

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

router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const user: User | null = await UserModel.findById(id).populate('blogs', { user: 0, likes: 0 });

  if (user === null) {
    throw new NotFoundError(`User with id ${id} not found`);
  }

  return res.json(user);
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

router.put('/change-password', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const minLength = 3;

  if (password.length < minLength) {
    return res.status(400).json({
      error: `User validation failed: username: Path \`password\` is shorter than the minimum allowed length (${minLength}).`,
    });
  }

  const saltRounds = 10;
  const passwordHash: string = await bcrypt.hash(password, saltRounds);

  const foundUser: User | null = await UserModel.findOne({ username });
  if (!foundUser) {
    return new BadRequestError('User not found');
  }

  await UserModel.findByIdAndUpdate(foundUser.id, { ...foundUser, passwordHash });

  return res.status(204).end();
});

module.exports = router;
