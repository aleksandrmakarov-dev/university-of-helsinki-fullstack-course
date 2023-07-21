import { FormEvent } from 'react';

const AnecdoteForm = () => {
  const onCreate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = event.currentTarget.anecdote.value;
    event.currentTarget.anecdote.value = '';
    console.log('new anecdote');
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
