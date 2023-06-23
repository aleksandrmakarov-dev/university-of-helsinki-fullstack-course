import React, { FC, FormEventHandler, useState } from 'react';
import './note-form.css';
import { INote } from '../../App';

interface NoteFormProps {
  isAuthorized: boolean;
  createNewNote: (noteObject: INote) => Promise<boolean>;
}

const NoteForm: FC<NoteFormProps> = ({ isAuthorized, createNewNote }) => {
  const [note, setNote] = useState<string>('');
  const onNoteChange: FormEventHandler<HTMLInputElement> = e => setNote(e.currentTarget.value);

  const onFormSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    const noteObject: INote = {
      id: '',
      content: note,
      important: Math.random() < 0.5,
    };
    await createNewNote(noteObject);
  };

  if (!isAuthorized) return null;

  return (
    <div className="bg-white rounded-sm p-4 shadow-sm border border-gray-200">
      <form className="flex gap-x-2" onSubmit={onFormSubmit}>
        <input
          className="flex-1 px-2.5 py-1.5 text-gray-600 bg-gray-50 rounded-sm outline-none border border-gray-300 focus:border-blue-400 focus:ring-4 transition-all placeholder:text-gray-400 focus:ring-blue-200"
          value={note}
          placeholder="e.g. Tailwind is neat"
          onChange={onNoteChange}
          role="textbox"
        />
        <button
          className="rounded-sm text-sm font-semibold transition-colors px-6 py-1.5 bg-blue-600 hover:bg-blue-700 text-white focus:ring-4 focus:ring-blue-200"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
