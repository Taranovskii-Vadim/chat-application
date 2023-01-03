import { format } from 'date-fns';

import { Chat } from '../store/chats/types';

import { Method, Route } from './types';

interface ResponseDTO {
  id: number;
  title: string;
  unReadCount: number;
  lastMessage?: {
    text: string;
    createdAt: Date;
    senderId: number;
  };
}

class GetChats implements Route {
  method: Method = 'GET';

  getUrl(): string {
    return '/chats';
  }

  getData(data: ResponseDTO[]): Chat[] {
    return data.map(({ lastMessage, ...others }) => ({
      lastMessage: lastMessage && {
        text: lastMessage.text,
        senderId: lastMessage.senderId,
        createdAt: format(new Date(lastMessage.createdAt), 'dd.mm.yyyy'),
      },
      ...others,
    }));
  }
}

export default new GetChats();
