import express, { Router, Request, Response, NextFunction } from 'express';
import mongoose, { Model } from 'mongoose';
import { INote } from '../models/note';

const router: Router = express.Router();
const Note: Model<INote> = require('../models/note');

// GET all notes
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  Note.find()
    .then((response: INote[]) => {
      return res.json(response);
    })
    .catch(e => next(e));
});

// GET note by id
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  Note.findById(id)
    .then((response: INote | null) => {
      if (response === null) {
        return res.status(404).json({ error: 'note with given id not found' });
      }
      return res.json(response);
    })
    .catch(e => next(e));
});

// DELETE note by id
router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  const id = new mongoose.mongo.ObjectId(req.params.id);
  Note.deleteOne({ _id: id })
    .then(() => {
      return res.status(204).end();
    })
    .catch(e => next(e));
});

// POST new note
router.post('/', (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const note: INote = {
    id: '',
    content: body.content,
    important: body.important || false,
  };

  Note.create(note)
    .then((response: INote) => {
      return res.json(response);
    })
    .catch(e => next(e));
});

// PUT note by id
router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { body } = req;
  Note.findByIdAndUpdate(
    id,
    {
      content: body.content,
      important: body.important,
    },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((response: INote | null) => {
      if (response === null) {
        return res.status(404).json({ error: `note wit id = ${id} not found` });
      }
      return res.json(response);
    })
    .catch(e => next(e));
});

module.exports = router;
