import { Chat } from 'src/store/chats/types';

import { Method, Route } from './types';

// TODO move common types in sep file
// TODO here we also get created_at and updated_at
interface ResponseDTO {
  id: number;
  title: string;
  companionId: number;
  unReadCount: number;
  lastMessage?: {
    id: string;
    text: string;
    chatId: number;
    createdAt: string;
    sender: {
      id: number;
      fullname: string;
    };
    replied: {
      id: string;
      text: string;
      fullname: string;
    };
  };
}

class GetChats implements Route {
  method: Method = 'GET';

  getUrl(): string {
    return '/chats';
  }

  getData(data: ResponseDTO[]): Chat[] {
    return data.map(({ lastMessage, ...others }) => ({
      // TODO back do not expand sender object
      // lastMessage: lastMessage && {
      //   text: lastMessage.text,
      //   senderId: lastMessage.sender.id,
      //   createdAt: formatDate(lastMessage.createdAt),
      // },
      ...others,
    }));
  }
}

export default new GetChats();
