interface NotificationData {
  title?: string;
  text?: string;
  type: 'info' | 'success' | 'failure';
  timeout?: number;
}

export default NotificationData;
