import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AnecdoteData } from '../interfaces/AnecdoteData';

interface AnecdoteListProps {
  anecdotes: AnecdoteData[];
}

const AnecdoteList: FC<AnecdoteListProps> = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote: AnecdoteData) => (
        <li key={anecdote.id}>
          <Link to={`/notes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </div>
  );
};

export default AnecdoteList;
