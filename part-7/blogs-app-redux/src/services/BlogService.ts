import axios from 'axios';
import BlogData from '../interfaces/BlogData';
import BlogUpdateData from '../interfaces/BlogUpdateData';

const baseUrl = '/api/blogs';

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
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default {
  getAll,
  getById,
  update,
  remove,
};
