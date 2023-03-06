import { formatDate } from 'src/utils';
import { Chat } from 'src/store/chats/types';

import { CommonChatDTO, Method, Route } from './types';

class GetChats implements Route {
  method: Method = 'GET';

  getUrl(): string {
    return '/chats';
  }

  getData(data: CommonChatDTO[]): Chat[] {
    return data.map(({ createdAt, updatedAt, lastMessage, pinnedMessage, ...others }) => ({
      ...others,
      isOnline: false,
      pinnedMessage: pinnedMessage && {
        id: pinnedMessage.id,
        text: pinnedMessage.text,
      },
      lastMessage: lastMessage && {
        id: lastMessage.id,
        text: lastMessage.text,
        chatId: lastMessage.chat.id,
        createdAt: formatDate(lastMessage.createdAt),
        sender: { id: lastMessage.sender.id, fullname: `${lastMessage.sender.lastname} ${lastMessage.sender.name}` },
        replied: lastMessage.replied && {
          id: lastMessage.replied.id,
          text: lastMessage.replied.text,
          fullname: `${lastMessage.replied.sender.lastname} ${lastMessage.replied.sender.name}`,
        },
      },
    }));
  }
}

export default new GetChats();
