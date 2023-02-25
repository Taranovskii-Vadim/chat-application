import { formatDate } from 'src/utils';
import { Message } from 'src/store/chat/types';

import { CommonUserDTO, Method, Route } from './types';

// TODO fix types
type RepliedDTO = {
  id: string;
  text: string;
  fullname: string;
};

type ResponseDTO = {
  id: string;
  text: string;
  chatId: number;
  createdAt: string;
  sender: CommonUserDTO;
  replied?: RepliedDTO;
};

class GetMessages implements Route {
  method: Method = 'GET';

  getUrl(id?: string): string {
    return `/messages/${id}`;
  }

  // TODO we dont get isEdited from back, we can equal create and update dates
  getData(data: ResponseDTO[]): Message[] {
    return data.map(({ createdAt, sender, ...item }) => ({
      ...item,
      createdAt: formatDate(createdAt),
      sender: { id: sender.id, fullname: `${sender.name} ${sender.lastname}` },
    }));
  }
}

export default new GetMessages();
