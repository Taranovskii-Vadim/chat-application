export type OnlineUser = { id: number; socketId: string };

// TODO refactor store types
export type LastMessage = {
  text: string;
  createdAt: string;
  senderId: number;
};

export type Chat = {
  id: number;
  title: string;
  isOnline: boolean;
  companionId: number;
  unReadCount: number;
  lastMessage?: LastMessage;
};

export type UpdateChatPLD = Pick<Chat, 'id' | 'unReadCount'>;
