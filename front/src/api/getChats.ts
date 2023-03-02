import { formatDate } from 'src/utils';
import { Chat } from 'src/store/chats/types';

import { CommonChatDTO, Method, Route } from './types';

class GetChats implements Route {
  method: Method = 'GET';

  getUrl(): string {
    return '/chats';
  }

  getData(data: CommonChatDTO[]): Chat[] {
    return data.map(({ createdAt, updatedAt, lastMessage, ...others }) => ({
      ...others,
      isOnline: false,
      lastMessage: lastMessage && {
        id: lastMessage.id,
        text: lastMessage.text,
        senderId: lastMessage.sender.id,
        createdAt: formatDate(lastMessage.createdAt),
      },
    }));
  }
}

export default new GetChats();
