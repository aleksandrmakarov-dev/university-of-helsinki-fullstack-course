import { FC, FormEvent } from 'react';
import useField from '../hooks/useField';
import NoteData from '../interfaces/NoteData';

interface NoteFormProps {
  onCreate: (note: NoteData) => Promise<NoteData>;
}

const NoteForm: FC<NoteFormProps> = ({ onCreate }) => {
  const { reset: resetContent, ...contentInput } = useField<string>('text', '');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await onCreate({ id: 0, content: contentInput.value });

    resetContent();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          Content: <input {...contentInput} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NoteForm;
