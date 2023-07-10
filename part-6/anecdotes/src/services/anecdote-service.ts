import axios from 'axios';
import { AnecdoteData } from '../reducers/anecdoteReducer';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content: string) => {
  const obj: AnecdoteData = {
    id: 0,
    content,
    votes: 0,
  };

  const response = await axios.post(`${baseUrl}`, obj);
  return response.data;
};

export default {
  getAll,
  createNew,
};
