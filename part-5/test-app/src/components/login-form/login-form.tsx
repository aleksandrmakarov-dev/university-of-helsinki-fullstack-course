import React, { FC, FormEventHandler } from 'react';
import './login-form.css';
import { User } from '../../services/auth-service';

interface LoginFormProps {
  user:User | null;
  username:string;
  password:string;
  onUsernameChange:FormEventHandler<HTMLInputElement>;
  onPasswordChange:FormEventHandler<HTMLInputElement>;
  onFormSubmit:FormEventHandler<HTMLFormElement>;
}

const LoginForm: FC<LoginFormProps> = ({user,username,password,onUsernameChange,onPasswordChange,onFormSubmit}) => {

  if(user)
    return null;

  return(
    <div className='px-4 py-8 border bg-white max-w-xl w-full mx-auto'>
      <h5 className='text-center text-2xl font-semibold text-gray-900'>Log in Account</h5>
      <form onSubmit={onFormSubmit}>
        <div className='mb-2'>
          <label className='mb-1 text-gray-600 block'>Username</label>
          <input value={username} onChange={onUsernameChange} className='block w-full px-2.5 py-1.5 text-gray-600 bg-gray-50 rounded-sm outline-none border border-gray-300 focus:border-blue-400 focus:ring-4 transition-all placeholder:text-gray-400 focus:ring-blue-200' placeholder='e.g. Alex'/>
        </div>
        <div className='mb-4'>
          <label className='mb-1 text-gray-600 block'>Password</label>
          <input value={password} onChange={onPasswordChange} type='password' className='block w-full px-2.5 py-1.5 text-gray-600 bg-gray-50 rounded-sm outline-none border border-gray-300 focus:border-blue-400 focus:ring-4 transition-all placeholder:text-gray-400 focus:ring-blue-200' placeholder='••••••••••••'/>
        </div>
        <div className='flex justify-end'>
        <button type='submit' className='rounded-sm text-sm font-semibold transition-colors px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white focus:ring-4 focus:ring-blue-200'>Log in</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm;
