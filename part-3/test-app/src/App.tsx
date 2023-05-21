import {FC, FormEventHandler, useEffect, useState} from 'react';
import Note from './components/Note/Note';
import axios from 'axios';
import noteService from './services/note-service';

export interface INote{
  id:string,
  content:string,
  important:boolean
}


const App:FC = () =>{

  const [notes, setNotes] = useState<INote[]>([]);
  const [newNote,setNewNote] = useState<string>('a new note...');
  const [showAll, setShowAll] = useState<boolean>(true);

  useEffect(()=>{

    const nonExisting = {
      id: '1',
      content: 'This note is not saved to server',
      important: true,
    }

    noteService
      .getAll()
      .then((response:INote[])=>{
        setNotes(response.concat(nonExisting));
      });
  },[])

  const addNote:FormEventHandler<HTMLFormElement> = (e) =>{
    e.preventDefault();
    const noteObject:INote = {
      id:'',
      content:newNote,
      important:Math.random() < 0.5
    }

    noteService
      .create(noteObject)
      .then((response:INote)=>{
        setNotes(notes.concat(response));
        setNewNote('');
      });
  }

  const handleNoteChange:FormEventHandler<HTMLInputElement> = (e) =>{
    console.log('note changed',e.currentTarget.value);
    setNewNote(e.currentTarget.value);
  }

  const handleShowAllChange:FormEventHandler<HTMLInputElement> = (e) =>{
    console.log('show all changed', e.currentTarget.checked);
    setShowAll(e.currentTarget.checked);
  }

  const handleToggleImportance = (id:string) =>{
    const note = notes.find((note:INote)=>note.id === id);
    if(note === undefined){
      console.log(`could not find note with id = ${id}}`);
      return;

    }
    const changedNote:INote = {...note,important:!note?.important};

    noteService
      .update(id,changedNote)
      .then((response:INote)=>{
        setNotes(notes.map((note:INote)=> note.id !== id ? note: response))
      })
      .catch((error)=>{
        console.log(error);
        alert(
          `could not update note importance`
        )
      })
  }

  const notesToShow:INote[] = showAll ? notes : notes.filter((note:INote) => note.important);

  return (
  <div>
    <h1>Notes</h1>
    <ul>
      {notesToShow.map((note:INote) => 
        <Note key={note.id} note={note} handleToggleImportance={()=>handleToggleImportance(note.id)}/>
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