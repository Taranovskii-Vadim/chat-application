export type LastMessage = {
  text: string;
  createdAt: Date;
  senderId: number;
};

export type Message = LastMessage & {
  id: number;
  chatId: number;
};

export type NewMessageDTO = Omit<Message, 'id'>;
