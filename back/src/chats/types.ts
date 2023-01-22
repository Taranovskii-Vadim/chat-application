import { MessageDTO } from 'src/messages/types';

export type ChatDB = {
  id: number;
  members: number[];
  unReadCount: number;
  lastMessageId?: string;
};

export type Chat = {
  id: number;
  title: string;
  members: number[];
  unReadCount: number;
  lastMessage?: MessageDTO;
};

export type Conversation = { id: number; title: string; members: number[] };

export type NewChatDTO = {
  senderId: number;
  receiverId: number;
};
