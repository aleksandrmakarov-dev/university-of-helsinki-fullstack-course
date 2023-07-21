import { FormEvent } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { AnecdoteData } from '../App';
import { createAnecdote } from '../requests';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (createdAnecdote: AnecdoteData) => {
      const anecdotes: AnecdoteData[] = queryClient.getQueryData('anecdotes') ?? [];
      queryClient.setQueryData('anecdotes', anecdotes.concat(createdAnecdote));
    },
  });

  const onCreate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = event.currentTarget.anecdote.value;
    event.currentTarget.anecdote.value = '';
    console.log('new anecdote');
    const newAnecdote: AnecdoteData = {
      content,
      votes: 0,
    };
    newAnecdoteMutation.mutate(newAnecdote);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
