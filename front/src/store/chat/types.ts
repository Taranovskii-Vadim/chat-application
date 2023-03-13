type Common = {
  text: string;
  chatId: number;
  createdAt: string;
  id: string | number;
};

type Sender = {
  id: number;
  fullname: string;
};

export type Edited = Pick<Common, 'id' | 'text'>;

export type Replied = Edited & { fullname: string };

export type Message = Common & {
  sender: Sender;
  status: 'read' | 'unread';
  replied?: Replied;
  isError?: boolean;
  isEdited?: boolean;
  isLoading?: boolean;
};
