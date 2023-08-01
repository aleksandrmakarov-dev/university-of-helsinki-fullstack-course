import { Button, Label, Spinner, TextInput } from 'flowbite-react';
import { FaUser, FaLock } from 'react-icons/fa6';
import { FormEvent } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import useField from '../hooks/useField';
import UserService from '../services/UserService';
import CredentialsData from '../interfaces/CredentialsData';
import { useAppDispatch } from '../hooks/useAppDispatch';
import AuthData from '../interfaces/AuthData';
import { setUser } from '../reducers/authReducer';

const LoginPage = () => {
  const { reset: resetUsername, ...usernameInput } = useField<string>('text', 'Enter username...', 'root');
  const { reset: resetPassword, ...passwordInput } = useField<string>('password', 'Enter password...', 'root123');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { mutate: loginMutate, isLoading: isLoginLoading } = useMutation<any, Error, CredentialsData>(
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
          console.log(data);
          resetUsername();
          resetPassword();

          navigate('/');
        },
      }
    );
  };

  return (
    <div>
      <form className="flex mx-auto max-w-md flex-col gap-4" onSubmit={onSubmit}>
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
        <Button type="submit" disabled={isLoginLoading}>
          {isLoginLoading ? (
            <>
              <Spinner aria-label="Spinner button example" />
              <span className="pl-3">Loading...</span>
            </>
          ) : (
            'Login'
          )}
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
