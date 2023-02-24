import { formatDate } from 'src/utils';
import { Chat } from 'src/store/chats/types';

import { CommonChatDTO, CommonMessageDTO, MetaDTO, Method, Route } from './types';

interface ResponseDTO extends CommonChatDTO, MetaDTO {
  unReadCount: number;
  lastMessage: CommonMessageDTO;
}

class GetChats implements Route {
  method: Method = 'GET';

  getUrl(): string {
    return '/chats';
  }

  getData(data: ResponseDTO[]): Chat[] {
    return data.map(({ createdAt, updatedAt, lastMessage, ...others }) => ({
      ...others,
      isOnline: false,
      lastMessage: lastMessage && {
        text: lastMessage.text,
        senderId: lastMessage.sender.id,
        createdAt: formatDate(lastMessage.createdAt),
      },
    }));
  }
}

export default new GetChats();
