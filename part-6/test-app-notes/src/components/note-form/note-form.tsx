import { FC, FormEventHandler } from 'react';
import { useDispatch } from 'react-redux';
import { NoteData, appendNote, createNote } from '../../reducers/noteReducer';
import notesService from '../../services/notes-service';

const NoteForm = () => {
  const dispatch = useDispatch();

  const addNote: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    const content = e.currentTarget.note.value;
    e.currentTarget.note.value = '';
    const newNote: NoteData = await notesService.createNew(content);
    dispatch(appendNote(newNote));
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
