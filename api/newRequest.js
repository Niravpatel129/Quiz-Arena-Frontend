import axios from 'axios';

const IS_PRODUCTION = process.env.EXPO_PUBLIC_PROD_BACKEND || process.env.NODE_ENV === 'production';

export const newRequest = axios.create({
  baseURL: IS_PRODUCTION
    ? 'https://quiz-arena-backend-96d07772fd89.herokuapp.com'
    : 'http://localhost:8001',
  withCredentials: true,
});
