import { FormEventHandler } from 'react';
import { createNote } from '../../reducers/noteReducer';
import { useAppDispatch } from '../../hooks';

const NoteForm = () => {
  const dispatch = useAppDispatch();

  const addNote: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    const content = e.currentTarget.note.value;
    e.currentTarget.note.value = '';
    dispatch(createNote(content));
  };

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default NoteForm;
