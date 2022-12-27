export type Method = 'GET' | 'POST';

export type Payload = object | string | number;

export type Query = number;

export type Route<D = unknown> = {
  method: Method;
  getUrl: (query?: Query) => string;
  getData: (result: any) => D;
};

export interface CommonChatDTO {
  id: number;
  title: string;
  unReadCount: number;
}
