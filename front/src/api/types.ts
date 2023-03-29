export type Method = 'GET' | 'POST' | 'PATCH';

export type Payload = Record<string, string>;

// TODO fix it later
// export type Query = any;

export type Route<D = unknown> = {
  method: Method;

  getUrl: () => string;

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

// export interface CommonMessageDTO extends MetaDTO {
//   id: number;
//   text: string;
//   isEdited: boolean;
//   isHidden: boolean;
//   sender: CommonUserDTO;
//   status: "read" | "unread";
//   replied?: Omit<CommonMessageDTO, "chat">;
//   chat: { id: number; members: number[]; unReadCount: number } & MetaDTO;
// }
