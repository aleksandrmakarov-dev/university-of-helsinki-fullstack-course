import React, { FC } from 'react';
import './toast.css';
import { ToastData } from '../../../../test-app/src/App';

interface ToastProps {
  data:ToastData;
  handleToastClose:() => void
}

const Toast: FC<ToastProps> = ({data,handleToastClose}) => {
  
  const icon = data.type === 'error' ? 
  (<div className='text-red-500 bg-red-200 rounded-full p-2'>
    <svg xmlns="http://www.w3.org/2000/svg" fill='currentColor' className='w-8 h-8' viewBox="0 0 384 512">
      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
    </svg>
  </div>)
  :
  (<div className='text-green-500 bg-green-200 rounded-full p-2'>
    <svg xmlns="http://www.w3.org/2000/svg" fill='currentColor' className='w-8 h-8' viewBox="0 0 448 512">
      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
    </svg>
  </div>)
  ;

  return(
    <div className='bg-white border border-gray-200 rounded-sm shadow-sm p-4 flex items-start gap-x-2 pointer-events-auto max-w-2xl'>
      {icon}
    <div>
      <p className='font-semibold'>{data.title}</p>
      <p className='text-sm'>{data.text}</p>
    </div>
    <button type='button' className='text-gray-500 bg-gray-100 hover:bg-gray-200 mt-1' onClick={handleToastClose}>
      <svg xmlns="http://www.w3.org/2000/svg" fill='currentColor' className='w-4 h-4' viewBox="0 0 384 512">
        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
      </svg>
    </button>
  </div>
  )
}

export default Toast;
