import React, { useState } from 'react';
import { createStore, Reducer } from 'redux';

import './App.css';
import { stat } from 'fs';

interface Note {
  id: number;
  content: string;
  important: boolean;
}

interface NoteAction {
  type: string;
  payload: Note;
}

const noteReducer: Reducer<Note[], NoteAction | any> = (state = [], action = undefined) => {
  if (action === undefined) {
    return state;
  }
  if (action.type === 'NEW_NOTE') {
    state.push(action.payload);
    return state;
  }
  return state;
};

const store = createStore(noteReducer);

const App = () => {
  return (
    <div>
      <ul>
        {store.getState().map(note => (
          <li key={note.id}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
