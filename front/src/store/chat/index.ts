import { action, makeObservable, observable } from 'mobx';

import { api } from '../../api';
import getChat from '../../api/getChat';
import putMessage from '../../api/putMessage';
import getMessages from '../../api/getMessages';
import postMessage from '../../api/postMessage';

import user from '../user';
import chats from '../chats';
import { formatDate } from '../../utils';

import { Message, Replied, Chat, CreateUpdateResponse, Edited } from './types';

class ChatStore {
  text = '';

  isLoading = true;

  messages: Message[] = [];

  edited: Edited | undefined;

  replied: Replied | undefined;

  data: Chat | undefined = undefined;

  constructor() {
    makeObservable(this, {
      text: observable,
      replied: observable,
      messages: observable,
      isLoading: observable,

      setText: action,
      pushMessage: action,
      setIsLoading: action,
      setRepliedMessage: action,
      updateMessage: action,
    });
  }

  setIsLoading = (value: boolean): void => {
    this.isLoading = value;
  };

  setRepliedMessage = (value: Replied | undefined): void => {
    this.replied = value;
  };

  pushMessage = (message: Message): void => {
    this.messages.push(message);
  };

  setEdited = (value: Edited | undefined): void => {
    this.edited = value;
  };

  setText = (value: string): void => {
    if (!value) {
      this.setEdited(undefined);
    }

    this.text = value;
  };

  updateMessage = (id: Message['id'], value: Partial<Message>): void => {
    const index = this.messages.findIndex((item) => item.id === id);

    this.messages[index] = { ...this.messages[index], ...value };
  };

  createUpdateMessage = async (): Promise<CreateUpdateResponse | void> => {
    if (this.data && user.data) {
      const id = this.edited?.id || crypto.randomUUID();

      try {
        const text = this.text;
        const chatId = this.data.id;
        const createdAt = new Date();
        const senderId = user.data.id;
        const repliedId = this.replied?.id;

        const payload = { id, text };

        let result: CreateUpdateResponse = payload;

        // TODO temp must set fullname empty string because we only have id in user. Must expand getProfile route to get fullname
        const sender: Message['sender'] = { id: senderId, fullname: 'Temp Fix' };

        const replied = this.replied && {
          id: this.replied.id,
          text: this.replied.text,
          fullname: this.replied.fullname,
        };

        if (this.edited) {
          this.updateMessage(this.edited.id, { text, isEdited: true, isLoading: true });
          await api(putMessage, payload);
        } else {
          result = { ...result, chatId, replied, sender };
          this.pushMessage({ ...payload, chatId, sender, replied, createdAt: formatDate(createdAt), isLoading: true });
          await api(postMessage, { ...payload, chatId, repliedId, senderId, createdAt });
          chats.setLastMessage(chatId, { text, senderId, createdAt: formatDate(createdAt) });
        }

        this.setEdited(undefined);
        this.setRepliedMessage(undefined);

        return result;
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
