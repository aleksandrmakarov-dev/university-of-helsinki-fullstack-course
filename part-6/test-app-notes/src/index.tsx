import ReactDOM from 'react-dom/client';
import './index.css';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import noteReducer, { NoteData } from './reducers/noteReducer';
import App from './App';
import filterReducer from './reducers/filterReducer';

export interface AppState {
  notes: NoteData[];
  filter: string;
}

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
});

const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
