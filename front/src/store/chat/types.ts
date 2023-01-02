export type MessagePayload = { senderId: number; chatId: number; text: string };

export type Chat = { id: number; title: string; members: number[] };

export type Message = { id: number } & Omit<MessagePayload, 'chatId'>;
