export type Method = 'GET' | 'POST' | 'PATCH';

export type Payload = Record<string, string>;

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

type LastMessageDTO = MetaDTO & {
  id: number;
  isEdited: boolean;
  isHidden: boolean;
  status: string;
  text: string;
  sender: CommonUserDTO;
};

export type CommonChatDTO = MetaDTO & {
  id: number;
  title: string;
  unReadCount: number;
  lastMessage: LastMessageDTO;
};
