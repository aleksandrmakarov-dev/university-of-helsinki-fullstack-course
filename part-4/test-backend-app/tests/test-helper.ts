import { Model } from 'mongoose';
import { Note } from '../models/note';
import { User, UserDTO } from '../models/user';

const NoteModel: Model<Note> = require('../models/note');
const UserModel: Model<User> = require('../models/user');

const initialNotes: Note[] = [
  {
    id: '',
    content: 'HTML is easy',
    important: false,
  },
  {
    id: '',
    content: 'Browser can execute only JavaScript',
    important: true,
  },
];

const nonExistingId = async (): Promise<string> => {
  const note: Note = {
    id: '',
    content: 'will remove this soon',
    important: false,
  };

  const createdNote: Note = await NoteModel.create(note);
  await NoteModel.findByIdAndDelete(createdNote.id);

  return createdNote.id;
};

const notesIdDb = async (): Promise<Note[]> => {
  const notes: Note[] = (await NoteModel.find()).map(note => note.toJSON());
  return notes;
};

const usersInDb = async (): Promise<UserDTO[]> => {
  const users: UserDTO[] = (await UserModel.find()).map(user => user.toJSON());
  return users;
};

module.exports = {
  initialNotes,
  nonExistingId,
  notesIdDb,
  usersInDb,
};
