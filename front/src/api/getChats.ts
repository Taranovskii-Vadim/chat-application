import { formatDate } from 'src/utils';
import { Chat } from 'src/store/user/types';

import { mapUserDTO } from './helpers';
import { Method, Route, CommonChatDTO } from './types';

class GetChats implements Route {
  method: Method = 'GET';

  getUrl(): string {
    return '/chats';
  }

  getData(data: CommonChatDTO[]): Chat[] {
    return data.map(({ lastMessage, ...item }) => ({
      ...item,
      lastMessage: lastMessage && {
        id: lastMessage.id,
        sender: mapUserDTO(lastMessage.sender),
        createdAt: formatDate(lastMessage.createdAt),
        text: lastMessage.text || (lastMessage.file ? 'file' : ''),
      },
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    }));
  }
}

export default new GetChats();
