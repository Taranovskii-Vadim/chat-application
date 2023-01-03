export type Chat = {
  id: number;
  title: string;
  unReadCount: number;
  lastMessage?: {
    text: string;
    createdAt: string;
    senderId: number;
  };
};
