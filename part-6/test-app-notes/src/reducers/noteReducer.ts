import { Reducer } from 'redux';

export interface NoteData {
  id: number;
  content?: string;
  important?: boolean;
}

export interface NoteAction {
  type: string;
  payload: NoteData;
}

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

export const createNote = (content: string) => {
  return {
    type: 'NEW_NoteData',
    payload: {
      content,
      important: false,
      id: generateId(),
    },
  };
};

export const toggleImportanceOf = (id: number) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    payload: { id },
  };
};

const NoteDataReducer: Reducer<NoteData[], NoteAction> = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NoteData':
      return state.concat(action.payload);
    case 'TOGGLE_IMPORTANCE': {
      const id = action.payload.id;
      const NoteDataToChange: NoteData | undefined = state.find((note: NoteData) => note.id === id);

      if (!NoteDataToChange) return state;

      const changedNoteData: NoteData = {
        ...NoteDataToChange,
        important: !NoteDataToChange.important,
      };

      return state.map((note: NoteData) => (note.id !== id ? note : changedNoteData));
    }
    default:
      return state;
  }
};

export default NoteDataReducer;
