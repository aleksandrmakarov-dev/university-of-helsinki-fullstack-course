import { Reducer } from 'redux';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReducerAction } from './anecdoteReducer';

// export const changeFilter = (value: string): ReducerAction => {
//   return {
//     type: 'SET_FILTER',
//     payload: value,
//   };
// };

// const filterReducer: Reducer<string, ReducerAction> = (state = '', action) => {
//   switch (action.type) {
//     case 'SET_FILTER':
//       return action.payload;
//     default:
//       return state;
//   }
// };

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterChange(state, action: PayloadAction<string>) {
      return action.payload;
    },
  },
});

export const { filterChange } = filterSlice.actions;
export default filterSlice.reducer;
