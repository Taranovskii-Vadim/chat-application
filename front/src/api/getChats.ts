import { Chat } from 'src/store/chats/types';

import { CommonChatDTO, MetaDTO, Method, Route } from './types';

interface ResponseDTO extends CommonChatDTO, MetaDTO {
  unReadCount: number;
  lastMessage: any;
}

// last message
// createdAt: '2023-02-15T16:13:49.185Z';
// id: 2;
// isEdited: false;
// text: 'hello user';
// updatedAt: '2023-02-15T16:13:49.185Z';

class GetChats implements Route {
  method: Method = 'GET';

  getUrl(): string {
    return '/chats';
  }

  getData(data: ResponseDTO[]): Chat[] {
    return data.map(({ createdAt, updatedAt, ...others }) => ({
      // TODO back do not expand sender object
      // lastMessage: lastMessage && {
      //   text: lastMessage.text,
      //   senderId: lastMessage.sender.id,
      //   createdAt: formatDate(lastMessage.createdAt),
      // },
      isOnline: false,
      ...others,
    }));
  }
}

export default new GetChats();
