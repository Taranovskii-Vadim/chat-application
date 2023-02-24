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

export interface CommonUserDTO extends MetaDTO {
  // TODO we dont need password here
  id: number;
  name: string;
  login: string;
  lastname: string;
  password: string;
}

export interface CommonMessageDTO extends MetaDTO {
  id: number;
  text: string;
  sender: CommonUserDTO;
}
