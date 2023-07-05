import { Reducer } from 'redux';

export interface Note {
  id: number;
  content?: string;
  important?: boolean;
}

export interface NoteAction {
  type: string;
  payload: Note;
}

const noteReducer: Reducer<Note[], NoteAction> = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return state.concat(action.payload);
    case 'TOGGLE_IMPORTANCE': {
      const id = action.payload.id;
      const noteToChange: Note | undefined = state.find((note: Note) => note.id === id);

      if (!noteToChange) return state;

      const changedNote: Note = {
        ...noteToChange,
        important: !noteToChange.important,
      };

      return state.map((note: Note) => (note.id !== id ? note : changedNote));
    }
    default:
      return state;
  }
};

export default noteReducer;
