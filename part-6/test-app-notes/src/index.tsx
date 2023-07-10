import ReactDOM from 'react-dom/client';
import './index.css';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import noteReducer, { NoteData, appendNote, setNotes } from './reducers/noteReducer';
import App from './App';
import filterReducer from './reducers/filterReducer';
import notesService from './services/notes-service';

export interface AppState {
  notes: NoteData[];
  filter: string;
}

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
