export type OnlineUser = { id: number; socketId: string };

export type LastMessage = {
  text: string;
  createdAt: string;
  senderId: number;
};

export type Chat = {
  id: number;
  title: string;
  isOnline?: boolean;
  companionId: number;
  unReadCount: number;
  lastMessage?: LastMessage;
};
