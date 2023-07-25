import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import { NotificationContextProvider } from './notification-context';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </QueryClientProvider>
);
