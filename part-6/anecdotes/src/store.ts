import { configureStore } from '@reduxjs/toolkit';
import anecdoteReducer, { AnecdoteData } from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';

export interface AppState {
  anecdotes: AnecdoteData[];
  filter: string;
}

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
  },
});

export default store;
