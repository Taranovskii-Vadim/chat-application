import { LastMessage } from 'src/store/types';

import { formatDate } from 'src/utils';
import { CommonMessageDTO, Method, Route } from './types';

class PostMessage implements Route {
  method: Method = 'POST';

  getUrl(): string {
    return '/messages';
  }

  getData({ id, createdAt, text, sender }: CommonMessageDTO): LastMessage {
    return { id, text, senderId: sender.id, createdAt: formatDate(createdAt) };
  }
}

export default new PostMessage();
