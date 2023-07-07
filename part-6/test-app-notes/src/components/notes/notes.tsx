import { useDispatch, useSelector } from 'react-redux';
import { NoteData, toggleImportanceOf } from '../../reducers/noteReducer';
import Note from '../note/note';

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state: NoteData[]) => state);

  const toggleImportance = (id: number) => {
    dispatch(toggleImportanceOf(id));
  };

  return (
    <div>
      <ul>
        {notes.map((note: NoteData) => (
          <Note note={note} handleClick={() => toggleImportance(note.id)} />
        ))}
      </ul>
    </div>
  );
};

export default Notes;
