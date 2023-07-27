import { FC } from 'react';

interface NotificationProps {
  content: string;
}

const Notification: FC<NotificationProps> = ({ content }) => {
  const style = {
    border: '1px solid black',
    padding: 10,
  };

  if (content === '') {
    return null;
  }

  return <div style={style}>{content}</div>;
};

export default Notification;
