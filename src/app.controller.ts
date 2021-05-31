import { Controller, Post, Body } from '@nestjs/common';
import { MessageService } from './message/message.service';

@Controller()
export class AppController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  sendMessage(@Body() message: string) {
    return this.messageService.sendNotification(process.env.MESSAGE_TOPIC_ARN, message);
  }
}
