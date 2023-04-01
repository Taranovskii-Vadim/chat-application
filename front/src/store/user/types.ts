import { Base, CommonChat, Message } from '../types';

export type Profile = {
  id: number;
  fullname: string;
};

export type Chat = CommonChat & {
  avatar: string;
  unReadCount: number;
  lastMessage?: Message;
};

export interface Store extends Base<Profile> {
  chats: Chat[];
  socket: unknown;
  fetchData: () => Promise<void>;
}
