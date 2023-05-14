import { FC } from 'react';
import { INote } from '../../App';

interface NoteProps{
   note:INote,
   handleToggleImportance:() => void;
}

const Note: FC<NoteProps> = ({note,handleToggleImportance}) => {

   const label = note.important ? 'x': 'v';

   return(
      <>
         <li>
            {note.content}
            <button onClick={handleToggleImportance}>{label}</button>
         </li>
      </>
   )
};

export default Note;
