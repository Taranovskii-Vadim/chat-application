export type MessagePayload = { id: string; senderId: number; chatId: number; text: string };

export type Chat = { id: number; title: string; members: number[] };

export type Message = { isLoading?: boolean; isError?: boolean } & Omit<MessagePayload, 'chatId'>;
