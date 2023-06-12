import React, { FC } from 'react';
import Toast from '../toast/toast';
import ToastData from '../../models/toast-data';

interface ToastListProps {
  data:ToastData[];
  OnToastClose:(id:string) => void
}

const ToastList: FC<ToastListProps> = ({data, OnToastClose}) => {
  if(!data || data.length === undefined){
    return null;
  }
  
  return(
    <div className='fixed right-0 bottom-0 pb-8 pr-8 flex flex-col gap-2 pointer-events-none items-end'>
      {
        data.map((item:ToastData) => <Toast key={item.id} data={item} handleToastClose={() => OnToastClose(item.id)}/>)
      }
    </div>
  )
}

export default ToastList;
