import axios from "axios";

const baseURL = import.meta.env.VITE_NODE_ENV === "development"
  ? "http://localhost:8080"
  : import.meta.env.VITE_SERVER_URL;

const Api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 60000
});

Api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default Api;
