type MessageId = number;

type CommonMessage = {
  id: MessageId;
  text: string;
  chatId: number;
  createdAt: Date;
};

type SenderDTO = {
  id: number;
  fullname: string;
};

type RepliedDTO = {
  id: MessageId;
  text: string;
  fullname: string;
};

export type Message = CommonMessage & {
  repliedId?: MessageId;
  senderId: SenderDTO['id'];
};

export type MessageDTO = CommonMessage & {
  sender: SenderDTO;
  replied?: RepliedDTO;
};
