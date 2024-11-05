export type Method = 'GET' | 'POST' | 'PATCH';

export type Payload = Record<string, string | number> | FormData;

export type Route<D = unknown> = {
  method: Method;

  getUrl: (q?: string) => string;

  getData: (responseDTO: any) => D;
};

export type MetaDTO = {
  updatedAt: string;
  createdAt: string;
};

export type CommonUserDTO = MetaDTO & {
  id: number;
  name: string;
  login: string;
  lastname: string;
};

export interface CommonMessageDTO extends MetaDTO {
  id: number;
  text: string;
  // filePath: string;
  file: string | null;
  isEdited: boolean;
  isHidden: boolean;
  sender: CommonUserDTO;
  status: 'read' | 'unread';
  chat: { id: number; members: number[]; unReadCount: number } & MetaDTO;
}

export type CommonChatDTO = MetaDTO & {
  id: number;
  title: string;
  unReadCount: number;
  memberId: number;
  lastMessage: CommonMessageDTO;
};
