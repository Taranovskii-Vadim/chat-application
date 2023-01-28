import { action, makeObservable, observable } from 'mobx';

import { api } from '../../api';
import getChat from '../../api/getChat';
import getMessages from '../../api/getMessages';
import postMessage from '../../api/postMessage';

import user from '../user';
import chats from '../chats';
import { formatDate } from '../../utils';

import { Message, Replied, Chat, AddResponse } from './types';
import putMessage from '../../api/putMessage';

class ChatStore {
  data: Chat | undefined = undefined;

  isLoading = true;

  replied: Replied | undefined;

  isFormLoading = false;

  isUserOnline = false;

  messages: Message[] = [];

  text = '';

  editId = '';

  constructor() {
    makeObservable(this, {
      text: observable,
      messages: observable,
      replied: observable,
      isLoading: observable,
      isFormLoading: observable,
      isUserOnline: observable,

      setText: action,
      pushMessage: action,
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

  pushMessage = (message: Message): void => {
    this.messages.push(message);
  };

  setText = (value: string): void => {
    this.text = value;
  };

  setEditId = (value: string): void => {
    this.editId = value;
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

  createUpdateMessage = async (): Promise<AddResponse | void> => {
    if (this.data && user.data) {
      const id = this.editId || crypto.randomUUID();

      try {
        const text = this.text;
        const chatId = this.data.id;
        const createdAt = new Date();
        const senderId = user.data.id;
        const repliedId = this.replied?.id;

        const payload = { id, text, chatId };

        // TODO temp must set fullname empty string because we only have id in user. Must expand getProfile route to get fullname
        const sender: Message['sender'] = { id: senderId, fullname: 'Temp Fix' };

        // TODO can shuffle code below
        const replied = this.replied && {
          id: this.replied.id,
          text: this.replied.text,
          fullname: this.replied.fullname,
        };

        if (this.editId) {
          // TODO call pushMessage
          // TODO enough send only text and id
          await api(putMessage, { ...payload, repliedId, senderId, createdAt });

          this.setEditId('');
        } else {
          this.pushMessage({ ...payload, sender, replied, createdAt: formatDate(createdAt), isLoading: true });
          await api(postMessage, { ...payload, repliedId, senderId, createdAt });
          chats.setLastMessage(chatId, { text, senderId, createdAt: formatDate(createdAt) });
        }

        this.setRepliedMessage(undefined);

        return { id, chatId, replied, sender, text };
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
