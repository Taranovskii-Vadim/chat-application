import { action, makeObservable, observable } from 'mobx';

import { api } from 'src/api';
import { formatDate } from 'src/utils';
import getChat from 'src/api/getChat';
import getMessages from 'src/api/getMessages';

import user from '../user';

import { Store, Message, CreateMessageDTO, Chat } from './types';
import postMessage from 'src/api/postMessage';

class ConversationStore implements Store {
  isLoading = true;

  currentText: string = '';

  messages: Message[] = [];

  data: Chat | undefined = undefined;

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      messages: observable,
      currentText: observable,

      setIsLoading: action,
      setCurrentText: action,
    });
  }

  setIsLoading = (value: boolean): void => {
    this.isLoading = value;
  };

  setCurrentText = (value: string): void => {
    this.currentText = value;
  };

  pushMessage = (value: Message): void => {
    this.messages.push(value);
  };

  setMessage = (id: Message['id'], value: Partial<Message>): void => {
    const idx = this.messages.findIndex((item) => item.id === id);

    this.messages[idx] = { ...this.messages[idx], ...value };
  };

  createMessage = async (): Promise<void> => {
    if (!this.currentText) return;
    // WARN we create temp id and createdAt in front just for show message before get api response
    const tempId = Date.now();
    const createdAt = formatDate(new Date());

    try {
      if (!this.data) throw new Error('Not found chat data');
      if (!user.data || !user.socket) throw new Error('Not found user data');

      const text = this.currentText;

      const sender: Message['sender'] = { id: user.data.id, fullname: user.data.fullname };

      this.pushMessage({ id: tempId, createdAt, text, sender, isLoading: true, error: '' });

      const payload: CreateMessageDTO = { text, senderId: sender.id, chatId: this.data.id };

      const result = await api(postMessage, payload);

      this.setMessage(tempId, result);

      user.socket.emit('sendMessage', { ...result, receiverId: this.data.receiverId });
    } catch (e) {
      this.setMessage(tempId, { isLoading: false, error: e instanceof Error ? e.message : (e as string) });
    } finally {
      this.setCurrentText('');
    }
  };

  fetchData = async (conversationId: string): Promise<void> => {
    try {
      this.setIsLoading(true);

      const chat = await api(getChat, undefined, conversationId);
      const messages = await api(getMessages, undefined, conversationId);

      this.data = chat;
      this.messages = messages;
    } catch (e) {
      console.error(e);
    } finally {
      this.setIsLoading(false);
    }
  };
}

export default ConversationStore;
