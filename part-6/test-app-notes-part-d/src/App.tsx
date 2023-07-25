import { FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createNote, getNotes, updateNote } from './requests';

export interface Note {
  id?: string;
  content: string;
  important: boolean;
}

const App = () => {
  const result = useQuery('notes', getNotes, {
    refetchOnWindowFocus: false,
  });
  const queryClient = useQueryClient();

  const newNoteMutation = useMutation(createNote, {
    onSuccess: (newNote: Note) => {
      const notes: Note[] = queryClient.getQueryData('notes') ?? [];
      queryClient.setQueryData('notes', notes.concat(newNote));
    },
    onError: (e: any) => {
      console.log('error while creating new note', e);
    },
  });

  const updateNoteMutation = useMutation(updateNote, {
    onSuccess: (updatedNote: Note) => {
      // queryClient.invalidateQueries('notes');
      const notes: Note[] = queryClient.getQueryData('notes') ?? [];
      queryClient.setQueryData(
        'notes',
        notes.map((note: Note) => (note.id === updatedNote.id ? updatedNote : note))
      );
    },
    onError: (e: any) => {
      console.log('error while updating existing note', e);
    },
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const notes: Note[] = result.data;

  const addNote = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = event.currentTarget.note.value;
    event.currentTarget.note.value = '';
    const newNote: Note = {
      content,
      important: false,
    };
    newNoteMutation.mutate(newNote);
  };

  const toggleImportance = (note: Note) => {
    const updatedNote: Note = { ...note, important: !note.important };
    updateNoteMutation.mutate(updatedNote);
  };

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map((note: Note) => (
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content}
          <strong> {note.important ? 'important' : ''}</strong>
        </li>
      ))}
    </div>
  );
};

export default App;
