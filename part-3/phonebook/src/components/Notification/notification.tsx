import { FC } from 'react';
import { INotificationData } from '../../App';
import './notification.css';

interface NotificationProps{
  data:INotificationData | undefined;
}

const Notification: FC<NotificationProps> = ({data}) => {

  if(data === undefined){
    return(null);
  }

  const classNames = 'container ' + (data.isSucess ? 'success' : 'error');

  return(
    <div className={classNames}>
      {data.text}
    </div>
  )
}

export default Notification;
