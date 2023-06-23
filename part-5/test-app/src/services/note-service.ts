import axios from 'axios';
import { INote } from '../App';

const baseUrl = '/api';

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get<INote[]>(`${baseUrl}/notes`);
  return response.data;
};

const create = async (note: INote) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post<INote>(`${baseUrl}/notes`, note, config);
  return response.data;
};

const update = async (id: string, note: INote) => {
  const response = await axios.put<INote>(`${baseUrl}/notes/${id}`, note);
  return response.data;
};

export default {
  getAll,
  create,
  update,
  setToken,
};
