import axios, { AxiosRequestConfig } from 'axios';

import { Payload, Query, Route } from './types';

const baseURL = '/api';

const axiosInsatnce = axios.create({ baseURL });

export const api = async <D>(route: Route<D>, payload?: Payload, query?: Query): Promise<D> => {
  let config: AxiosRequestConfig = { method: route.method, url: route.getUrl(query) };

  if (payload) {
    config = { ...config, data: payload };
  }

  const { data } = await axiosInsatnce.request<D>(config);

  return route.getData(data);
};
