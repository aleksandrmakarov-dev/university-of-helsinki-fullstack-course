import { FC, FormEventHandler } from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../../reducers/noteReducer';

const NoteForm = () => {
  const dispatch = useDispatch();

  const addNote: FormEventHandler<HTMLFormElement> = e => {
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
