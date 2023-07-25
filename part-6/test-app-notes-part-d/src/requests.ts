import axios from 'axios';
import { Note } from './App';

const baseUrl = 'http://localhost:3001/notes';

export const getNotes = () => axios.get(baseUrl).then(res => res.data);

export const createNote = (newNote: Note) => axios.post(baseUrl, newNote).then(res => res.data);

export const updateNote = (updatedNote: Note) =>
  axios.put(`${baseUrl}/${updatedNote.id}`, updatedNote).then(res => res.data);
