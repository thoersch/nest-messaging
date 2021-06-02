import { Injectable, Logger } from '@nestjs/common';
import { MessageService } from 'src/message/message.service';
const AWS = require('aws-sdk');

@Injectable()
export class MessageConsumerService {
    private readonly logger = new Logger(MessageConsumerService.name);

    constructor(messageService: MessageService) {
        
    }

}
