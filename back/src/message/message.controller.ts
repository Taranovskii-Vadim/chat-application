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

import { User } from 'src/decorators';
import { UploadImageInterceptor } from 'src/interceptors';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';

import { Message } from './message.entity';
import { MessagesService } from './message.service';
import { InsertPayloadDTO, UpdatePayloadDTO } from './message.dto';

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
  async create(@Body() body: InsertPayloadDTO): Promise<Message> {
    return this.messagesService.createMessage(body);
  }

  @Post('/upload')
  @UseInterceptors(UploadImageInterceptor)
  async upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/jpeg' })],
      }),
    )
    file: File,
  ): Promise<File> {
    return file;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePayloadDTO,
  ) {
    return this.messagesService.updateMessage(id, body);
  }
}
