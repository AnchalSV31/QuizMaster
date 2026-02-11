import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const authService = {
  signup: (data) => axios.post(`${API_URL}/signup`, data),
  login: (data) => axios.post(`${API_URL}/login`, data),
};
