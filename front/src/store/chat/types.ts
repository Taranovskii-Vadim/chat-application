import { CommonMessage } from '../types';

type Common = CommonMessage & {
  chatId: number;
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
  replied?: Replied;
  isError?: boolean;
  isEdited?: boolean;
  isLoading?: boolean;
};

export type PostRequestResult = Pick<Common, 'id' | 'createdAt'>;

export type CreateUpdateResponse = Edited & Partial<Pick<Message, 'chatId' | 'replied' | 'sender'>>;
