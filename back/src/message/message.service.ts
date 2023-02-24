import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Message } from './message.entity';
import { InsertPayloadDTO, ResultDTO, UpdatePayloadDTO } from './message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private readonly table: Repository<Message>,
  ) {}

  async getMessages(id: number): Promise<Message[]> {
    const result = await this.table.find({
      where: { chat: { id } },
      relations: { chat: true, sender: true, replied: true },
      order: { createdAt: 'asc' },
    });

    // TODO we created prepareDTO function, but from other side we dont need we can answer everything and front can take what he wants
    // TODO but we send user password in sender
    return result;
  }

  // TODO fix this when fix front logic
  async createMessage({ text, ...ids }: InsertPayloadDTO): Promise<ResultDTO> {
    const data = {
      text,
      chat: { id: ids.chatId },
      sender: { id: ids.senderId },
      replied: { id: ids.repliedId },
    };

    const { generatedMaps } = await this.table
      .createQueryBuilder()
      .insert()
      .into(Message)
      .values(data)
      .execute();

    return { id: generatedMaps[0].id, createdAt: generatedMaps[0].createdAt };

    // TODO after create we must call this action to update id, but here we probadly have circular dep error in nest
    // this.chatsService.setChatLastMessageId(payload.chatId, payload.id);
  }

  async updateMessage(data: UpdatePayloadDTO): Promise<void> {
    await this.table.save(data);
  }
}
