import axios from 'axios';
import UserData from '../interfaces/UserData';
import CredentialsData from '../interfaces/CredentialsData';

const getAll = async () => {
  const response = await axios.get<UserData[]>('/api/users');
  return response.data;
};

const login = async (credentials: CredentialsData) => {
  const response = await axios.post(`/api/auth/login`, credentials);
  return response.data;
};

export default {
  login,
  getAll,
};
