import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Reducer, createStore } from 'redux';
import noteReducer from './reducers/noteReducer';

const store = createStore(noteReducer);

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'the app state is in redux store',
    important: true,
    id: 1,
  },
});

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'state changes are made with actions',
    important: false,
    id: 2,
  },
});

const App = () => {
  return (
    <div className="p-4">
      <h5 className="text-xl font-semibold mb-2">Notes</h5>
      <ul className="flex flex-col gap-y-2 items-start">
        {store.getState().map(note => (
          <li className="p-4 border border-gray-200 bg-gray-50 rounded-sm" key={note.id}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
