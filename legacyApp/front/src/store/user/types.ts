import { Base, CommonChat, CommonMessage, User } from '../types';

export type Chat = CommonChat & {
  avatar: string;
  unReadCount: number;
  lastMessage?: CommonMessage;
};

export interface Store extends Base<User> {
  chats: Chat[];
  socket: unknown;
  fetchData: () => Promise<void>;
}
