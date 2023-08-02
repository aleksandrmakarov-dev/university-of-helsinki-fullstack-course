import axios from 'axios';
import UserData from '../interfaces/UserData';
import CredentialsData from '../interfaces/CredentialsData';

const baseUrl = '/api/users';

const getAll = async () => {
  const response = await axios.get<UserData[]>(baseUrl);
  return response.data;
};

const login = async (credentials: CredentialsData) => {
  const response = await axios.post(`/api/auth/login`, credentials);
  return response.data;
};

const getById = async (id: string): Promise<UserData> => {
  const response = await axios.get<UserData>(`${baseUrl}/${id}`);
  return response.data;
};

export default {
  login,
  getAll,
  getById,
};
