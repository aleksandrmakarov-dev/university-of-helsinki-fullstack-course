import { Button, Navbar } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../store';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { clearUser } from '../reducers/authReducer';

const MainNavbar = () => {
  const user = useSelector((state: AppState) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(clearUser());
    navigate('/login');
  };

  return (
    <Navbar>
      <Navbar.Brand href="/">
        <img alt="Flowbite React Logo" className="mr-3 h-6 sm:h-9" src="https://www.flowbite-react.com/favicon.svg" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {user ? (
          <div className="flex items-center gap-x-4">
            <p>Hello, {user.name}</p>
            <Button onClick={onLogout} type="button">
              Logout
            </Button>
          </div>
        ) : (
          <Button href="/login">Login</Button>
        )}
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/">Blogs</Navbar.Link>
        <Navbar.Link href="/users">Users</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNavbar;
