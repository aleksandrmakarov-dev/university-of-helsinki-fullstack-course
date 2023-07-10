import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NoteForm from './components/note-form/note-form';
import Notes from './components/notes/notes';
import VisibilityFilter from './components/visibility-filter/visibility-filter';
import { initializeNotes } from './reducers/noteReducer';
import { useAppDispatch } from './hooks';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeNotes());
  }, [dispatch]);

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
