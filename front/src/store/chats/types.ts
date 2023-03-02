import { CommonChat, LastMessage } from '../types';

export type OnlineUser = { id: number; socketId: string };

export type Chat = CommonChat & {
  isOnline: boolean;

  unReadCount: number;
  lastMessage?: LastMessage;
};

export type UpdateChatPLD = Pick<Chat, 'id' | 'unReadCount'>;
