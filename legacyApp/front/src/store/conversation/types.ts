import { Base, CommonChat, CommonMessage } from '../types';

export type Message = CommonMessage & {
  error: string;
  isEdited: boolean;
  isLoading: boolean;
  file?: string | null;
};

export type Chat = CommonChat & { receiverId: number };

export type UpdateMessageDTO = Pick<Message, 'text'>;

export type CreateMessageDTO = UpdateMessageDTO & {
  chatId: number;
  repliedId?: Message['id'];
  senderId: Message['sender']['id'];
};

export type Extra = {
  title: string;
  id: Message['id'];
  text: Message['text'];
  type: 'edit' | 'reply' | '';
};

export interface Store extends Base<CommonChat> {
  extra: Extra;
  file: U<File>;
  currentText: string;
  messages: Message[];
  resetExtra: () => void;
  submitMessage: () => void;
  setFile: (data: File) => void;
  resetFile: () => void;
  setExtra: (value: Extra) => void;
  updateMessage: () => Promise<void>;
  createMessage: () => Promise<void>;
  setCurrentText: (value: string) => void;
  setMessage: (id: number, value: Partial<Message>) => void;
}
