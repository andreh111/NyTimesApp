import axios from 'axios';
import {store} from '../store';

const api = axios.create({
  baseURL: 'http://localhost:8000/auth',
});

api.interceptors.request.use(
  config => {
    const token = store.getState().auth.user.access_token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export {api};
