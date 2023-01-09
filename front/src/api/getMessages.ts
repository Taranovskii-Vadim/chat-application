import { Message } from '../store/chat/types';
import { formatDate } from '../utils';
import { Method, Route } from './types';

interface ResponseDTO {
  id: string;
  chatId: number;
  senderId: number;
  text: string;
  createdAt: string;
}

class GetMessages implements Route {
  method: Method = 'GET';

  getUrl(id?: number): string {
    return `/messages/${id}`;
  }

  getData(data: ResponseDTO[]): Message[] {
    return data.map(({ id, senderId, text, createdAt }) => ({ id, senderId, text, createdAt: formatDate(createdAt) }));
  }
}

export default new GetMessages();
