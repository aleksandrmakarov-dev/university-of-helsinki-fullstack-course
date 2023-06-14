export interface ToastData {
  id: string;
  title: string;
  text: string;
  type: 'success' | 'error';
  timer: NodeJS.Timeout;
}

export default ToastData;
