import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { MessageService } from './message/message.service';
import { MessageConsumerService } from './message-consumer/message-consumer.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TodoHandlerService } from './message-consumer/handlers/todo-handler.service';
import { OrderHandlerService } from './message-consumer/handlers/order-handler.service';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [
    MessageService, 
    MessageConsumerService,
    TodoHandlerService,
    OrderHandlerService,
    {
      provide: 'MessageHandlers',
      useFactory: (todo, order) => [todo, order],
      inject: [TodoHandlerService , OrderHandlerService],
    }
  ],
})
export class AppModule {}
