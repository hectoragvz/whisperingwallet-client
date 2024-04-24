import axios from "axios";
import { ACCESS_TOKEN } from "./constants";
// get url from django backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// quickly get auth basically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      // If there is a access token set it to bearer auth
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  // there is no token
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
