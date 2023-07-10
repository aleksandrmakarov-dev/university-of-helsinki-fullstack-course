import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AnyAction, Dispatch, Reducer } from 'redux';
import notesService from '../services/notes-service';

export interface NoteData {
  id: number;
  content: string;
  important: boolean;
}

// const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const initialState: NoteData[] = [];

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
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

export const initializeNotes = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const notes = await notesService.getAll();
    dispatch(setNotes(notes));
  };
};

export const createNote = (content: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const newNote: NoteData = await notesService.createNew(content);
    dispatch(appendNote(newNote));
  };
};

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions;

export default noteSlice.reducer;
