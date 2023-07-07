import { FC, FormEventHandler } from 'react';
import { NoteData } from '../../reducers/noteReducer';

interface NoteProps {
  note: NoteData;
  handleClick: () => void;
}

const Note: FC<NoteProps> = ({ note, handleClick }) => {
  return (
    <>
      <li key={note.id} onClick={handleClick}>
        {note.content} <strong>{note.important ? 'important' : ''}</strong>
      </li>
    </>
  );
};

export default Note;
