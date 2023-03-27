export type Method = 'GET' | 'POST' | 'PATCH';

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

export interface CommonUserDTO extends MetaDTO {
  id: number;
  name: string;
  login: string;
  lastname: string;
}

export interface CommonMessageDTO extends MetaDTO {
  id: number;
  text: string;
  isEdited: boolean;
  isHidden: boolean;
  sender: CommonUserDTO;
  status: 'read' | 'unread';
  replied?: Omit<CommonMessageDTO, 'chat'>;
  chat: { id: number; members: number[]; unReadCount: number } & MetaDTO;
}