import { Message } from 'src/store/chat/types';
import { formatDate } from 'src/utils';
import { Method, Route } from './types';

type SenderDTO = {
  id: number;
  fullname: string;
};

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
  sender: SenderDTO;
  replied?: RepliedDTO;
};

class GetMessages implements Route {
  method: Method = 'GET';

  getUrl(id?: number): string {
    return `/messages/${id}`;
  }

  // TODO we dont get isEdited from back, we can equal create and update dates
  getData(data: ResponseDTO[]): Message[] {
    return data.map((item) => ({
      ...item,
      createdAt: formatDate(item.createdAt),
    }));
  }
}

export default new GetMessages();
