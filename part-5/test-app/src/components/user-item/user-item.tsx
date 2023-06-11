import React, { FC } from 'react';
import './user-item.css';
import { User } from '../../services/auth-service';

interface UserItemProps {
  user:User | null;
}

const UserItem: FC<UserItemProps> = ({user}) => {
  if(!user)
    return null;
    
  return(
    <div className='bg-white border-gray-200 border rounded-full shadow-sm pt-2 pl-2 pb-2 pr-12 self-start flex gap-x-4 items-center'>
      <img className='w-12 h-12 rounded-full' alt='img' src='https://pixabay.com/get/gb9d6ea0593c3ab4c780d4c00e4be16a1bc0c130954bb71cb40f907eb916f1a4b06153619a8e230b331f9a0548e1314b3fed92a84b0509117fa5c8e406cb58297487fc9883f2fd212f15d69172a831864_640.png'/>
      <p>Hello, <span className='font-semibold'>{user?.name}</span></p>
    </div>
  )
}
export default UserItem;
