import { action, makeObservable, observable } from 'mobx';

import { api } from '../../api';
import getChat from '../../api/getChat';
import getMessages from '../../api/getMessages';
import postMessage from '../../api/postMessage';

import user from '../user';
import chats from '../chats';
import { formatDate } from '../../utils';

import { Message, Replied, Chat } from './types';

class ChatStore {
  data: Chat | undefined = undefined;

  isLoading = true;

  replied: Replied | undefined;

  isFormLoading = false;

  isUserOnline = false;

  messages: Message[] = [];

  constructor() {
    makeObservable(this, {
      messages: observable,
      replied: observable,
      isLoading: observable,
      isFormLoading: observable,
      isUserOnline: observable,

      setMessage: action,
      setIsLoading: action,
      setRepliedMessage: action,
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

  setRepliedMessage = (value: Replied | undefined): void => {
    this.replied = value;
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

  // TODO remove any

  addMessage = async (text: string): Promise<any> => {
    if (this.data && user.data) {
      const id = crypto.randomUUID();

      try {
        const chatId = this.data.id;
        const createdAt = new Date();
        const senderId = user.data.id;
        const repliedId = this.replied?.id;

        const payload = { id, text, chatId };

        // TODO temp must set fullname empty string because we only have id in user. Must expand getProfile route to get fullname
        const sender: Message['sender'] = { id: senderId, fullname: 'Temp Fix' };

        const replied = this.replied && {
          id: this.replied.id,
          text: this.replied.text,
          fullname: this.replied.fullname,
        };

        this.setMessage({ ...payload, sender, replied, createdAt: formatDate(createdAt), isLoading: true });

        await api(postMessage, { ...payload, repliedId, senderId, createdAt });

        this.setRepliedMessage(undefined);

        chats.setLastMessage(chatId, { text, senderId, createdAt: formatDate(createdAt) });

        return { id, chatId, replied, sender };
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
