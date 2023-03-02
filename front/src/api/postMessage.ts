import { LastMessage } from 'src/store/types';

import { formatDate } from 'src/utils';
import { Method, Route } from './types';

interface ResponseDTO {
  id: number;
  text: string;
  senderId: number;
  createdAt: string;
}

class PostMessage implements Route {
  method: Method = 'POST';

  getUrl(): string {
    return '/messages';
  }

  getData({ id, createdAt, text, senderId }: ResponseDTO): LastMessage {
    return { id, text, senderId, createdAt: formatDate(createdAt) };
  }
}

export default new PostMessage();
