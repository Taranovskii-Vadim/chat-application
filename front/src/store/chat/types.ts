export type MessagePayload = { senderId: number; chatId: number; text: string };

export type Message = { id: number } & Omit<MessagePayload, 'chatId'>;
