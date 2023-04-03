import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { Message } from './message.entity';
import { InsertPayloadDTO, UpdatePayloadDTO } from './message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private readonly table: Repository<Message>,
  ) {}

  async getMessages(id: number, userId: number): Promise<Message[]> {
    await this.table
      .createQueryBuilder()
      .update(Message)
      .set({ status: 'read' })
      .where('chat_id_fkey = :id', { id })
      .andWhere('user_id_fkey != :userId', { userId })
      .execute();

    const result = await this.table.find({
      where: { chat: { id } },
      relations: {
        chat: true,
        sender: true,
        replied: { sender: true },
      },
      order: { createdAt: 'asc' },
    });

    return result;
  }

  getChatLastMessage = async (id: number): Promise<Message | null> => {
    const result = await this.table.findOne({
      where: { chat: { id } },
      relations: { sender: true },
      order: { createdAt: 'desc' },
    });

    return result;
  };

  getUnReadCount = async (id: number, companionId: number): Promise<number> => {
    const result = await this.table.count({
      where: {
        status: 'unread',
        chat: { id },
        sender: { id: companionId },
      },
    });

    return result;
  };

  async createMessage(body: InsertPayloadDTO): Promise<Message> {
    const { text, ...ids } = body;

    const payload = {
      chat: { id: ids.chatId },
      sender: { id: ids.senderId },
    };

    const data = await this.table
      .createQueryBuilder()
      .insert()
      .into(Message)
      .values({ text, ...payload })
      .execute();

    const id = data.generatedMaps[0].id;

    const result = await this.table.findOne({
      where: { id },
      relations: { chat: true, sender: true, replied: { sender: true } },
    });

    if (!result) throw new InternalServerErrorException();

    return result;
  }

  // WARN in our app we update only text yet.
  async updateMessage(id: number, data: UpdatePayloadDTO): Promise<Message> {
    await this.table.save({ id, isEdited: true, ...data });

    const result = await this.table.findOne({
      where: { id },
      relations: { chat: true, sender: true, replied: { sender: true } },
    });

    if (!result) throw new NotFoundException();

    return result;
  }
}
