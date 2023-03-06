import { Method, Route } from './types';

class PinMessage implements Route {
  method: Method = 'PUT';

  getUrl({ id, chatId }: { id: string; chatId: string }): string {
    return `/chats/${chatId}/pin/${id}`;
  }

  getData() {}

  //   getData({ createdAt, chat, replied, sender, ...common }: CommonMessageDTO): Message {
  //     return {
  //       ...common,
  //       chatId: chat.id,
  //       createdAt: formatDate(createdAt),
  //       sender: { id: sender.id, fullname: `${sender.lastname} ${sender.name}` },
  //       replied: replied && {
  //         id: replied.id,
  //         text: replied.text,
  //         fullname: `${replied.sender.lastname} ${replied.sender.name}`,
  //       },
  //     };
  //   }
}

export default new PinMessage();
