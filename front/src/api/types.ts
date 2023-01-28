export type Method = 'GET' | 'POST' | 'PUT';

export type Payload = object | string | number;

export type Query = number;

export type Route<D = unknown> = {
  method: Method;
  getUrl: (query?: Query) => string;
  getData: (result: any) => D;
};
