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

  const { reset: resetContent, ...content } = useField('text');
  const { reset: resetAuthor, ...author } = useField('text');
  const { reset: resetInfo, ...info } = useField('text');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
      id: 0,
    });

    resetAllFields();

    navigate('/');

    onNotify(`a new anecdote '${content.value}' created!`);
  };

  const resetAllFields = () => {
    resetContent();
    resetAuthor();
    resetInfo();
  };
  const marginBottom = {
    marginBottom: 10,
  };

  const marginRight = {
    marginRight: 10,
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div style={marginBottom}>
          Content:
          <input {...content} />
        </div>
        <div style={marginBottom}>
          Author:
          <input {...author} />
        </div>
        <div style={marginBottom}>
          Info:
          <input {...info} />
        </div>
        <button type="submit" style={marginRight}>
          Submit
        </button>
        <button type="button" onClick={resetAllFields}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
