import express, { Router, Request, Response } from 'express';
import mongoose, { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { Note } from '../models/note';
import { User } from '../models/user';
import { AuthorizeRequest } from '../utils/middleware';

const router: Router = express.Router();
const NoteModel: Model<Note> = require('../models/note');
const UserModel: Model<User> = require('../models/user');

// GET all notes
router.get('/', async (req: AuthorizeRequest, res: Response) => {
  const notes: Note[] = await NoteModel.find().populate('user', { username: 1, name: 1 });
  return res.json(notes);
});

// GET note by id
router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;

  const foundNote: Note | null = await NoteModel.findById(id);

  if (foundNote === null) {
    res.status(404).json({ error: `note with id = ${id} not found` });
  } else {
    res.json(foundNote);
  }
});

// DELETE note by id
router.delete('/:id', async (req: Request, res: Response) => {
  const id = new mongoose.mongo.ObjectId(req.params.id);

  await NoteModel.findByIdAndDelete(id);
  return res.status(204).end();
});

// POST new note
router.post('/', async (req: AuthorizeRequest, res: Response) => {
  const { content, important } = req.body;

  if (!req.user) {
    return res.status(401).json({ error: 'invalid token' });
  }

  const user: User | null = await UserModel.findById(req.user.id);

  if (user === null) {
    return res.status(400).json({ error: `user with id = ${req.user.id} not found` });
  }

  const newNote: Note = new NoteModel({
    content,
    important: important || false,
    user: user.id,
  });

  const createdNote: Note = await NoteModel.create(newNote);

  user.notes.push(createdNote);
  await user.save();

  return res.status(201).json(createdNote);
});

// PUT note by id
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  const updatedNote: Note | null = await NoteModel.findByIdAndUpdate(
    id,
    {
      content: body.content,
      important: body.important,
    },
    { new: true, runValidators: true, context: 'query' }
  );

  if (updatedNote === null) {
    res.status(404).json({ error: `note wit id = ${id} not found` });
  } else {
    res.json(updatedNote);
  }
});

module.exports = router;
