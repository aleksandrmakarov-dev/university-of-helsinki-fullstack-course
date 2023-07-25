import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CounterContextProvider } from './counter-context';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <CounterContextProvider>
    <App />
  </CounterContextProvider>
);
