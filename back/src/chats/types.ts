// lastMessage: { senderId: number; text: string };
// TODO add last message object, lastmessage time

type CommonChat = {
  id: number;
  unReadCount: number;
};

export type Chat = CommonChat & {
  members: number[];
};

export type ExpandedChat = CommonChat & {
  title: string;
};

export type NewChatDTO = {
  senderId: number;
  receiverId: number;
};
