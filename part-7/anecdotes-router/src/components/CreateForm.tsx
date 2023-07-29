import { FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnecdoteData } from '../interfaces/AnecdoteData';
import useField from '../hooks/useField';

interface CreateFormProps {
  onCreate: (newAnecdote: AnecdoteData) => void;
  onNotify: (content: string) => void;
}

const CreateForm: FC<CreateFormProps> = ({ onCreate, onNotify }) => {
  const navigate = useNavigate();

  const content = useField('text');
  const author = useField('text');
  const info = useField('text');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
      id: 0,
    });

    // setContent('');
    // setAuthor('');
    // setInfo('');

    navigate('/');

    onNotify(`a new anecdote '${content.value}' created!`);
  };

  const margin = {
    marginBottom: 10,
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div style={margin}>
          Content:
          <input {...content} />
        </div>
        <div style={margin}>
          Author:
          <input {...author} />
        </div>
        <div style={margin}>
          Info:
          <input {...info} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateForm;
