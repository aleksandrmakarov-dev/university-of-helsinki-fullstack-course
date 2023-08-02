import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Alert } from 'flowbite-react';
import { FaCircleInfo } from 'react-icons/fa6';
import MainNavbar from './components/MainNavbar';
import BlogPage from './pages/BlogPage';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';
import BlogsPage from './pages/BlogsPage';
import UserPage from './pages/UserPage';
import { AppState } from './store';
import { useAppDispatch } from './hooks/useAppDispatch';
import { clearNotification } from './reducers/notificationReducer';

const App = () => {
  const user = useSelector((state: AppState) => state.auth);
  const notification = useSelector((state: AppState) => state.notification);

  const dispatch = useAppDispatch();

  return (
    <>
      <MainNavbar />
      {notification && (
        <Alert
          color={notification.type}
          className="max-w-screen-lg mx-auto my-4"
          icon={FaCircleInfo}
          onDismiss={() => {
            dispatch(clearNotification());
          }}
        >
          <span>
            <p className="font-semibold">{notification.title}</p>
            <p>{notification.text}</p>
          </span>
        </Alert>
      )}
      <div className="max-w-screen-2xl p-10">
        <Routes>
          <Route path="/" element={<BlogsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate replace to={'/'} />} />
          <Route path="/blogs/:id" element={<BlogPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
