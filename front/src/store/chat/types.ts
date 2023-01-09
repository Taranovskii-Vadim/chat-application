export type MessagePayload = { id: string; senderId: number; chatId: number; text: string; createdAt: Date };

export type Chat = { id: number; title: string; members: number[] };

export type AddMessageResult = Pick<MessagePayload, 'id' | 'chatId'>;

export type Message = { isLoading?: boolean; isError?: boolean; createdAt: string } & Omit<
  MessagePayload,
  'chatId' | 'createdAt'
>;
