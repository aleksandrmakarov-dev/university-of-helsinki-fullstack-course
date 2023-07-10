import { FormEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';
import anecdoteService from '../../services/anecdote-service';
import { appendAnecdote, createAnecdote } from '../../reducers/anecdoteReducer';
import { useAppDispatch } from '../../hooks';

const AnecdoteForm = () => {
  const [content, setContent] = useState<string>('');
  const onContentChange: FormEventHandler<HTMLInputElement> = e => setContent(e.currentTarget.value);

  const dispatch = useAppDispatch();
  const onSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    dispatch(createAnecdote(content));
    setContent('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={content} onChange={onContentChange} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
