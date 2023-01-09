import { formatDate } from '../utils';
import { Chat } from '../store/chats/types';

import { Method, Route } from './types';

interface ResponseDTO {
  id: number;
  title: string;
  members: number[];
  unReadCount: number;
  lastMessage?: {
    text: string;
    createdAt: string;
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
        createdAt: formatDate(lastMessage.createdAt),
      },
      ...others,
    }));
  }
}

export default new GetChats();
