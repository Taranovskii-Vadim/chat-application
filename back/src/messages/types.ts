type MessageId = string;

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
  replied?: {
    id: MessageId;
    senderId: number;
  };
  senderId: SenderDTO['id'];
};

export type MessageDTO = CommonMessage & {
  sender: SenderDTO;
  replied?: RepliedDTO;
};
