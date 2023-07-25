import axios from 'axios';
import { NoteData } from '../reducers/noteReducer';

const baseUrl = 'http://localhost:3001/notes';

const getAll = async () => {
  const respose = await axios.get(baseUrl);
  return respose.data as NoteData[];
};

const createNew = async (content: string) => {
  const obj: NoteData = {
    id: 0,
    content,
    important: false,
  };

  const respose = await axios.post(baseUrl, obj);
  return respose.data;
};

const update = async (id: number, data: NoteData) => {
  const noteResponse = await axios.get(`${baseUrl}/${id}`);
  if (!noteResponse.data) {
    throw Error('Not not found');
  }

  const updatedNote: NoteData = {
    ...noteResponse.data,
    content: data.content,
    important: data.important,
  };

  const respose = await axios.put(`${baseUrl}/${id}`, updatedNote);
  return respose.data;
};

export default {
  getAll,
  createNew,
  update,
};
