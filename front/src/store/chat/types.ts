type Sender = {
  id: number;
  fullname: string;
};

export type MessagePayload = { id: string; senderId: Sender['id']; chatId: number; text: string; createdAt: Date };

export type Chat = { id: number; title: string; members: number[] };

export type AddMessageResult = Pick<MessagePayload, 'id' | 'chatId'>;

export type Message = {
  isLoading?: boolean;
  isError?: boolean;
  createdAt: string;
  sender: Sender;
} & Omit<MessagePayload, 'chatId' | 'createdAt' | 'senderId'>;
