import { action, makeObservable, observable } from 'mobx';

import { api } from 'src/api';
import { formatDate } from 'src/utils';
import putMessage from 'src/api/putMessage';
import getMessages from 'src/api/getMessages';
import postMessage from 'src/api/postMessage';

import user from '../user';

import { CreateUpdateResponse, Edited, Message, Replied } from './types';

class ConversationStore {
  text = '';

  isLoading = true;

  data: Message[] = [];

  edited: Edited | undefined;

  replied: Replied | undefined;

  constructor() {
    makeObservable(this, {
      data: observable,
      text: observable,
      replied: observable,
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
    this.data.push(message);
  };

  setEdited = (value: Edited | undefined): void => {
    this.edited = value;
  };

  setText = (value: string): void => {
    this.text = value;
  };

  updateMessage = (id: Message['id'], value: Partial<Message>): void => {
    const index = this.data.findIndex((item) => item.id === id);

    this.data[index] = { ...this.data[index], ...value };
  };

  createUpdateMessage = async (chatId: number): Promise<CreateUpdateResponse | void> => {
    if (this.data && user.data) {
      const id = this.edited?.id || crypto.randomUUID();

      try {
        const text = this.text;
        const senderId = user.data.id;
        const repliedId = this.replied?.id;

        let payload: CreateUpdateResponse = { id, text };

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
          payload = { ...payload, chatId, replied, sender };

          // TODO here we set client id and createdAt only to show message before it creates in api
          this.pushMessage({ id, text, chatId, sender, replied, createdAt: formatDate(new Date()), isLoading: true });

          const result = await api(postMessage, { text, chatId, repliedId, senderId });

          this.updateMessage(id, { ...result, isLoading: false });
          // chats.setLastMessage(chatId, { text, senderId, createdAt: formatDate(createdAt) });
        }

        this.setEdited(undefined);
        this.setRepliedMessage(undefined);

        return payload;
      } catch {
        // TODO add context menu with resend or delete option
        this.updateMessage(id, { isError: true });
      }
    }
  };

  fetchData = async (chatId: number): Promise<void> => {
    try {
      this.setIsLoading(true);

      // TODO here we get last 10 messages after that we must load them by scroll
      const messages = await api(getMessages, undefined, chatId);

      this.data = messages;
    } finally {
      this.setIsLoading(false);
    }
  };
}

export default ConversationStore;
