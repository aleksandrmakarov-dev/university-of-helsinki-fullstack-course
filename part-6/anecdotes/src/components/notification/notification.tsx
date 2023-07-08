import { useSelector } from 'react-redux';
import { AppState } from '../../store';

const Notification = () => {
  const notification = useSelector((state: AppState) => state.notification);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  if (notification === '') {
    return null;
  }

  return <div style={style}>{notification}</div>;
};

export default Notification;
