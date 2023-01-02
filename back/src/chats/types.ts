// lastMessage: { senderId: number; text: string };
// TODO add last message object, lastmessage time

export type ChatDB = {
  id: number;
  members: number[];
  unReadCount: number;
  lastMessageTime: Date;
};

export type Chat = {
  id: number;
  title: string;
  unReadCount: number;
  lastMessageTime: Date;
};

export type Conversation = { id: number; title: string; members: number[] };

export type NewChatDTO = {
  senderId: number;
  receiverId: number;
};
