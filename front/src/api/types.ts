export type Method = 'GET' | 'POST' | 'PUT';

export type Payload = object | string | number;

// TODO fix it later
export type Query = any;

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
  pinnedMessage?: CommonMessageDTO;
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
  isEdited?: boolean;
  sender: CommonUserDTO;
  replied?: CommonMessageDTO;
  chat: { id: number; members: number[]; unReadCount: number; pinnedMessage?: CommonMessageDTO } & MetaDTO;
}
