import axios from 'axios';

export const AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
  withCredentials: true,
});
