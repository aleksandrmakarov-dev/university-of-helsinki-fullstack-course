import { FormEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAnecdoteAction } from '../../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const [content, setContent] = useState<string>('');
  const onContentChange: FormEventHandler<HTMLInputElement> = e => setContent(e.currentTarget.value);

  const dispatch = useDispatch();
  const onSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    if (content.length > 0) {
      dispatch(addAnecdoteAction(content));
      setContent('');
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
