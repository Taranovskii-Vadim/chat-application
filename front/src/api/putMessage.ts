import { formatDate } from 'src/utils';
import { Message } from 'src/store/chat/types';
import { CommonMessageDTO, Method, Route } from './types';

class PutMessage implements Route {
  method: Method = 'PUT';

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

export default new PutMessage();
