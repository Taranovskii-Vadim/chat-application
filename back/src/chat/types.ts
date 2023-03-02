import { Message } from 'src/message/message.entity';

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
  lastMessage?: Message;
  // TODO can move to common type
  createdAt: Date;
  updatedAt: Date;
};
