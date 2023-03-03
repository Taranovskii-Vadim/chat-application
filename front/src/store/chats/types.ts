import { Message } from '../chat/types';
import { CommonChat } from '../types';

export type OnlineUser = { id: number; socketId: string };

export type Chat = CommonChat & {
  isOnline: boolean;

  unReadCount: number;
  lastMessage?: Message;
};

export type UpdateChatPLD = Pick<Chat, 'id' | 'unReadCount'>;
