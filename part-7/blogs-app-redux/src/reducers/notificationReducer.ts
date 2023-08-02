import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import NotificationData from '../interfaces/NotificationData';
import { AppDispatch } from '../store';

export type NotificationState = NotificationData | null;

const initialState: NotificationData | null = null as NotificationState;

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify(state, action: PayloadAction<NotificationData>) {
      return action.payload;
    },
    clear() {
      return null;
    },
  },
});

export const showNotification = (data: NotificationData) => {
  return (dispatch: AppDispatch) => {
    dispatch(notify(data));

    if (data.timeout != null) {
      // console.log('timeout is set', data.timeout);
      setTimeout(() => {
        dispatch(clear());
      }, data.timeout);
    }
  };
};

export const clearNotification = () => {
  return (dispatch: AppDispatch) => {
    dispatch(clear());
  };
};

export const { notify, clear } = notificationSlice.actions;

export default notificationSlice.reducer;
