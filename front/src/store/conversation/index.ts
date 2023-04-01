import { action, makeObservable, observable } from 'mobx';

import { Store } from './types';
import { CommonChat } from '../types';
import { api } from 'src/api';
import getChat from 'src/api/getChat';

class ConversationStore implements Store {
  isLoading = true;

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

      this.data = chat;
    } catch (e) {
      console.error(e);
    } finally {
      this.setIsLoading(false);
    }
  };
}

export default ConversationStore;
