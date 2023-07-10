import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotificationContent(state, action: PayloadAction<string>) {
      return action.payload;
    },
    removeNotificationContent(state) {
      return '';
    },
  },
});

export const setNotification = (content: string, timeSec: number) => {
  return (dispatch: AppDispatch) => {
    dispatch(setNotificationContent(content));
    setTimeout(() => {
      dispatch(removeNotificationContent());
    }, timeSec * 1000);
  };
};

export const { setNotificationContent, removeNotificationContent } = notificationSlice.actions;

export default notificationSlice.reducer;
