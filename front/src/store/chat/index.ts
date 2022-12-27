import { action, makeObservable, observable } from 'mobx';

import { api } from '../../api';
import getChat from '../../api/getChat';
import { Chat } from '../types';
// import getMessages from '../../api/getMessages';
// import postMessage from '../../api/postMessage';

// import { Message, MessagePayload } from './types';

class ChatStore {
  data: Chat | undefined = undefined;

  isLoading = true;

  // isFormLoading = false;
  constructor() {
    makeObservable(this, {
      isLoading: observable,
      // isFormLoading: observable,

      setIsLoading: action,
      // setIsFormLoading: action,
    });
  }

  setIsLoading = (value: boolean): void => {
    this.isLoading = value;
  };

  // setIsFormLoading = (value: boolean): void => {
  //   this.isFormLoading = value;
  // };

  // addMessage = async (text: string): Promise<void> => {
  //   try {
  //     this.setIsFormLoading(true);

  //     const payload: MessagePayload = { senderId: 1, chatId: 1, text };

  //     const id = await api(postMessage, payload);

  //     this.data.push({ id, ...payload });
  //   } finally {
  //     this.setIsFormLoading(false);
  //   }
  // };

  fetchData = async (chatId: string | undefined): Promise<void> => {
    try {
      this.setIsLoading(true);

      const result = await api(getChat, undefined, Number(chatId));

      this.data = result;
    } finally {
      this.setIsLoading(false);
    }
  };
}

export default ChatStore;
