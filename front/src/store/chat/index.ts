import { action, makeObservable, observable } from 'mobx';

import { api } from 'src/api';
import putMessage from 'src/api/putMessage';
import getMessages from 'src/api/getMessages';
import postMessage from 'src/api/postMessage';

import { formatDate } from 'src/utils';

import user from '../user';
import chats from '../chats';

import { Edited, Message, Replied } from './types';

class ChatStore {
  text = '';

  isLoading = true;

  edited: U<Edited>;

  replied: U<Replied>;

  messages: Message[] = [];

  constructor() {
    makeObservable(this, {
      text: observable,
      replied: observable,
      messages: observable,
      isLoading: observable,

      setText: action,
      pushMessage: action,
      setIsLoading: action,
      updateMessage: action,
      setRepliedMessage: action,
    });
  }

  setIsLoading = (value: boolean): void => {
    this.isLoading = value;
  };

  setText = (value: string): void => {
    this.text = value;
  };

  updateMessage = (id: Message['id'], value: Partial<Message>): void => {
    const idx = this.messages.findIndex((item) => item.id === id);

    this.messages[idx] = { ...this.messages[idx], ...value };
  };

  setEdited = (value: U<Edited>): void => {
    this.edited = value;
  };

  setRepliedMessage = (value: U<Replied>): void => {
    this.replied = value;
  };

  pushMessage = (message: Message): void => {
    this.messages.push(message);
  };

  // TODO split this function
  createUpdateMessage = async (chatId: number): Promise<Message | void> => {
    if (user.data) {
      const id = this.edited?.id || crypto.randomUUID();

      try {
        const text = this.text;
        const senderId = user.data.id;
        const repliedId = this.replied?.id;

        // let payload: CreateUpdateResponse = { id, text };

        const sender: Message['sender'] = { id: senderId, fullname: user.data.fullname };

        const replied = this.replied && {
          id: this.replied.id,
          text: this.replied.text,
          fullname: this.replied.fullname,
        };

        if (this.edited) {
          this.updateMessage(this.edited.id, { text, isEdited: true, isLoading: true });
          // TODO handle new api message here and return it
          await api(putMessage, { id, text });
        } else {
          this.pushMessage({ id, text, chatId, sender, replied, createdAt: formatDate(new Date()), isLoading: true });

          const result = await api(postMessage, { text, chatId, repliedId, senderId });

          this.updateMessage(id, { ...result, isLoading: false });

          chats.setLastMessage(result);

          return result;
        }
      } catch {
        this.updateMessage(id, { isError: true });
      } finally {
        this.setEdited(undefined);
        this.setRepliedMessage(undefined);
        this.updateMessage(id, { isLoading: false });
      }
    }
  };

  fetchData = async (chatId: string): Promise<void> => {
    try {
      this.setIsLoading(true);

      const messages = await api(getMessages, undefined, chatId);

      this.messages = messages;
    } finally {
      this.setIsLoading(false);
    }
  };
}

export default ChatStore;
