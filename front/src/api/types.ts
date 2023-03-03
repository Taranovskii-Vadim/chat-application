export type Method = 'GET' | 'POST' | 'PUT';

export type Payload = object | string | number;

export type Query = string;

export type Route<D = unknown> = {
  method: Method;
  getData: (result: any) => D;
  getUrl: (query?: Query) => string;
};

export interface MetaDTO {
  updatedAt: string;
  createdAt: string;
}

export interface CommonChatDTO extends MetaDTO {
  id: number;
  title: string;
  companionId: number;
  unReadCount: number;
  lastMessage?: CommonMessageDTO;
}

export interface CommonUserDTO extends MetaDTO {
  id: number;
  name: string;
  login: string;
  lastname: string;
}

export interface CommonMessageDTO extends MetaDTO {
  id: number;
  text: string;
  sender: CommonUserDTO;
  replied?: CommonMessageDTO;
  chat: { id: number; members: number[]; unReadCount: number } & MetaDTO;
}
