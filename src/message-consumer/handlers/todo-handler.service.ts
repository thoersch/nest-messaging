import { Injectable, Logger } from '@nestjs/common';
import { MessageHandler } from './message-handler.interface';

@Injectable()
export class TodoHandlerService implements MessageHandler {
    private readonly logger = new Logger(TodoHandlerService.name);

    getType(): string {
        return "Todo";
    }

    async handle(message: string) : Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.logger.log(`Handling Todo Message`);
            resolve(true);
        });
    }
}
