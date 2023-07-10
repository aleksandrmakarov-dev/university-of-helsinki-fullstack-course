import { NoteData, toggleImportanceOf } from '../../reducers/noteReducer';
import Note from '../note/note';
import notesService from '../../services/notes-service';
import { AppState } from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks';

const Notes = () => {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state: AppState) => {
    if (state.filter === 'ALL') {
      return state.notes;
    }
    return state.filter === 'IMPORTANT'
      ? state.notes.filter(note => note.important)
      : state.notes.filter(note => !note.important);
  });

  const toggleImportance = (note: NoteData) => {
    notesService
      .update(note.id, { ...note, important: !note.important })
      .then(_response => {
        dispatch(toggleImportanceOf(note.id));
      })
      .catch(e => console.log(e));
  };

  return (
    <div>
      <ul>
        {notes.map((note: NoteData) => (
          <Note key={note.id} note={note} handleClick={() => toggleImportance(note)} />
        ))}
      </ul>
    </div>
  );
};

export default Notes;
