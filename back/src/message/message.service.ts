import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ChatsService } from 'src/chat/chat.service';

import { Message } from './message.entity';
import { InsertPayloadDTO } from './message.dto';

@Injectable()
export class MessagesService {
  constructor(
    private chatsService: ChatsService,
    @InjectRepository(Message) private readonly table: Repository<Message>,
  ) {}

  async getMessages(id: number): Promise<Message[]> {
    const result = await this.table.find({
      where: { chat: { id } },
      relations: {
        chat: { pinnedMessage: true },
        sender: true,
        replied: { sender: true },
      },
      order: { createdAt: 'asc' },
    });

    // TODO we created prepareDTO function, but from other side we dont need we can answer everything and front can take what he wants
    // TODO but we send user password in sender
    return result;
  }

  async createMessage(body: InsertPayloadDTO): Promise<Message | null> {
    const { text, ...ids } = body;

    const payload = {
      chat: { id: ids.chatId },
      sender: { id: ids.senderId },
      replied: { id: ids.repliedId },
    };

    const data = await this.table
      .createQueryBuilder()
      .insert()
      .into(Message)
      .values({ text, ...payload })
      .execute();

    const id = data.generatedMaps[0].id;

    this.chatsService.updateChat({
      id: ids.chatId,
      lastMessage: { id },
    });

    return await this.table.findOne({
      where: { id },
      relations: { chat: true, sender: true, replied: { sender: true } },
    });
  }

  // TODO here we update only text. What about replied???
  async updateMessage(id: number, data: any): Promise<Message | null> {
    await this.table.save({ id, ...data });

    return await this.table.findOne({
      where: { id },
      relations: { chat: true, sender: true, replied: { sender: true } },
    });
  }
}
