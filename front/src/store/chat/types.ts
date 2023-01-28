type Common = {
  id: string;
  text: string;
  chatId: number;
  createdAt: string;
};

type Sender = {
  id: number;
  fullname: string;
};

// export type Replied = Pick<Common, 'id' | 'text'> & { fullname: string };

export type Message = Common & {
  sender: Sender;
  // replied?: Replied;
  isLoading?: boolean;
  isError?: boolean;
};

export type MessageDTO = Common & {
  senderId: Sender['id'];
  // repliedId?: Replied['id'];
};

export type Chat = { id: number; title: string; members: number[] };

// export type AddMessageResult = Pick<MessagePayload, 'id' | 'chatId'>;

// export type Message = {
//   isLoading?: boolean;
//   isError?: boolean;
//   createdAt: string;
//   sender: Sender;
//   replied?: Replied;
// } & Omit<MessagePayload, 'chatId' | 'createdAt' | 'senderId' | 'repliedId'>;
