import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { MessageService } from './message/message.service';
import { MessageConsumerService } from './message-consumer/message-consumer.service';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true})],
  controllers: [AppController],
  providers: [MessageService, MessageConsumerService],
})
export class AppModule {}
