import { Chat } from '../store/chat/types';

import { CommonChatDTO, Method, Route } from './types';

interface ResponseDTO extends CommonChatDTO {
  members: number[];
}

class GetChat implements Route {
  method: Method = 'GET';

  getUrl(id?: number): string {
    return `/chats/${id}`;
  }

  getData(data: ResponseDTO): Chat {
    return data;
  }
}

export default new GetChat();
