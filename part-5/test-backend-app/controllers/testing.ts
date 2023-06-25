import express, { Request, Response, Router } from 'express';
import { Model } from 'mongoose';
import { Note } from '../models/note';
import { User } from '../models/user';

const router: Router = express.Router();
const NoteModel: Model<Note> = require('../models/note');
const UserModel: Model<User> = require('../models/user');

router.post('/reset', async (_req: Request, res: Response) => {
  await NoteModel.deleteMany();
  await UserModel.deleteMany();

  return res.status(204).end();
});

module.exports = router;
