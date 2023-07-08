import { useDispatch, useSelector } from 'react-redux';
import { NoteData, toggleImportanceOf } from '../../reducers/noteReducer';
import Note from '../note/note';
import { AppState } from '../..';

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state: AppState) => {
    if (state.filter === 'ALL') {
      return state.notes;
    }
    return state.filter === 'IMPORTANT'
      ? state.notes.filter(note => note.important)
      : state.notes.filter(note => !note.important);
  });

  const toggleImportance = (id: number) => {
    dispatch(toggleImportanceOf(id));
  };

  return (
    <div>
      <ul>
        {notes.map((note: NoteData) => (
          <Note key={note.id} note={note} handleClick={() => toggleImportance(note.id)} />
        ))}
      </ul>
    </div>
  );
};

export default Notes;
