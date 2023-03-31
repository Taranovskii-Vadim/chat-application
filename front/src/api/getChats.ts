import { formatDate } from 'src/utils';
import { Chat } from 'src/store/user/types';

import { MetaDTO, Method, Route, CommonUserDTO } from './types';

interface LastMessageDTO extends MetaDTO {
  id: number;
  isEdited: boolean;
  isHidden: boolean;
  status: string;
  text: string;
  sender: CommonUserDTO;
}

interface ResponseDTO extends MetaDTO {
  id: number;
  title: string;
  unReadCount: number;
  lastMessage: LastMessageDTO;
}

class GetChats implements Route {
  method: Method = 'GET';

  getUrl(): string {
    return '/chats';
  }

  getData(data: ResponseDTO[]): Chat[] {
    return data.map(({ lastMessage, ...item }) => ({
      ...item,
      lastMessage: lastMessage && {
        id: lastMessage.id,
        text: lastMessage.text,
        createdAt: formatDate(lastMessage.createdAt),
        sender: { id: lastMessage.sender.id, fullname: `${lastMessage.sender.lastname} ${lastMessage.sender.name}` },
      },
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    }));
    // return data.map(({ createdAt, updatedAt, lastMessage, ...others }) => ({
    //   ...others,
    //   isOnline: false,
    //   lastMessage: lastMessage && {
    //     id: lastMessage.id,
    //     text: lastMessage.text,
    //     createdAt: formatDate(lastMessage.createdAt),
    //     sender: { id: lastMessage.sender.id, fullname: `${lastMessage.sender.lastname} ${lastMessage.sender.name}` },
    //   },
    // }));
  }
}

export default new GetChats();
