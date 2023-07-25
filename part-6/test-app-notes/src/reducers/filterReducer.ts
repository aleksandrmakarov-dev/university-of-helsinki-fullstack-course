import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: 'ALL',
  reducers: {
    filterChange(state, action: PayloadAction<string>) {
      return action.payload;
    },
  },
});

export const { filterChange } = filterSlice.actions;

export default filterSlice.reducer;
