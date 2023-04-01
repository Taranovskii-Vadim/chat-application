import { action, makeObservable, observable } from 'mobx';

import { api } from 'src/api';
import getChat from 'src/api/getChat';
import getMessages from 'src/api/getMessages';

import { Store } from './types';
import { CommonChat, CommonMessage } from '../types';

class ConversationStore implements Store {
  isLoading = true;

  messages: CommonMessage[] = [];

  data: CommonChat | undefined = undefined;

  constructor() {
    makeObservable(this, {
      isLoading: observable,

      setIsLoading: action,
    });
  }

  setIsLoading = (value: boolean): void => {
    this.isLoading = value;
  };

  fetchData = async (conversationId: string): Promise<void> => {
    try {
      this.setIsLoading(true);

      const chat = await api(getChat, undefined, conversationId);
      const messages = await api(getMessages, undefined, conversationId);

      this.data = chat;
      this.messages = messages;
    } catch (e) {
      console.error(e);
    } finally {
      this.setIsLoading(false);
    }
  };
}

export default ConversationStore;
