import axios from 'axios';

export const newRequest = axios.create({
  baseURL: 'http://localhost:8001',
  withCredentials: true,
});
