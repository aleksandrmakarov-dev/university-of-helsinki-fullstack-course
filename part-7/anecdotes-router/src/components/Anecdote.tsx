import { FC } from 'react';
import { AnecdoteData } from '../interfaces/AnecdoteData';

interface AnecdoteProps {
  anecdote?: AnecdoteData;
}

const Anecdote: FC<AnecdoteProps> = ({ anecdote }) => {
  if (!anecdote) {
    return <p>Anecdote not found</p>;
  }

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>Author: {anecdote.author}</div>
      <div>
        votes: <strong>{anecdote.votes}</strong>
      </div>
      <div>
        for more info see: <a href={anecdote.info}>{anecdote.info}</a>
      </div>
    </div>
  );
};

export default Anecdote;
