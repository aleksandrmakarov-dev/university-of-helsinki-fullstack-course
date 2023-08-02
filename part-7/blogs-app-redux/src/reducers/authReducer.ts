import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import AuthData from '../interfaces/AuthData';
import { AppDispatch } from '../store';
import BlogService from '../services/BlogService';

const localStorageKey = 'AUTH_USER';

const initalState = () => {
  const json = window.localStorage.getItem(localStorageKey);
  if (json) {
    const user = JSON.parse(json) as AuthData;
    BlogService.setToken(user.token);
    return user;
  }
  return null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initalState(),
  reducers: {
    set(state, action: PayloadAction<AuthData>) {
      window.localStorage.setItem(localStorageKey, JSON.stringify(action.payload));
      BlogService.setToken(action.payload.token);
      return action.payload;
    },
    clear() {
      window.localStorage.removeItem(localStorageKey);
      BlogService.setToken(null);
      return null;
    },
  },
});

export const setUser = (data: AuthData) => {
  return (dispatch: AppDispatch) => {
    dispatch(set(data));
  };
};

export const clearUser = () => {
  return (dispatch: AppDispatch) => {
    dispatch(clear());
  };
};

export const { set, clear } = authSlice.actions;

export default authSlice.reducer;
