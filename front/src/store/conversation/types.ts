import { Base, CommonChat, CommonMessage } from '../types';

export type Message = CommonMessage & {
  error: string;
  isEdited: boolean;
  isLoading: boolean;
};

export type Chat = CommonChat & { receiverId: number };

export type UpdateMessageDTO = Pick<Message, 'text'>;

export type CreateMessageDTO = UpdateMessageDTO & { senderId: Message['sender']['id']; chatId: number };

export interface Store extends Base<CommonChat> {
  currentText: string;
  messages: Message[];
  editedId: Message['id'];

  submitMessage: () => void;
  updateMessage: () => Promise<void>;
  createMessage: () => Promise<void>;
  setCurrentText: (value: string) => void;
  setEdited: (value: Message['id'], text: string) => void;
  setMessage: (id: number, value: Partial<Message>) => void;
}
