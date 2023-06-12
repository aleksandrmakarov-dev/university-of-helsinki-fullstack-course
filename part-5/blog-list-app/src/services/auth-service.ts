import axios from "axios";
import Credentials from "../models/credentials";

const baseUrl = '/api/auth'

const login = async (credentials: Credentials) => {
  const response = await axios.post(baseUrl + '/login', credentials);
  return response.data;
}

export default {
  login,
}