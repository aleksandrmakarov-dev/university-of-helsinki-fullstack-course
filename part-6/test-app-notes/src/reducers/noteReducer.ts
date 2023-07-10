import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AnyAction, Reducer } from 'redux';

export interface NoteData {
  id: number;
  content: string;
  important: boolean;
}

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const initialState: NoteData[] = [];

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote(state, action: PayloadAction<string>) {
      const content = action.payload;
      const newNoteData: NoteData = {
        content,
        important: false,
        id: generateId(),
      };
      state.push(newNoteData);
    },

    toggleImportanceOf(state, action: PayloadAction<number>) {
      const id = action.payload;
      const noteToChange = state.find(note => note.id === id);
      if (!noteToChange) {
        return state;
      }
      const changedNote = {
        ...noteToChange,
        important: !noteToChange?.important,
      };
      return state.map(note => (note.id !== id ? note : changedNote));
    },

    appendNote(state, action: PayloadAction<NoteData>) {
      state.push(action.payload);
    },

    setNotes(state, action: PayloadAction<NoteData[]>) {
      return action.payload;
    },
  },
});

export const { createNote, toggleImportanceOf, appendNote, setNotes } = noteSlice.actions;

export default noteSlice.reducer;
