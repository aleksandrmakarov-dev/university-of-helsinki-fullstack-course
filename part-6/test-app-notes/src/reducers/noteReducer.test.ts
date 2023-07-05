import deepFreeze from 'deep-freeze';
import { Reducer } from 'redux';
import noteReducer, { Note, NoteAction } from './noteReducer';

describe('noteReducer', () => {
  test('returns new state with action NEW_NOTE', () => {
    const state: Note[] = [];
    const action: NoteAction = {
      type: 'NEW_NOTE',
      payload: {
        content: 'the app state is in redux store',
        important: true,
        id: 1,
      },
    };

    deepFreeze(state);

    const newState: Note[] = noteReducer(state, action);

    expect(newState).toHaveLength(1);
    expect(newState).toContainEqual(action.payload);
  });

  test('return new state with action TOGGLE_IMPORTANCE', () => {
    const state = [
      {
        content: 'the app state is in redux store',
        important: true,
        id: 1,
      },
      {
        content: 'state changes are made with actions',
        important: false,
        id: 2,
      },
    ];

    const action: NoteAction = {
      type: 'TOGGLE_IMPORTANCE',
      payload: {
        id: 2,
      },
    };

    deepFreeze(state);
    const newState: Note[] = noteReducer(state, action);
    expect(newState).toHaveLength(2);
    expect(newState).toContainEqual(state[0]);
    expect(newState).toContainEqual({
      content: 'state changes are made with actions',
      important: true,
      id: 2,
    });
  });
});
