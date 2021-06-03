import { Injectable, Logger } from '@nestjs/common';
import { MessageHandler } from './message-handler.interface';

@Injectable()
export class OrderHandlerService implements MessageHandler {
    private readonly logger = new Logger(OrderHandlerService.name);

    getType(): string {
        return "Order";
    }

    async handle(message: string) : Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.logger.log(`Handling Order Message`);
            resolve(true);
        });
    }
}
