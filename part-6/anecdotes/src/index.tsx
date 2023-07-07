import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import AnecdoteDataReducer from './reducers/anecdoteReducer';

const store = createStore(AnecdoteDataReducer);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
