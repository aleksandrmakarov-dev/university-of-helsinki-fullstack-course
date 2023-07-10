import { FormEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';
import anecdoteService from '../../services/anecdote-service';
import { appendAnecdote } from '../../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const [content, setContent] = useState<string>('');
  const onContentChange: FormEventHandler<HTMLInputElement> = e => setContent(e.currentTarget.value);

  const dispatch = useDispatch();
  const onSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    if (content.length > 0) {
      try {
        const response = await anecdoteService.createNew(content);
        dispatch(appendAnecdote(response));
        setContent('');
      } catch (error: any) {
        console.log(error);
      }
    }
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
