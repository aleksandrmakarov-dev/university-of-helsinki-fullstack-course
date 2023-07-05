import React, { useState } from 'react';
import { createStore, Reducer } from 'redux';

import './App.css';

interface CounterAction {
  type: string;
}

const initialAction: CounterAction = {
  type: 'ZERO',
};

const counterReducer: Reducer<number, CounterAction> = (state = 0, action = initialAction) => {
  switch (action.type) {
    case 'INC':
      return state + 1;
    case 'DEC':
      return state - 1;
    case 'ZERO':
      return 0;
    default:
      return state;
  }
};

const store = createStore(counterReducer);

const App = () => {
  store.subscribe(() => {
    const storeNow = store.getState();
    console.log(storeNow);
  });

  return (
    <div data-testid="app-test">
      <p className="font-semibold py-4">Counter: {store.getState()}</p>
      <div className="flex gap-x-2">
        <button
          className="border border-gray-200 rounded-sm px-4 py-1 text-sm bg-gray-50 hover:bg-gray-100 text-gray-900"
          type="button"
          onClick={() => store.dispatch({ type: 'INCREMENT' })}
        >
          plus
        </button>
        <button
          className="border border-gray-200 rounded-sm px-4 py-1 text-sm bg-gray-50 hover:bg-gray-100 text-gray-900"
          type="button"
          onClick={() => store.dispatch({ type: 'DECREMENT' })}
        >
          minus
        </button>
        <button
          className="border border-gray-200 rounded-sm px-4 py-1 text-sm bg-gray-50 hover:bg-gray-100 text-gray-900"
          type="button"
          onClick={() => store.dispatch({ type: 'ZERO' })}
        >
          zero
        </button>
      </div>
    </div>
  );
};

export default App;
