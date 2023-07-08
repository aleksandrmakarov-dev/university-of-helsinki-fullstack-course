import { Reducer } from 'redux';
import { ReducerAction } from './anecdoteReducer';

export const changeFilter = (value: string): ReducerAction => {
  return {
    type: 'SET_FILTER',
    payload: value,
  };
};

const filterReducer: Reducer<string, ReducerAction> = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload;
    default:
      return state;
  }
};

export default filterReducer;
