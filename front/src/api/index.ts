import axios, { AxiosRequestConfig } from 'axios';

import auth from '../store/auth';
import { Payload, Query, Route } from './types';

const baseURL = '/api';

export const axiosInsatnce = axios.create({
  baseURL,
  headers: { common: { Authorization: `bearer ${localStorage.getItem('token')}` } },
});

axiosInsatnce.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response.data.statusCode) {
      auth.logout();
    }

    return Promise.reject(error);
  },
);

export const api = async <D>(route: Route<D>, payload?: Payload, query?: Query): Promise<D> => {
  let config: AxiosRequestConfig = { method: route.method, url: route.getUrl(query) };

  if (payload) {
    config = { ...config, data: payload };
  }

  const { data } = await axiosInsatnce.request<D>(config);

  return route.getData(data);
};
