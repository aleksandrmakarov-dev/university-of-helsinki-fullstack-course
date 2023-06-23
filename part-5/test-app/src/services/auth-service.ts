import axios from 'axios';

export interface Credentials {
  username: string;
  password: string;
}

export interface User {
  username: string;
  name: string;
  token: string;
}

const baseUrl = '/api/auth';

const login = async (credentials: Credentials): Promise<User> => {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data as User;
};

export default {
  login,
};
