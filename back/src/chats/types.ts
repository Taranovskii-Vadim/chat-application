export type Chat = {
  id: number;
  members: number[];
};

export type NewChatDTO = {
  senderId: number;
  receiverId: number;
};
