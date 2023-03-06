import { formatDate } from 'src/utils';
import { Message } from 'src/store/chat/types';

import { CommonMessageDTO, Method, Route } from './types';

class GetMessages implements Route {
  method: Method = 'GET';

  getUrl(id?: string): string {
    return `/messages/${id}`;
  }

  getData(data: CommonMessageDTO[]): Message[] {
    return data.map(({ createdAt, updatedAt, chat, replied, sender, ...common }) => ({
      ...common,
      isPinned: chat.pinnedMessage?.id === common.id,
      chatId: chat.id,
      createdAt: formatDate(createdAt),
      // TODO maybe create method in front, or add map in back with help of typeorm
      sender: { id: sender.id, fullname: `${sender.lastname} ${sender.name}` },
      replied: replied && {
        id: replied.id,
        text: replied.text,
        fullname: `${replied.sender.lastname} ${replied.sender.name}`,
      },
    }));
  }
}

export default new GetMessages();
