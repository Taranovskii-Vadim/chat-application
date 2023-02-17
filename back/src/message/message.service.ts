import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Message } from './message.entity';
import { CreateMessagePayloadDTO, CreateMessageResultDTO } from './message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private readonly table: Repository<Message>,
  ) {}

  // private getSenderFullname = (data: Message['sender']): string =>
  //   `${data.name} ${data.lastname}`;

  // private prepareMessageDTO(data: Message): MessageDTO {
  //   const { replied, ...message } = data;

  //   const senderDto: MessageDTO['sender'] = {
  //     id: message.sender.id,
  //     fullname: this.getSenderFullname(message.sender),
  //   };

  //   const repliedDto: MessageDTO['replied'] = {
  //     id: replied.id,
  //     text: replied.text,
  //     fullname: this.getSenderFullname(replied.sender),
  //   };

  //   return {
  //     id: message.id,
  //     text: message.text,
  //     chatId: message.chat.id,
  //     createdAt: message.createdAt,
  //     isEdited: message.isEdited,
  //     replied: repliedDto,
  //     sender: senderDto,
  //   };
  // }

  async getMessages(id: number): Promise<Message[]> {
    const result = await this.table.find({
      where: { chat: { id } },
      relations: { chat: true, sender: true, replied: true },
    });

    // TODO we created prepareDTO function, but from other side we dont need we can answer everything and front can take what he wants
    // TODO but we send user password in sender
    return result;
  }

  // TODO fix this when fix front logic
  async createMessage({
    text,
    senderId,
    chatId,
    repliedId,
  }: CreateMessagePayloadDTO): Promise<CreateMessageResultDTO> {
    const { generatedMaps } = await this.table
      .createQueryBuilder()
      .insert()
      .into(Message)
      .values({
        text,
        chat: { id: chatId },
        sender: { id: senderId },
        replied: { id: repliedId },
      })
      .execute();

    return { id: generatedMaps[0].id, createdAt: generatedMaps[0].createdAt };

    // TODO after create we must call this action to update id, but here we probadly have circular dep error in nest
    // this.chatsService.setChatLastMessageId(payload.chatId, payload.id);
  }

  // updateMessage(data: Partial<Message>): void {
  //   const index = this.messages.findIndex(({ id }) => id === data.id);

  //   this.messages[index] = { ...this.messages[index], ...data, isEdited: true };
  // }
}
