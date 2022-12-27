import { action, makeObservable, observable } from 'mobx';

import { api } from '../../api';
import getChat from '../../api/getChat';

import { Chat } from '../types';

import getMessages from '../../api/getMessages';
import postMessage from '../../api/postMessage';

import { Message, MessagePayload } from './types';

class ChatStore {
  data: Chat | undefined = undefined;

  isLoading = true;

  isFormLoading = false;

  messages: Message[] = [];

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      isFormLoading: observable,

      setIsLoading: action,
      setIsFormLoading: action,
    });
  }

  setIsLoading = (value: boolean): void => {
    this.isLoading = value;
  };

  setIsFormLoading = (value: boolean): void => {
    this.isFormLoading = value;
  };

  addMessage = async (senderId: number, text: string): Promise<void> => {
    if (this.data) {
      try {
        this.setIsFormLoading(true);

        const chatId = this.data.id;
        const payload: MessagePayload = { senderId, chatId, text };

        const id = await api(postMessage, payload);

        this.messages.push({ id, ...payload });
      } finally {
        this.setIsFormLoading(false);
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
