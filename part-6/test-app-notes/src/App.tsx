import NoteForm from './components/note-form/note-form';
import Notes from './components/notes/notes';

const App = () => {
  return (
    <div className="p-4">
      <NoteForm />
      <h5>Notes</h5>
      <Notes />
    </div>
  );
};

export default App;
