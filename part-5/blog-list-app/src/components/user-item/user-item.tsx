import React, { FC } from 'react';
import './user-item.css';
import AuthorizedUser from '../../models/authorized-user';


interface UserItemProps {
  user:AuthorizedUser | null;
  onLogoutClick:() => void;
}

const UserItem: FC<UserItemProps> = ({user, onLogoutClick}) => {
  if(!user)
    return null;
    
  return(
    <div className='bg-white border-gray-200 border rounded-sm shadow-sm p-2 pr-4 flex gap-x-4 justify-end items-center'>
      <img className='w-12 h-12 rounded-full' alt='img' src='https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_1280.png'/>
      <p>Hello, <span className='font-semibold'>{user?.name}</span></p>
      <button type='button' className='rounded-full p-2 text-gray-600 bg-gray-100 hover:bg-gray-200' onClick={onLogoutClick}>
        <svg xmlns="http://www.w3.org/2000/svg" className='w-4 h-4' fill='currentColor' viewBox="0 0 512 512">
          <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/>
        </svg>
      </button>
    </div>
  )
}
export default UserItem;
