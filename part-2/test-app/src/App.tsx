import {FC} from 'react';
import Note from './components/Note/Note';

interface INote{
  id:number,
  content:string,
  important:boolean
}

const App:FC<{notes:INote[]}> = ({notes}) =>{
  return (
  <div>
    <h1>Notes</h1>
    <ul>
      {notes.map((note:INote) => 
        <Note key={note.id} text={note.content}/>
      )}
    </ul>
  </div>
  );
}

export default App;
