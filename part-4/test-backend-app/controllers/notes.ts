import express, { Router, Request, Response, NextFunction } from 'express';
import mongoose, { Model } from 'mongoose';
import { Note } from '../models/note';

const router: Router = express.Router();
const NoteModel: Model<Note> = require('../models/note');

// GET all notes
router.get('/', async (req: Request, res: Response) => {
  const notes: Note[] = await NoteModel.find();
  res.json(notes);
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
router.delete('/:id', async (req: Request, res: Response, _next: NextFunction) => {
  const id = new mongoose.mongo.ObjectId(req.params.id);

  await NoteModel.findByIdAndDelete(id);
  return res.status(204).end();
});

// POST new note
router.post('/', async (req: Request, res: Response) => {
  const { body } = req;
  const note: Note = {
    id: '',
    content: body.content,
    important: body.important || false,
  };

  const createdNote = await NoteModel.create(note);
  res.status(201).json(createdNote);
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
