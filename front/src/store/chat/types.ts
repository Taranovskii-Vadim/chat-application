import { CommonChat } from '../types';

export type MessagePayload = { senderId: number; chatId: number; text: string };

export type Chat = CommonChat & { members: number[] };

export type Message = { id: number } & Omit<MessagePayload, 'chatId'>;
