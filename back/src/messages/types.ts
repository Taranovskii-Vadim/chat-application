export type LastMessage = {
  text: string;
  createdAt: Date;
  senderId: number;
};

export type Message = LastMessage & {
  id: string;
  chatId: number;
};
