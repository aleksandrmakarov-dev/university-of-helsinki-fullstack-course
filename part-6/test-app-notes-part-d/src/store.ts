import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './reducers/filterReducer';
import noteReducer from './reducers/noteReducer';

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;

export default store;
