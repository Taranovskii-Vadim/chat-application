import { Chat } from 'src/store/user/types';

import { MetaDTO, Method, Route } from './types';

interface ResponseDTO extends MetaDTO {
  id: number;
  title: string;
}

class GetChats implements Route {
  method: Method = 'GET';

  getUrl(): string {
    return '/chats';
  }

  getData(data: ResponseDTO[]): Chat[] {
    return data.map((item) => ({ id: item.id, title: item.title }));
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
