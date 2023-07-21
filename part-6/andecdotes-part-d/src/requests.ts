import axios from 'axios';
import { AnecdoteData } from './App';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAnecdotes = () => {
  return axios.get(baseUrl).then(response => response.data);
};

export const addAnecdote = (newAnecdote: AnecdoteData) => {
  return axios.post(baseUrl, newAnecdote).then(respose => respose.data);
};

export const updateAnecdote = (updatedAnecdote: AnecdoteData) => {
  return axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(response => response.data);
};
