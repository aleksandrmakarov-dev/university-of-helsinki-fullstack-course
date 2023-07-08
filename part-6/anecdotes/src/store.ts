import { configureStore } from '@reduxjs/toolkit';
import anecdoteReducer, { AnecdoteData } from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';
import notificationReducer from './reducers/notificationReducer';

export interface AppState {
  anecdotes: AnecdoteData[];
  filter: string;
  notification: string | null;
}

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});

export default store;
