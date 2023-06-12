import axios from "axios"
import Blog from "../models/blog";
import BlogCreateRequest from "../models/blog-create-request";

const baseUrl = '/api/blogs';

let token: string | null = null;

const setToken = (newToken: string) => {
  token = newToken;
}

const getAll = async () => {
  const response = await axios.get<Blog[]>(baseUrl)
  return response.data;
}

const create = async (request: BlogCreateRequest) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await axios.post<Blog>(baseUrl, request, config);
  return response.data;
}

export default {
  getAll,
  setToken,
  create
}