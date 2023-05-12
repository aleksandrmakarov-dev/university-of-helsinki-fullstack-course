import {ChangeEvent, FC, FormEventHandler, useState} from 'react';
import Note from './components/Note/Note';

interface INote{
  id:number,
  content:string,
  important:boolean
}

const App:FC<{propsNotes:INote[]}> = ({propsNotes}) =>{

  const [notes, setNotes] = useState<INote[]>(propsNotes);
  const [newNote,setNewNote] = useState<string>('a new note...');
  const [showAll, setShowAll] = useState<boolean>(true);

  const addNote:FormEventHandler<HTMLFormElement> = (e) =>{
    e.preventDefault();
    const noteObject:INote = {
      id:notes.length+1,
      content:newNote,
      important:Math.random() < 0.5
    }

    setNotes(notes.concat(noteObject));
    setNewNote('');
  }

  const handleNoteChange:FormEventHandler<HTMLInputElement> = (e) =>{
    console.log('note changed',e.currentTarget.value);
    setNewNote(e.currentTarget.value);
  }

  const handleShowAllChange:FormEventHandler<HTMLInputElement> = (e) =>{
    console.log('show all changed', e.currentTarget.checked);
    setShowAll(e.currentTarget.checked);
  }

  const notesToShow:INote[] = showAll ? notes : notes.filter((note:INote) => note.important);

  return (
  <div>
    <h1>Notes</h1>
    <ul>
      {notesToShow.map((note:INote) => 
        <Note key={note.id} text={note.content}/>
      )}
    </ul>
    <input type="checkbox" id='showAll' checked={showAll} onChange={handleShowAllChange}/>
    <label htmlFor='showAll'>Show All</label>
    <form onSubmit={addNote}>
      <input value={newNote} placeholder='your new note' onChange={handleNoteChange}/>
      <button type="submit">Save</button>
    </form>
  </div>
  );
}

export default App;
