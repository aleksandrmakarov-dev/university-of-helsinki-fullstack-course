import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NoteForm from './components/note-form/note-form';
import Notes from './components/notes/notes';
import VisibilityFilter from './components/visibility-filter/visibility-filter';
import notesService from './services/notes-service';
import { NoteData, setNotes } from './reducers/noteReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    notesService.getAll().then((notes: NoteData[]) => {
      dispatch(setNotes(notes));
    });
  }, []);

  return (
    <div className="p-4">
      <NoteForm />
      <VisibilityFilter />
      <h5>Notes</h5>
      <Notes />
    </div>
  );
};

export default App;
