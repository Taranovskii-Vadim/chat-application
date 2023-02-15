import { MessageDTO } from 'src/messages/types';

export type ChatDB = {
  id: number;
  members: number[];
  unReadCount: number;
  lastMessageId?: string;
};

export type GetChatDTO = {
  id: number;
  title: string;
  companionId: number;
  unReadCount: number;
  lastMessage?: MessageDTO;
  // TODO can move to common type
  createdAt: Date;
  updatedAt: Date;
};

export type Conversation = { id: number; title: string; companionId: number };
