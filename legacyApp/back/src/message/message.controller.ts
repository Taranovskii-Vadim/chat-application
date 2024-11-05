import { readFileSync } from 'fs';
import {
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
  Controller,
  ParseIntPipe,
  ParseFilePipe,
  UploadedFile,
  UseInterceptors,
  ClassSerializerInterceptor,
  FileTypeValidator,
} from '@nestjs/common';

import { User } from 'src/utils/decorators';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { UploadImageInterceptor } from 'src/utils/interceptors';

import { Message } from './entities/message.entity';
import { MessagesService } from './message.service';
import { UpdateDTO } from './dto/update-message.dto';
import { CreateDTO } from './dto/create-message.dto';

type File = Express.Multer.File;

@Controller('/messages')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(':id')
  async findAll(
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number,
  ): Promise<Message[]> {
    return this.messagesService.getMessages(id, userId);
  }

  @Post()
  async create(@Body() body: CreateDTO): Promise<Message> {
    return this.messagesService.createMessage(body);
  }

  @Post('/upload/:id')
  @UseInterceptors(UploadImageInterceptor)
  async upload(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/jpeg' })],
      }),
    )
    file: File,
  ): Promise<string> {
    this.messagesService.updateMessage(id, { filePath: file.path });

    return (
      'data:image/jpeg;base64,' + readFileSync(file.path).toString('base64')
    );
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateDTO) {
    return this.messagesService.updateMessage(id, { ...body, isEdited: true });
  }
}
