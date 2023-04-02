import { Message } from 'src/store/conversation/types';

import { mapMessageDTO } from './helpers';
import { Method, Route, CommonMessageDTO } from './types';

class GetMessages implements Route {
  method: Method = 'GET';

  getUrl(id?: string): string {
    return `/messages/${id}`;
  }

  getData(data: CommonMessageDTO[]): Message[] {
    return data.map((item) => mapMessageDTO(item));
  }
}

export default new GetMessages();
