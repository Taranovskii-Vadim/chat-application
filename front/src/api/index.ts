import axios, { AxiosRequestConfig } from 'axios';

import auth from 'src/store/auth';
import { Payload, Route } from './types';

const baseURL = '/api';

export const axiosInsatnce = axios.create({
  baseURL,
  headers: {
    common: { Authorization: `bearer ${localStorage.getItem('token')}` },
  },
});

axiosInsatnce.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response.data.statusCode === 401) {
      auth.logout();
    }

    return Promise.reject(error);
  },
);

export const api = async <D>(r: Route<D>, p?: Payload): Promise<D> => {
  let config: AxiosRequestConfig = { method: r.method, url: r.getUrl() };

  if (p) {
    config = { ...config, data: p };
  }

  const { data } = await axiosInsatnce.request<D>(config);

  return r.getData(data);
};
