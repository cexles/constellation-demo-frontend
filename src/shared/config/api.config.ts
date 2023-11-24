import axios, { InternalAxiosRequestConfig } from 'axios';
import { getCookie } from 'cookies-next';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = getCookie('NEXT_JWT');

    if (token) {
      return {
        ...config,
        headers: { ...config.headers, Authorization: `Bearer ${token}` },
      } as InternalAxiosRequestConfig;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
