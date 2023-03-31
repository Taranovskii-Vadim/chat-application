import { Message } from '../types';

export type Profile = {
  id: number;
  fullname: string;
};

export type Chat = {
  id: number;
  title: string;
  avatar: string;
  unReadCount: number;
  lastMessage?: Message;
};

export interface Store {
  socket: unknown;
  isLoading: boolean;
  data: Profile | undefined;
  chats: Chat[];
  fetchData: () => Promise<void>;
  setIsLoading: (value: boolean) => void;
}
