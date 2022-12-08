export type Message = {
  id: number;
  chatId: number;
  senderId: number;
  text: string;
};

export type NewMessageDTO = Omit<Message, 'id'>;
