// lastMessage: { senderId: number; text: string };
// TODO add last message object, lastmessage time

type CommonChat = {
  id: number;
  unReadCount: number;
};

export type ChatDB = CommonChat & {
  members: number[];
};

export type ChatWithTitle = CommonChat & {
  id: number;
  unReadCount: number;
  title: string;
};

export type Chat = CommonChat & {
  id: number;
  title: string;
  members: number[];
  unReadCount: number;
};

export type NewChatDTO = {
  senderId: number;
  receiverId: number;
};
