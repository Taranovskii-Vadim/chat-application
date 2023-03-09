import { action, makeObservable, observable } from 'mobx';

import { api } from 'src/api';
import putChat from 'src/api/putChat';
import getChats from 'src/api/getChats';

import { ListStore } from '../types';
import { Message } from '../chat/types';

import { Chat, OnlineUser, UpdateChatPLD } from './types';

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

  resetUnReadCount = async (id: number): Promise<void> => {
    const idx = this.data.findIndex((item) => item.id === id);

    if (this.data[idx].unReadCount) {
      this.data[idx].unReadCount = 0;

      const payload: UpdateChatPLD = { id, unReadCount: 0 };

      // await api(putChat, payload);
    }
  };

  setLastMessage = (value: Message): void => {
    this.data.map((item) => {
      if (item.id === value.chatId) {
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
