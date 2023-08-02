import { Button, Label, TextInput } from 'flowbite-react';
import { FaUser, FaLock } from 'react-icons/fa6';
import { FormEvent } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import useField from '../hooks/useField';
import UserService from '../services/UserService';
import CredentialsData from '../interfaces/CredentialsData';
import { useAppDispatch } from '../hooks/useAppDispatch';
import AuthData from '../interfaces/AuthData';
import { setUser } from '../reducers/authReducer';
import { showNotification } from '../reducers/notificationReducer';

const LoginPage = () => {
  const { reset: resetUsername, ...usernameInput } = useField<string>('text', '', 'Enter username...');
  const { reset: resetPassword, ...passwordInput } = useField<string>('password', '', 'Enter password...');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { mutate: loginMutate, isLoading: isLoginLoading } = useMutation<any, AxiosError, CredentialsData>(
    UserService.login
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginMutate(
      {
        username: usernameInput.value,
        password: passwordInput.value,
      },
      {
        onSuccess: (data: AuthData) => {
          dispatch(setUser(data));
          dispatch(
            showNotification({
              type: 'success',
              text: `You logged in successfully! Welcome back ${data.name}`,
              timeout: 5000,
            })
          );
          resetUsername();
          resetPassword();
          navigate('/');
        },
        onError: (error: AxiosError<any>) => {
          dispatch(
            showNotification({
              type: 'failure',
              title: 'Login failure',
              text: error.response?.data.error,
              timeout: 10000,
            })
          );
        },
      }
    );
  };

  return (
    <div>
      <form className="flex max-w-md mx-auto flex-col gap-4" onSubmit={onSubmit}>
        <div>
          <div className="block mb-2">
            <Label value="Username" />
            <TextInput icon={FaUser} {...usernameInput} />
          </div>
          <div className="block mb-2">
            <Label value="Password" />
            <TextInput icon={FaLock} {...passwordInput} />
          </div>
        </div>
        <Button type="submit" disabled={isLoginLoading} isProcessing={isLoginLoading}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
