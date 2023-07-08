import NoteForm from './components/note-form/note-form';
import Notes from './components/notes/notes';
import VisibilityFilter from './components/visibility-filter/visibility-filter';

const App = () => {
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
