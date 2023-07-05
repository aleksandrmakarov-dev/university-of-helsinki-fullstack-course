import { count } from 'console';
import { Reducer } from 'redux';

export interface Counter {
  good: number;
  ok: number;
  bad: number;
}

export interface CounterAction {
  type: string;
}

const initialState: Counter = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer: Reducer<Counter, CounterAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      return { ...state, good: state.good + 1 };
    case 'BAD':
      return { ...state, bad: state.bad + 1 };
    case 'OK':
      return { ...state, ok: state.ok + 1 };
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
};

export default counterReducer;
