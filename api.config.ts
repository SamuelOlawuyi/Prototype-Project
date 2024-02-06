import axios from 'axios';

export const apiBaseUrl = 'https://decablog-api.onrender.com';

const myApi = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

myApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default myApi;
