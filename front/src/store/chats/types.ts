export type OnlineUser = { id: number };

export type Chat = {
  id: number;
  title: string;
  members: number[];
  isOnline?: boolean;
  unReadCount: number;
  lastMessage?: {
    text: string;
    createdAt: string;
    senderId: number;
  };
};
