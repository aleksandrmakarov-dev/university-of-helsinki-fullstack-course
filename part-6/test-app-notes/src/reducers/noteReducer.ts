import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AnyAction, Reducer } from 'redux';

export interface NoteData {
  id: number;
  content: string;
  important: boolean;
}

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  },
];

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
  },
});

export const { createNote, toggleImportanceOf } = noteSlice.actions;

export default noteSlice.reducer;
