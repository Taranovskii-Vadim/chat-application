import { action, makeObservable, observable } from 'mobx';

import { api } from '../../api';
import getChat from '../../api/getChat';

import { Chat } from './types';

class ChatStore {
  isLoading = true;

  data: Chat | undefined = undefined;

  constructor() {
    makeObservable(this, {
      isLoading: observable,

      setIsLoading: action,
    });
  }

  setIsLoading = (value: boolean): void => {
    this.isLoading = value;
  };

  fetchData = async (chatId: number): Promise<void> => {
    try {
      this.setIsLoading(true);

      const result = await api(getChat, undefined, chatId);

      this.data = result;
    } finally {
      this.setIsLoading(false);
    }
  };
}

export default ChatStore;
