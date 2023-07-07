import ReactDOM from 'react-dom/client';
import './index.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import noteReducer from './reducers/noteReducer';
import App from './App';

const store = createStore(noteReducer);

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'the app state is in redux store',
    important: true,
    id: 1,
  },
});

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'state changes are made with actions',
    important: false,
    id: 2,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
