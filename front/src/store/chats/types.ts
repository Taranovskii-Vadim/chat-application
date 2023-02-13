export type OnlineUser = { id: number };

export type LastMessage = {
  text: string;
  createdAt: string;
  senderId: number;
};

export type Chat = {
  id: number;
  title: string;
  companionId: number;
  isOnline?: boolean;
  unReadCount: number;
  lastMessage?: LastMessage;
};
