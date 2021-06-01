import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { MessageService } from './message/message.service';
import { Message } from './message/message.interface';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly messageService: MessageService) {}

  @Get()
  rootRoute() {
    return "app root";
  }

  @Post()
  sendMessage(@Body() message: Message) {
    this.logger.log(`Posting ${message.message} to the SNS topic ${process.env.MESSAGE_TOPIC_ARN}`)
    return this.messageService.sendNotification(process.env.MESSAGE_TOPIC_ARN, message.message);
  }
}
