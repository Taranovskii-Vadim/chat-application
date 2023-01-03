export type LastMessage = {
  text: string;
  createdAt: Date;
};

export type Message = LastMessage & {
  id: number;
  chatId: number;
  senderId: number;
};

export type NewMessageDTO = Omit<Message, 'id'>;
