import { Message } from 'src/store/conversation/types';

import { mapMessageDTO } from './helpers';
import { CommonMessageDTO, Method, Route } from './types';

class PatchMessage implements Route {
  method: Method = 'PATCH';

  getUrl(id?: string): string {
    return `/messages/${id || ''}`;
  }

  getData(response: CommonMessageDTO): Message {
    return mapMessageDTO(response);
  }
}

export default new PatchMessage();
