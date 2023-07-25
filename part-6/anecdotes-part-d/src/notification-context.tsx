import { FC, createContext, useContext, useReducer } from 'react';

interface NotificationAction {
  type: string;
  payload: any;
}

const notificationReducer = (state: string, action: NotificationAction) => {
  switch (action.type) {
    case 'notify':
      return action.payload;
    case 'clear':
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext<any>(null);

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

interface NotificationContextProviderProps {
  children: JSX.Element | JSX.Element[] | null;
}

export const NotificationContextProvider: FC<NotificationContextProviderProps> = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null);

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>{children}</NotificationContext.Provider>
  );
};

export default NotificationContext;
