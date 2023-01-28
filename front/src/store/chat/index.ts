import { action, makeObservable, observable } from 'mobx';

import { api } from '../../api';
import getChat from '../../api/getChat';
import getMessages from '../../api/getMessages';
import postMessage from '../../api/postMessage';

import chats from '../chats';
import { formatDate } from '../../utils';

import { Message, Chat } from './types';

class ChatStore {
  data: Chat | undefined = undefined;

  isLoading = true;

  isFormLoading = false;

  isUserOnline = false;

  messages: Message[] = [];

  constructor() {
    makeObservable(this, {
      messages: observable,
      isLoading: observable,
      isFormLoading: observable,
      isUserOnline: observable,

      setMessage: action,
      setIsLoading: action,
      updateMessage: action,
      setIsUserOnline: action,
      setIsFormLoading: action,
    });
  }

  setIsUserOnline = (value: boolean): void => {
    this.isUserOnline = value;
  };

  setIsLoading = (value: boolean): void => {
    this.isLoading = value;
  };

  setMessage = (message: Message): void => {
    this.messages.push(message);
  };

  updateMessage = (id: Message['id'], value: Partial<Message>): void => {
    this.messages = this.messages.map((item) => {
      if (item.id === id) {
        item = { ...item, ...value };
      }

      return item;
    });
  };

  setIsFormLoading = (value: boolean): void => {
    this.isFormLoading = value;
  };

  addMessage = async (senderId: number, text: string) => {
    if (this.data) {
      const chatId = this.data.id;
      const createdAt = new Date();
      const id = crypto.randomUUID();

      try {
        const sender = { id: senderId, fullname: '' };

        const payload: any = { id, chatId, text, createdAt };

        // TODO fix empty
        this.setMessage({
          ...payload,
          isLoading: true,
          sender,
          createdAt: formatDate(createdAt),
        });

        await api(postMessage, { senderId, ...payload });

        chats.setLastMessage(chatId, { text, senderId, createdAt: formatDate(createdAt) });

        return { id, chatId, sender };
      } catch {
        // TODO add context menu with resend or delete option
        this.updateMessage(id, { isError: true });
      } finally {
        this.updateMessage(id, { isLoading: false });
      }
    }
  };

  fetchData = async (chatId: number): Promise<void> => {
    try {
      this.setIsLoading(true);

      const result = await api(getChat, undefined, chatId);
      // TODO here we get last 10 messages after that we must load them by scroll
      const messages = await api(getMessages, undefined, chatId);

      this.data = result;
      this.messages = messages;
    } finally {
      this.setIsLoading(false);
    }
  };
}

export default ChatStore;
