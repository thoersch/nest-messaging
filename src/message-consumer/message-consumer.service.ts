import { Inject, Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { MessageService } from 'src/message/message.service';
import { MessageHandler } from './handlers/message-handler.interface';
const AWS = require('aws-sdk');

@Injectable()
export class MessageConsumerService {
    private readonly logger = new Logger(MessageConsumerService.name);
    private readonly handlerMap;

    constructor(private messageService: MessageService, @Inject('MessageHandlers') private handlers: Array<MessageHandler>) {
        this.handlerMap = {};
        
        handlers.forEach(handler => {
            this.handlerMap[handler.getType()] = handler;
        });

        this.logger.log(`Message Consumer found ${handlers.length} types of handlers: ${JSON.stringify(this.handlerMap)}`);
    }

    @Interval(2000)
    async handleMessages() {
        var messages: any[] = await this.messageService.getMessagesFromQueue(process.env.MESSAGE_QUEUE);
        this.logger.log(`Found ${messages.length} messages.`);
        
        messages.forEach(async message => {
            try {
                var body = JSON.parse(message.Body);
                var type = JSON.parse(body.Message).type;
                this.logger.log(`Handling type ${type}`);
                var handler = this.handlerMap[type];

                if (handler === undefined) {
                    this.logger.error(`No handler for ${type} type! Message will be ignored.`);
                    return;
                }

                await handler.handle(message);
            } finally {
                this.logger.log(`Deleting message ${message.ReceiptHandle}`);
                this.messageService.deleteMessageFromQueue(process.env.MESSAGE_QUEUE, message.ReceiptHandle);
            }
        });
    }
}
