import React from 'react';
import './App.css';
import PersonForm from './components/PersonForm';
import useResource from './hooks/useResource';
import PersonData from './interfaces/PersonData';
import PersonItem from './components/PersonItem';
import NoteForm from './components/NoteForm';
import NoteData from './interfaces/NoteData';

const App = () => {
  const [notes, noteService] = useResource<NoteData>('http://localhost:3005/notes');
  const [persons, personService] = useResource<PersonData>('http://localhost:3005/persons');

  return (
    <div>
      <h2>Notes</h2>
      <NoteForm onCreate={noteService.create} />
      <div>
        {notes.map((n: NoteData) => (
          <div key={n.id}>{n.content}</div>
        ))}
      </div>
      <h2>Persons</h2>
      <PersonForm onCreate={personService.create} />
      <div>
        {persons.map((p: PersonData) => (
          <PersonItem key={p.id} person={p} />
        ))}
      </div>
    </div>
  );
};

export default App;
