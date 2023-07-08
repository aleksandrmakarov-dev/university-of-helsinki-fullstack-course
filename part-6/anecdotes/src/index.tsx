import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { CombinedState, Reducer, combineReducers, createStore } from 'redux';
import App from './App';
import anecdoteReducer, { AnecdoteData, ReducerAction } from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';

export interface AppState {
  anecdotes: AnecdoteData[];
  filter: string;
}

const combinedReducer: Reducer<CombinedState<AppState>, ReducerAction> = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
});

const store = createStore(combinedReducer);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
