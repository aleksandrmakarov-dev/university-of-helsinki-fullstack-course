import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Reducer, createStore } from 'redux';

interface CounterAction {
  type: string;
}

const initialAction: CounterAction = {
  type: 'ZERO',
};

const counterReducer: Reducer<number, CounterAction> = (state = 0, action = initialAction) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'ZERO':
      return 0;
    default:
      return state;
  }
};

const store = createStore(counterReducer);

store.subscribe(() => {
  const storeNow = store.getState();
  console.log(storeNow);
});

const App = () => {
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

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
