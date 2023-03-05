import { action, makeObservable, observable } from 'mobx';

import { api } from 'src/api';
import putMessage from 'src/api/putMessage';
import getMessages from 'src/api/getMessages';
import postMessage from 'src/api/postMessage';

import { formatDate } from 'src/utils';

import user from '../user';
import chats from '../chats';

import { Edited, Message, Replied } from './types';

class ChatStore {
  text = '';

  isLoading = true;

  edited: U<Edited>;

  replied: U<Replied>;

  messages: Message[] = [];

  constructor() {
    makeObservable(this, {
      text: observable,
      replied: observable,
      messages: observable,
      isLoading: observable,

      setText: action,
      pushMessage: action,
      setIsLoading: action,
      setMessage: action,
      setRepliedMessage: action,
    });
  }

  setIsLoading = (value: boolean): void => {
    this.isLoading = value;
  };

  setText = (value: string): void => {
    this.text = value;
  };

  setMessage = (id: Message['id'], value: Partial<Message>): void => {
    const idx = this.messages.findIndex((item) => item.id === id);

    this.messages[idx] = { ...this.messages[idx], ...value };
  };

  setEdited = (value: U<Edited>): void => {
    this.edited = value;
  };

  setRepliedMessage = (value: U<Replied>): void => {
    this.replied = value;
  };

  pushMessage = (message: Message): void => {
    this.messages.push(message);
  };

  createMessage = async (chatId: number): Promise<Message | void> => {
    if (!user.data) return;

    const id = crypto.randomUUID();
    const senderId = user.data.id;
    const repliedId = this.replied?.id;

    const replied = this.replied && {
      id: this.replied.id,
      text: this.replied.text,
      fullname: this.replied.fullname,
    };

    const sender: Message['sender'] = { id: senderId, fullname: user.data.fullname };

    try {
      const text = this.text;

      this.pushMessage({ id, text, chatId, sender, replied, createdAt: formatDate(new Date()), isLoading: true });

      const result = await api(postMessage, { text, chatId, repliedId, senderId });

      this.setMessage(id, { ...result, isLoading: false });

      chats.setLastMessage(result);

      return result;
    } catch (e) {
      this.setMessage(id, { isError: true });
    }
  };

  updateMessage = async (): Promise<(Message & { isLastMessage: boolean }) | void> => {
    if (!this.edited) return;

    const id = this.edited.id;

    try {
      const text = this.text;

      this.setMessage(id, { text, isEdited: true, isLoading: true });

      const data = await api(putMessage, { id, text });
      const isLastMessage = this.messages.findIndex((item) => item.id === data.id) === this.messages.length - 1;

      if (isLastMessage) {
        chats.setLastMessage(data);
      }

      return { ...data, isLastMessage };
    } catch (e) {
      this.setMessage(id, { isError: true });
    } finally {
      this.setMessage(id, { isLoading: false });
    }
  };

  fetchData = async (chatId: string): Promise<void> => {
    try {
      this.setIsLoading(true);

      const messages = await api(getMessages, undefined, chatId);

      this.messages = messages;
    } finally {
      this.setIsLoading(false);
    }
  };
}

export default ChatStore;
