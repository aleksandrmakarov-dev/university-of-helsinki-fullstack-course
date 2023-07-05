import ReactDOM from 'react-dom/client';
import { Reducer, createStore } from 'redux';
import counterReducer from './reducers/counterReducer';
import './index.css';

const store = createStore(counterReducer);

const App = () => {
  const addGood = () => {
    store.dispatch({
      type: 'GOOD',
    });
  };

  const addOk = () => {
    store.dispatch({
      type: 'OK',
    });
  };

  const addBad = () => {
    store.dispatch({
      type: 'BAD',
    });
  };

  const Reset = () => {
    store.dispatch({
      type: 'RESET',
    });
  };

  return (
    <div>
      <div>
        <span>Good: {store.getState().good} </span>
        <span>Ok: {store.getState().ok} </span>
        <span>Bad: {store.getState().bad}</span>
      </div>
      <div>
        <button
          type="button"
          className="border-y border-l border-gray-200 rounded-sm rounded-r-none bg-gray-50 text-sm font-semibold hover:bg-gray-100 px-4 py-1.5"
          onClick={addGood}
        >
          Good
        </button>
        <button
          type="button"
          className="border border-r-none border-gray-200 rounded-none bg-gray-50 text-sm font-semibold hover:bg-gray-100 px-4 py-1.5"
          onClick={addOk}
        >
          Ok
        </button>
        <button
          type="button"
          className="border border-gray-200 rounded-none bg-gray-50 text-sm font-semibold hover:bg-gray-100 px-4 py-1.5"
          onClick={addBad}
        >
          Bad
        </button>
        <button
          type="button"
          className="border-y border-r border-gray-200 rounded-sm rounded-l-none bg-gray-50 text-sm font-semibold hover:bg-gray-100 px-4 py-1.5"
          onClick={Reset}
        >
          Reset stats
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
