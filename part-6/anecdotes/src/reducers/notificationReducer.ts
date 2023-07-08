import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action: PayloadAction<string>) {
      return action.payload;
    },
    removeNotification(state) {
      return '';
    },
  },
});

export const { setNotification, removeNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
