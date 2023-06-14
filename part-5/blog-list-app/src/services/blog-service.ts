import axios from 'axios';
import Blog from '../models/blog';
import BlogCreateRequest from '../models/blog-create-request';
import BlogUpdateRequest from '../models/blog-update-request';

const baseUrl = '/api/blogs';

let token: string | null = null;

const setToken = (newToken: string) => {
  token = newToken;
};

const getAll = async () => {
  const response = await axios.get<Blog[]>(baseUrl);
  return response.data;
};

const create = async (request: BlogCreateRequest) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post<Blog>(baseUrl, request, config);
  return response.data;
};

const update = async (id: string, request: BlogUpdateRequest) => {
  const response = await axios.put<Blog>(`${baseUrl}/${id}`, request);
  return response.data;
};

const remove = async (id: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response?.data;
};

export default {
  getAll,
  setToken,
  create,
  update,
  remove,
};
