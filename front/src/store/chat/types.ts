type Sender = {
  id: number;
  fullname: string;
};

// TODO a lot types refactor

export type Replied = {
  id: string;
  fullname: string;
  text: string;
};

export type MessagePayload = {
  id: string;
  senderId: Sender['id'];
  repliedId?: string;
  chatId: number;
  text: string;
  createdAt: Date;
};

export type Chat = { id: number; title: string; members: number[] };

export type AddMessageResult = Pick<MessagePayload, 'id' | 'chatId'>;

export type Message = {
  isLoading?: boolean;
  isError?: boolean;
  createdAt: string;
  sender: Sender;
  replied?: Replied;
} & Omit<MessagePayload, 'chatId' | 'createdAt' | 'senderId' | 'repliedId'>;

export type RepliedMessage = Pick<Message, 'id' | 'text' | 'sender'>;
