import { FC } from 'react';
import { INote } from '../../App';

interface NoteProps {
  note: INote;
  OnToggleImportance: () => void;
}

const Note: FC<NoteProps> = ({ note, OnToggleImportance }) => {
  const button = note.important ? (
    <button
      onClick={OnToggleImportance}
      type="button"
      className="flex gap-2 items-center rounded-sm text-sm font-semibold transition-colors px-6 py-1.5 bg-red-600 hover:bg-red-700 text-white focus:ring-4 focus:ring-red-200"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 384 512">
        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
      </svg>
      <span>Make not important</span>
    </button>
  ) : (
    <button
      onClick={OnToggleImportance}
      type="button"
      className="flex gap-2 items-center rounded-sm text-sm font-semibold transition-colors px-6 py-1.5 bg-green-600 hover:bg-green-700 text-white focus:ring-4 focus:ring-green-200"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-4 w-4" viewBox="0 0 448 512">
        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
      </svg>
      <span>Make important</span>
    </button>
  );

  return (
    <>
      <li className="p-4 border border-gray-200 shadow-sm rounded-sm bg-white flex justify-between items-center">
        <span>{note.content}</span>
        {button}
      </li>
    </>
  );
};

export default Note;
