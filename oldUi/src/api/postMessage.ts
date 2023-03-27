import { Message } from 'src/store/chat/types';

import { formatDate } from 'src/utils';
import { CommonMessageDTO, Method, Route } from './types';

class PostMessage implements Route {
  method: Method = 'POST';

  getUrl(): string {
    return '/messages';
  }

  getData({ createdAt, chat, replied, sender, ...common }: CommonMessageDTO): Message {
    return {
      ...common,
      chatId: chat.id,
      createdAt: formatDate(createdAt),
      sender: { id: sender.id, fullname: `${sender.lastname} ${sender.name}` },
      replied: replied && {
        id: replied.id,
        text: replied.text,
        fullname: `${replied.sender.lastname} ${replied.sender.name}`,
      },
    };
  }
}

export default new PostMessage();
