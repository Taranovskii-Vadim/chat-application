import { Message } from '../chat/types';

export type OnlineUser = { id: number; socketId: string };

export type Chat = {
  id: number;
  title: string;
  isOnline?: boolean;
  companionId: number;
  unReadCount: number;
  lastMessage?: Pick<Message, 'id' | 'text' | 'createdAt' | 'sender'>;
};

export type UpdateChatPLD = Pick<Chat, 'id' | 'unReadCount'>;
