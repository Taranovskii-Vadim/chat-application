import { formatDate } from 'src/utils';
import { Message } from 'src/store/chat/types';

import { Method, Route } from './types';

// TODO add types

class GetMessages implements Route {
  method: Method = 'GET';

  getUrl(id?: string): string {
    return `/messages/${id}`;
  }

  getData(data: any[]): Message[] {
    return data.map(({ createdAt, updatedAt, sender, ...item }) => ({
      ...item,
      createdAt: formatDate(createdAt),
      isEdited: createdAt !== updatedAt,
      sender: { id: sender.id, fullname: `${sender.name} ${sender.lastname}` },
    }));
  }
}

export default new GetMessages();
