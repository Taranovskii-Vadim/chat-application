import { Message } from 'src/store/conversation/types';

import { mapMessageDTO } from './helpers';
import { CommonMessageDTO, Method, Route } from './types';

class PostMessage implements Route {
  method: Method = 'POST';

  getUrl(): string {
    return '/messages';
  }

  getData(response: CommonMessageDTO): Message {
    return mapMessageDTO(response);
  }
}

export default new PostMessage();
