import axios from 'axios';
import BlogData from '../interfaces/BlogData';
import BlogUpdateData from '../interfaces/BlogUpdateData';
import BlogCreateData from '../interfaces/BlogCreateData';

const baseUrl = '/api/blogs';

let token: string | null = null;

const setToken = (newToken: string | null) => {
  token = newToken;
};

const getAll = async (): Promise<BlogData[]> => {
  const response = await axios.get<BlogData[]>(baseUrl);
  return response.data;
};

const getById = async (id: string): Promise<BlogData> => {
  const response = await axios.get<BlogData>(`${baseUrl}/${id}`);
  return response.data;
};

const update = async (id: string, data: BlogUpdateData) => {
  const response = await axios.put<BlogData>(`${baseUrl}/${id}`, data);
  return response.data;
};

const remove = async (id: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const create = async (data: BlogCreateData) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.post(baseUrl, data, config);
  return response.data;
};

const postComment = async (id: string, comment: string) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment });
  return response.data;
};

export default {
  getAll,
  getById,
  update,
  remove,
  create,
  setToken,
  postComment,
};
