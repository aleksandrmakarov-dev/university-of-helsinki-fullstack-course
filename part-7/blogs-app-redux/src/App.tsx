import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainNavbar from './components/MainNavbar';
import BlogPage from './pages/BlogPage';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';
import BlogsPage from './pages/BlogsPage';
import UserPage from './pages/UserPage';
import { AppState } from './store';

const App = () => {
  const user = useSelector((state: AppState) => state.auth);

  return (
    <>
      <MainNavbar />
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
