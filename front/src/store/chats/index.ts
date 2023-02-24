import { action, makeObservable, observable } from 'mobx';

import { api } from 'src/api';
import getChats from 'src/api/getChats';
import { ListStore } from '../types';

import { Chat, LastMessage, OnlineUser } from './types';

class ChatsStore implements ListStore<Chat> {
  data: Chat[] = [];

  isLoading = true;

  constructor() {
    makeObservable(this, {
      data: observable,
      isLoading: observable,

      setIsOnline: action,
      setIsLoading: action,
      setLastMessage: action,
    });
  }

  setIsLoading = (value: boolean): void => {
    this.isLoading = value;
  };

  setIsOnline = (data: OnlineUser[]): void => {
    this.data.map((item) => {
      const ids = data.map(({ id }) => id);
      item.isOnline = ids.includes(item.companionId);
      return item;
    });
  };

  setLastMessage = (id: number, value: LastMessage): void => {
    this.data.map((item) => {
      if (item.id === id) {
        item.lastMessage = value;
      }

      return item;
    });
  };

  fetchData = async (): Promise<void> => {
    try {
      this.setIsLoading(true);

      const result = await api(getChats);

      this.data = result;
    } finally {
      this.setIsLoading(false);
    }
  };
}

export default new ChatsStore();
