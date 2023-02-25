export type Chat = { id: number; title: string; companionId: number };

type Common = {
  id: string | number;
  text: string;
  chatId: number;
  createdAt: string;
};

type Sender = {
  id: number;
  fullname: string;
};

export type Edited = Pick<Common, 'id' | 'text'>;

export type Replied = Edited & { fullname: string };

export type Message = Common & {
  sender: Sender;
  replied?: Replied;
  isLoading?: boolean;
  isError?: boolean;
  isEdited?: boolean;
};

export type MessageDTO = Common & {
  senderId: Sender['id'];
  repliedId?: Replied['id'];
};

export type PostRequestResult = {
  id: number;
  createdAt: string;
};

export type CreateUpdateResponse = Pick<Message, 'id' | 'text'> &
  Partial<Pick<Message, 'chatId' | 'replied' | 'sender'>>;
