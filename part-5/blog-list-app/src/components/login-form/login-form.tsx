import { FC, FormEventHandler, useState } from 'react';
import { User } from '../../models/user';

interface LoginFormProps {
  OnLoginUser:(username:string,password:string) => Promise<boolean>;
}

const LoginForm: FC<LoginFormProps> = ({OnLoginUser}) => {

  const [username, setUsername] = useState<string>('');
  const OnUsernameChange:FormEventHandler<HTMLInputElement> = (e) => setUsername(e.currentTarget.value);

  const [password, setPassword] = useState<string>('');
  const OnPasswordChange:FormEventHandler<HTMLInputElement> = (e) => setPassword(e.currentTarget.value);

  const OnLoginFormSubmit:FormEventHandler<HTMLFormElement> = async (e) =>{
    e.preventDefault();
    const result = await OnLoginUser(username,password);
    if(result){
      setUsername('');
    }
    setPassword('');
  }

  return(
    <div className='px-4 py-8 border bg-white max-w-xl w-full mx-auto'>
      <h5 className='text-center text-2xl font-semibold text-gray-900'>Log in Account</h5>
      <form onSubmit={OnLoginFormSubmit}>
        <div className='mb-2'>
          <label className='mb-1 text-gray-600 block'>Username</label>
          <input value={username} onChange={OnUsernameChange} className='block w-full px-2.5 py-1.5 text-gray-600 bg-gray-50 rounded-sm outline-none border border-gray-300 focus:border-blue-400 focus:ring-4 transition-all placeholder:text-gray-400 focus:ring-blue-200' placeholder='e.g. Alex'/>
        </div>
        <div className='mb-4'>
          <label className='mb-1 text-gray-600 block'>Password</label>
          <input value={password} onChange={OnPasswordChange} type='password' className='block w-full px-2.5 py-1.5 text-gray-600 bg-gray-50 rounded-sm outline-none border border-gray-300 focus:border-blue-400 focus:ring-4 transition-all placeholder:text-gray-400 focus:ring-blue-200' placeholder='••••••••••••'/>
        </div>
        <div className='flex justify-between'>
          <button type='submit' className='rounded-sm text-sm font-semibold transition-colors px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white focus:ring-4 focus:ring-blue-200'>Log in</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm;
