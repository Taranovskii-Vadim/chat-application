import { Message } from '../store/chat/types';
import { Method, Route } from './types';

interface ResponseDTO {
  id: number;
  chatId: number;
  senderId: number;
  text: string;
}

class GetMessages implements Route {
  method: Method = 'GET';

  getUrl(id?: number): string {
    return `/messages/${id}`;
  }

  getData(data: ResponseDTO[]): Message[] {
    return data.map(({ id, senderId, text }) => ({ id, senderId, text }));
  }
}

export default new GetMessages();
