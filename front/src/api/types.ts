export type Method = 'GET' | 'POST' | 'PUT';

export type Payload = object | string | number;

export type Query = number;

export type Route<D = unknown> = {
  method: Method;
  getData: (result: any) => D;
  getUrl: (query?: Query) => string;
};

export interface MetaDTO {
  updatedAt: string;
  createdAt: string;
}

export interface CommonChatDTO {
  id: number;
  title: string;
  companionId: number;
}
