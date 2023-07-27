import { FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnecdoteData } from '../types/AnecdoteData';

interface CreateFormProps {
  onCreate: (newAnecdote: AnecdoteData) => void;
  onNotify: (content: string) => void;
}

const CreateForm: FC<CreateFormProps> = ({ onCreate, onNotify }) => {
  const navigate = useNavigate();

  const [content, setContent] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [info, setInfo] = useState<string>('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate({
      content,
      author,
      info,
      votes: 0,
      id: 0,
    });

    setContent('');
    setAuthor('');
    setInfo('');

    navigate('/');

    onNotify(`a new anecdote '${content}' created!`);
  };

  const margin = {
    marginBottom: 10,
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div style={margin}>
          Content:
          <input value={content} onChange={(e: FormEvent<HTMLInputElement>) => setContent(e.currentTarget.value)} />
        </div>
        <div style={margin}>
          Author:
          <input value={author} onChange={(e: FormEvent<HTMLInputElement>) => setAuthor(e.currentTarget.value)} />
        </div>
        <div style={margin}>
          Info:
          <input value={info} onChange={(e: FormEvent<HTMLInputElement>) => setInfo(e.currentTarget.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateForm;
