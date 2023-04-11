import { Base, CommonChat, CommonMessage } from '../types';

export type Message = CommonMessage & {
  error: string;
  isEdited: boolean;
  isLoading: boolean;
};

export type Chat = CommonChat & { receiverId: number };

export type UpdateMessageDTO = Pick<Message, 'text'>;

export type CreateMessageDTO = UpdateMessageDTO & { senderId: Message['sender']['id']; chatId: number };

export type Extra = {
  title: string;
  id: Message['id'];
  text: Message['text'];
  type: 'edit' | 'reply' | '';
};

export interface Store extends Base<CommonChat> {
  extra: Extra;
  currentText: string;
  messages: Message[];
  resetExtra: () => void;
  submitMessage: () => void;
  setExtra: (value: Extra) => void;
  updateMessage: () => Promise<void>;
  createMessage: () => Promise<void>;
  setCurrentText: (value: string) => void;
  setMessage: (id: number, value: Partial<Message>) => void;
}
