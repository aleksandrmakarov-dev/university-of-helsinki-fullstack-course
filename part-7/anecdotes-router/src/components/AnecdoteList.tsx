import { FC } from 'react';
import { AnecdoteData } from '../types/AnecdoteData';

interface AnecdoteListProps {
  anecdotes: AnecdoteData[];
}

const AnecdoteList: FC<AnecdoteListProps> = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote: AnecdoteData) => (
        <li key={anecdote.id}>{anecdote.content}</li>
      ))}
    </div>
  );
};

export default AnecdoteList;
