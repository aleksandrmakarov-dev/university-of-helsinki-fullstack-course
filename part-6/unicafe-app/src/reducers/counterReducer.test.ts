import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import deepFreeze from 'deep-freeze';
import counterReducer, { Counter, CounterAction } from './counterReducer';

describe('unicafe reducer', () => {
  const initialState: Counter = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  test('should return a proper initial state when called with undefined state', () => {
    const state = {};
    const action: CounterAction = {
      type: 'DO_NOTHING',
    };

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test('good is incremented', () => {
    const action: CounterAction = {
      type: 'GOOD',
    };

    const state = initialState;
    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });
  });
});
