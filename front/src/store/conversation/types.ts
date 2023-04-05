import { Base, CommonChat, CommonMessage } from '../types';

export type Message = CommonMessage & {
  error: string;
  isEdited: boolean;
  isLoading: boolean;
};

export type Chat = CommonChat & { receiverId: number };

export type UpdateMessageDTO = Pick<Message, 'text'>;

export type CreateMessageDTO = UpdateMessageDTO & { senderId: Message['sender']['id']; chatId: number };

export type Edited = { id: Message['id']; text: Message['text'] };

export interface Store extends Base<CommonChat> {
  edited: Edited;
  currentText: string;
  messages: Message[];

  resetEdited: () => void;
  submitMessage: () => void;
  updateMessage: () => Promise<void>;
  createMessage: () => Promise<void>;
  setEdited: (value: Edited) => void;
  setCurrentText: (value: string) => void;
  setMessage: (id: number, value: Partial<Message>) => void;
}
