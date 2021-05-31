import { Injectable, Logger } from '@nestjs/common';
import AWS from 'aws-sdk';

@Injectable()
export class MessageService {
    private readonly logger = new Logger(MessageService.name);

    private readonly snsClient = new AWS.SNS({
        credentials: new AWS.SharedIniFileCredentials({profile: process.env.AWS_PROFILE}), 
        region: process.env.AWS_REGION
    });

    public sendNotification(topicArn: string, message: string) : any {
        this.logger.debug(`${MessageService.name} is sending ${message} to topic ${topicArn}`);
        this.snsClient.publish({
            Message: message,
            TopicArn: topicArn
        }, (error, data) => {
            if (error) {
                this.logger.error(error, error.stack);
            } else {
                this.logger.debug(data);
            }

            return error || data;
        });
    }
}
