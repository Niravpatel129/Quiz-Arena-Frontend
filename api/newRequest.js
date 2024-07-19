import axios from 'axios';

const IS_PRODUCTION = true

export const newRequest = axios.create({
  baseURL: IS_PRODUCTION
    ? 'https://quiz-arena-backend-96d07772fd89.herokuapp.com'
    : 'http://localhost:8001',
  withCredentials: true,
});
